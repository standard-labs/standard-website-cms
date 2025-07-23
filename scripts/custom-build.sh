#!/bin/bash
echo "🔧 Installing dependencies..."
npm install

echo "🏗️  Building Strapi..."
npx strapi build

echo "🌱 Seeding data..."
npx tsx seed/index.ts
