import { BlobServiceClient } from '@azure/storage-blob';

export default function useAzureDownload (account, containerName, sas, blobName) {

  const azuredownload = async () => {
    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sas}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    // const downloadBlockBlobResponse = await blobClient.downloadToFile();
    // downloadFile(blobClient.storageClientContext.url, oldname)
    return blobClient.storageClientContext.url
  }

  // const downloadFile = (filePath, filename) => {

  // axios.get(filePath, '', {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded', //请求的数据类型为form data格式
  //   },
  //   'responseType': 'blob'  //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
  // }).then(function (response) {
  //   const blob = new Blob([response.data]);
  //   const fileName = filename;
  //   const linkNode = document.createElement('a');
  //   linkNode.download = fileName; //a标签的download属性规定下载文件的名称
  //   linkNode.style.display = 'none';
  //   linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
  //   document.body.appendChild(linkNode);
  //   linkNode.click();  //模拟在按钮上的一次鼠标单击
  //   // URL.revokeObjectURL(linkNode.href); // 释放URL 对象
  //   // document.body.removeChild(linkNode);
  // }).catch(function (error) {
  //   console.log(error);
  // });

  // }
  return azuredownload
}




