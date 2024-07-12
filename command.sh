#!/bin/bash
echo "Hello"
npm -v
npm ci
npm install @playwright/test
npm run test:NopCommerce
