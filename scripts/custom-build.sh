#!/bin/bash
echo "🔧 Installing dependencies..."
npm install

echo "🏗️  Building Strapi..."
npx strapi build

echo "🌱 Seeding data..."
npx tsc seed/index.ts --outDir seed --esModuleInterop
node seed-dist/index.js
