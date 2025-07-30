#!/bin/bash

echo "🔧 Installing dependencies..."
npm install

echo "🔧 Building Plugin..."
npm install --prefix ./src/plugins/standard-strapi-toolkit
npm run build --prefix ./src/plugins/standard-strapi-toolkit

echo "🏗️  Building Strapi..."
npx strapi build

# echo "📁 Copying static seed files..."
# cp -r seed/files dist/seed/files

# echo "🌱 Seeding data..."
# node dist/seed/index.js
