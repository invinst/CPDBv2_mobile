#!/usr/bin/env node

const path = require('path');
const azure = require('azure-storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const execAsync = Promise.promisify(require('child_process').exec);

let accountName = process.env.AZURE_STORAGE_STAGING_ACCOUNT_NAME;
let accountKey = process.env.AZURE_STORAGE_STAGING_ACCOUNT_KEY;
const container = process.env.AZURE_STATICFILES_CONTAINER;

if (process.env.CIRCLE_BRANCH === 'master') {
  accountName = process.env.AZURE_STORAGE_PROD_ACCOUNT_NAME;
  accountKey = process.env.AZURE_STORAGE_PROD_ACCOUNT_KEY;
}


const blobService = Promise.promisifyAll(azure.createBlobService(accountName, accountKey));

const distPath = _path => path.join(__dirname, '../dist', _path);

const filesFromFolder = (dir, ext) => {
  return fs.readdirAsync(dir).then(files => {
    const validFiles = [];
    for (let i=0; i < files.length; i++) {
      const filename = files[i];
      if (filename.endsWith(ext)) {
        validFiles.push(filename);
      }
    }
    if (validFiles.length === 0) {
      throw `No file can be found with extension ${ext} in directory ${dir}`;
    }
    return validFiles;
  });
};

const assetsFileWithExtension = ext => filesFromFolder(distPath('assets'), ext);

const uploadFile = (container, path, localPath, contentType, cacheControl, contentEncoding) => {
  console.info(`Uploading file ${path}`);
  return blobService.createBlockBlobFromLocalFileAsync(
    container,
    path,
    localPath,
    {
      contentSettings: {
        contentType,
        cacheControl,
        contentEncoding
      }
    }
  ).then(() => {
    console.info(`.. Done uploading file ${path}`);
  });
};

const uploadStaticFile = (path, localPath, contentType) => {
  return execAsync(`gzip < ${localPath} > ${localPath}.gz`).then(() =>
    uploadFile(container, path, `${localPath}.gz`, contentType, 'max-age=31556926', 'gzip')
  );
};

const uploadStaticFilesWithExtension = (directory, contentType, ext) => {
  const dir = distPath(directory);
  return filesFromFolder(dir, ext).then(files => {
    const uploads = [];
    for (let i=0; i < files.length; i++) {
      const filename = files[i];
      uploads.push(uploadStaticFile(path.join(directory, filename), path.join(dir, filename), contentType));
    }
    return Promise.all(uploads);
  });
};

blobService.createContainerIfNotExistsAsync(container, { publicAccessLevel: 'blob' }).then(() => {
  return Promise.all([
    uploadFile(container, 'index.html', distPath('index.html'), 'text/html', 'no-cache', undefined),
    assetsFileWithExtension('.js').then(files => {
      const filePath = path.join('assets', files[0]);
      return uploadStaticFile(filePath, distPath(filePath), 'application/javascript');
    }),
    uploadStaticFilesWithExtension('assets', 'font/woff', '.woff'),
    uploadStaticFilesWithExtension('assets', 'image/svg+xml', '.svg'),
    uploadStaticFilesWithExtension('assets', 'image/x-icon', '.ico'),
  ]);
});
