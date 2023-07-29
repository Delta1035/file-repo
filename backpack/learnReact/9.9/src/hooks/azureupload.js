import { BlobServiceClient } from '@azure/storage-blob';

export default function useAzureUpload (containerName, sasToken, storageAccountName) {



  const createBlobInContainer = async (containerClient, file, filename) => {
    // create blobClient for container
    // const blobClient = containerClient.getBlockBlobClient(file.uid + file.name.substring(file.name.lastIndexOf(".")));
    const blobClient = containerClient.getBlockBlobClient(filename);


    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadData(file, options);



  };
  // </snippet_createBlobInContainer>

  // <snippet_uploadFileToBlob>
  const uploadFileToBlob = async (file, filename) => {
    if (!file) return [];
    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/${sasToken}`
    );

    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);
    // await containerClient.createIfNotExists({
    // 	access: 'container',
    // });

    // upload file
    const uploadBlobResponse = await createBlobInContainer(containerClient, file, filename);

    // get list of blobs in container
    console.log(uploadBlobResponse);
    // return getBlobsInContainer(containerClient);
  };
  // </snippet_uploadFileToBlob>

  return uploadFileToBlob;
}