#!/bin/bash
echo "Hello"
npm -v
npm ci
npm run test:NopCommerce
npm run test:report