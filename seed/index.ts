import fs from 'fs-extra';
import path from 'path';
import mime from 'mime-types';
import { createStrapi, compileStrapi } from '@strapi/strapi';

import authors from './data/authors';
import books from './data/books';
import categories from './data/categories';
import articles from './data/articles';
import teamMembers from './data/team-members';



// Seeds initial data once by checking plugin store to prevent duplicate imports.
async function seedInitialData() {
  const setupStore = strapi.store({
    environment: strapi.config.environment,
    type: 'plugin',
    name: 'initial-seed',
  });

  // const hasSeeded = await setupStore.get({ key: 'hasSeeded' });

  // if (hasSeeded) {
  //   console.log(
  //     '[✔️] Seed data already exists. Skipping import. To re-seed, reset your database.'
  //   );
  //   return;
  // }

  try {
    console.log('[⏳] Importing seed data...');
    // await seedAuthors();
    // await seedCategories();
    // await seedArticles();
    // await seedBooks();
    // await seedTeamMembers();
    await setupStore.set({ key: 'hasSeeded', value: true });
    console.log('[✅] Seed data import complete.');
  } catch (error) {
    console.error('[❌] Failed to import seed data:', error);
  }
}


// Returns the size of a file in bytes
function getFileSize(filePath: string): number {
  return fs.statSync(filePath).size;
}


// Prepares file metadata (path, size, type) for upload
function prepareFileMetadata(fileName: string) {
  const filePath = path.resolve(__dirname, 'files', fileName);
  const fileSize = getFileSize(filePath);
  const extension = path.extname(fileName).slice(1); // safer extraction
  const mimeType = mime.lookup(extension) || 'application/octet-stream';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size: fileSize,
    mimetype: mimeType,
  };
}


// Uploads a file to Strapi using the Upload plugin
async function uploadToStrapi(file: any, displayName: string) {
  return strapi.plugin('upload').service('upload').upload({
    files: file,
    data: {
      fileInfo: {
        name: displayName,
        alternativeText: `Uploaded image: ${displayName}`,
        caption: displayName,
      },
    },
  });
}


// Creates a new entry for the given content type model in Strapi
async function createContentEntry({
  modelName,
  data,
}: {
  modelName: string;
  data: any;
}) {
  try {
    const uid = `api::${modelName}.${modelName}`;
    await strapi.entityService.create(uid as any, { data });
  } catch (error) {
    console.error(`❌ Failed to create entry for model: ${modelName}`, {
      data,
      error,
    });
  }
}

// Ensures files are uploaded or linked, returning existing or newly uploaded files
async function ensureFilesUploaded(files: string[]): Promise<any> {
  const existingFiles: any[] = [];
  const uploadedFiles: any[] = [];

  for (const fileName of files) {
    const fileWhereName = await strapi.query('plugin::upload.file').findOne({
      where: {
        name: fileName.replace(/\..*$/, ''),
      },
    });

    if (fileWhereName) {
      existingFiles.push(fileWhereName);
    } else {
      const fileData = prepareFileMetadata(fileName);
      const fileNameNoExtension = fileName.split('.').shift()!;
      const [file] = await uploadToStrapi(fileData, fileNameNoExtension);
      uploadedFiles.push(file);
    }
  }

  return [...existingFiles, ...uploadedFiles];
}


// Updates media-related block components by uploading or linking associated files
async function processMediaBlocks(blocks: any[]): Promise<any[]> {
  const result: any[] = [];

  for (const block of blocks) {
    const updatedBlock = { ...block };

    switch (block.__component) {
      case 'shared.media': {
        const [file] = await ensureFilesUploaded([block.file]);
        updatedBlock.file = file;
        break;
      }

      case 'shared.slider': {
        const uploaded = await ensureFilesUploaded(block.files);
        updatedBlock.files = uploaded;
        break;
      }

      default:
        break;
    }

    result.push(updatedBlock);
  }

  return result;
}



// Imports authors with uploaded cover image and processed media blocks
async function seedAuthors(): Promise<void> {
  for (const author of authors) {
    const [uploadedAvatar] = await ensureFilesUploaded([author.avatar]);
    await createContentEntry({
      modelName: 'author',
      data: {
        ...author,
        avatar: uploadedAvatar,
      },
    });
  }
}


// Imports articles with uploaded cover image and processed media blocks
async function seedArticles(): Promise<void> {
  for (const article of articles) {
    const [uploadedCover] = await ensureFilesUploaded([article.cover]);
    const enrichedBlocks = await processMediaBlocks(article.blocks);

    await createContentEntry({
      modelName: 'article',
      data: {
        ...article,
        cover: uploadedCover,
        blocks: enrichedBlocks,
      },
    });
  }
}


// Imports books with uploaded cover image and processed media blocks
async function seedBooks(): Promise<void> {
  for (const book of books) {
    await createContentEntry({
      modelName: 'book',
      data: {
        ...book,
      },
    });
  }
}


// Imports categories with uploaded cover image and processed media blocks
async function seedCategories(): Promise<void> {
  for (const category of categories) {
    await createContentEntry({
      modelName: 'category',
      data: {
        ...category,
      },
    });
  }
}


// Imports teamMembers with uploaded cover image and processed media blocks
async function seedTeamMembers(): Promise<void> {
  for (const teamMember of teamMembers) {
    const [uploadedAvatar] = await ensureFilesUploaded([teamMember.avatar]);

    await createContentEntry({
      modelName: 'team-member',
      data: {
        ...teamMember,
        avatar: uploadedAvatar,
      },
    });
  }
}

// async function importGlobal() {
//   const favicon = await ensureFilesUploaded(['favicon.png']);
//   const shareImage = await ensureFilesUploaded(['default-image.png']);
//   return createContentEntry({
//     modelName: 'global',
//     data: {
//       ...global,
//       favicon,
//       publishedAt: Date.now(),
//       defaultSeo: {
//         ...global.defaultSeo,
//         shareImage,
//       },
//     },
//   });
// }



async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedInitialData();

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});






// await setPublicPermissions({
//   article: ['find', 'findOne'],
//   category: ['find', 'findOne'],
//   author: ['find', 'findOne'],
// });
// async function setPublicPermissions(newPermissions: Record<string, string[]>) {
//   const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
//     where: { type: 'public' },
//   });

//   const allPermissionsToCreate = Object.entries(newPermissions).flatMap(
//     ([controller, actions]) =>
//       actions.map((action) =>
//         strapi.query('plugin::users-permissions.permission').create({
//           data: {
//             action: `api::${controller}.${controller}.${action}`,
//             role: publicRole.id,
//           },
//         })
//       )
//   );

//   await Promise.all(allPermissionsToCreate);
// }
