#!/bin/sh
# Simple deployment

if ! uploadPath=$(cat "./.env.uploadPath") 2>/dev/null; then
    echo "Save ssh path into '.env.uploadPath'"
    echo "Example: sshUserName@serverdomain.com:path/to/upload/folder"
    exit
fi

uploadPath=$(cat ./.env.uploadPath)

npm run build && scp -r dist/* $uploadPath

