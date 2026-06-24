# Simple deployment

uploadPath=$(cat .env.uploadPath)
npm run build && scp -r dist/* $uploadPath

