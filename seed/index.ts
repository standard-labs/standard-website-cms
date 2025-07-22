import fs from 'fs-extra';
import path from 'path';
import mime from 'mime-types';
import { createStrapi, compileStrapi } from '@strapi/strapi';

import authors from './data/authors';
import categories from './data/categories';
import articles from './data/articles';

// const { categories, authors, articles, global, about } = data as any;

async function seedExampleApp() {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up the template...');
      await importSeedData();
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  } else {
    console.log(
      'Seed data has already been imported. We cannot reimport unless you clear your database first.'
    );
  }
}

async function isFirstRun(): Promise<boolean> {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions: Record<string, string[]>) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  const allPermissionsToCreate = Object.entries(newPermissions).flatMap(
    ([controller, actions]) =>
      actions.map((action) =>
        strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: `api::${controller}.${controller}.${action}`,
            role: publicRole.id,
          },
        })
      )
  );

  await Promise.all(allPermissionsToCreate);
}

function getFileSizeInBytes(filePath: string): number {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function getFileData(fileName: string) {
  const filePath = path.resolve(__dirname, 'files', fileName);
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split('.').pop() ?? '';
  const mimeType = mime.lookup(ext) || '';

  return {
    filepath: filePath,
    originalFileName: fileName,
    size,
    mimetype: mimeType,
  };
}

async function uploadFile(file: any, name: string) {
  return strapi
    .plugin('upload')
    .service('upload')
    .upload({
      files: file,
      data: {
        fileInfo: {
          alternativeText: `An image uploaded to Strapi called ${name}`,
          caption: name,
          name,
        },
      },
    });
}

async function createEntry({ model, entry }: { model: string; entry: any }) {
  try {
    await strapi.entityService.create(`api::${model}.${model}` as any, {
      data: entry,
    });
  } catch (error) {
    console.error({ model, entry, error });
  }
}

async function checkFileExistsBeforeUpload(files: string[]): Promise<any> {
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
      const fileData = getFileData(fileName);
      const fileNameNoExtension = fileName.split('.').shift()!;
      const [file] = await uploadFile(fileData, fileNameNoExtension);
      uploadedFiles.push(file);
    }
  }

  const allFiles = [...existingFiles, ...uploadedFiles];
  return allFiles.length === 1 ? allFiles[0] : allFiles;
}

async function updateBlocks(blocks: any[]) {
  const updatedBlocks: any[] = [];
  for (const block of blocks) {
    const blockCopy = { ...block };
    if (block.__component === 'shared.media') {
      const uploadedFiles = await checkFileExistsBeforeUpload([block.file]);
      blockCopy.file = uploadedFiles;
    } else if (block.__component === 'shared.slider') {
      const files = await checkFileExistsBeforeUpload(block.files);
      blockCopy.files = files;
    }
    updatedBlocks.push(blockCopy);
  }
  return updatedBlocks;
}

async function importArticles() {
  for (const article of articles) {
    const cover = await checkFileExistsBeforeUpload([article.cover]);
    const updatedBlocks = await updateBlocks(article.blocks);
    await createEntry({
      model: 'article',
      entry: {
        ...article,
        cover,
        blocks: updatedBlocks,
        publishedAt: Date.now(),
      },
    });
  }
}

async function importGlobal() {
  const favicon = await checkFileExistsBeforeUpload(['favicon.png']);
  const shareImage = await checkFileExistsBeforeUpload(['default-image.png']);
  return createEntry({
    model: 'global',
    entry: {
      ...global,
      favicon,
      publishedAt: Date.now(),
      defaultSeo: {
        ...global.defaultSeo,
        shareImage,
      },
    },
  });
}

// async function importAbout() {
//   const updatedBlocks = await updateBlocks(about.blocks);
//   await createEntry({
//     model: 'about',
//     entry: {
//       ...about,
//       blocks: updatedBlocks,
//       publishedAt: Date.now(),
//     },
//   });
// }

async function importCategories() {
  for (const category of categories) {
    await createEntry({ model: 'category', entry: category });
  }
}

async function importAuthors() {
  for (const author of authors) {
    const avatar = await checkFileExistsBeforeUpload([author.avatar]);
    await createEntry({
      model: 'author',
      entry: {
        ...author,
        avatar,
      },
    });
  }
}

async function importSeedData() {
  await setPublicPermissions({
    article: ['find', 'findOne'],
    category: ['find', 'findOne'],
    author: ['find', 'findOne'],
    // global: ['find', 'findOne'],
    // about: ['find', 'findOne'],
  });

  await importCategories();
  await importAuthors();
  await importArticles();
  // await importGlobal();
  // await importAbout();
}

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  app.log.level = 'error';

  await seedExampleApp();
  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
