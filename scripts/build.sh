#!/bin/bash

echo "🔧 Installing dependencies..."
npm install

echo "🏗️  Building Strapi..."
npx strapi build

echo "📦 Building seed scripts..."
npx tsc -p tsconfig.seed.json

echo "📁 Copying static seed files..."
cp -r seed/files dist/seed/files

echo "🌱 Seeding data..."
node dist/seed/index.js
