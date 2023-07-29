/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-01-10 02:25:23
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-01-11 00:18:15
 * @LastEditors: Delta_Zheng Delta_Zheng@wistronits.com
 * @LastEditTime: 2023-01-10 10:37:37
 * @FilePath: \zhufeng_mark\rename.js
 * @Description:
 *
 */
const fs = require("fs");
const path = require("path");
const fileNameList = fs.readdirSync(path.join(__dirname, "zhufeng_mark"));
const markdownpdf = require("markdown-pdf");
const pdfdir = path.join(__dirname, `zhufeng_pdf`);
if (!fs.existsSync(pdfdir)) {
  fs.mkdirSync(pdfdir);
}
fileNameList.forEach((filePath, index) => {
  const oldpath = path.join(__dirname, `zhufeng_mark/${filePath}`);
  const pdfpath = path.join(
    __dirname,
    `zhufeng_pdf/${filePath}`.replace(".md", ".pdf")
  );
  if (compare(filePath)) {
    fs.renameSync(
      oldpath,
      path.join(
        __dirname,
        `zhufeng_mark/${compare(filePath).replace(/\s/g, "")}`
      )
    );
  }
  setTimeout(function () {
    try {
      fs.createReadStream(oldpath)
        .pipe(markdownpdf())
        .pipe(fs.createWriteStream(pdfpath));
    } catch (error) {
      console.log(new Date().toLocaleTimeString(), error);
    }
  }, index + 1);
});

function compare(filePath) {
  if (filePath !== decodeURI(filePath)) {
    return decodeURI(filePath);
  } else {
    return false;
  }
}
