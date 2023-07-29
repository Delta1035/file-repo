/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-01-10 01:09:58
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-01-11 00:08:35
 * @LastEditors: Delta_Zheng Delta_Zheng@wistronits.com
 * @LastEditTime: 2023-01-10 10:28:23
 * @FilePath: \zhufeng_mark\index.js
 * @Description: 爬取珠峰文章
 *
 */
const cheerio = require("cheerio");
const Axios = require("axios").default;
const { exec } = require("child_process");
const instance = Axios.create();
const path = require("path");
const fs = require("fs");

async function main() {
  let $;
  const response = await instance.get(
    "http://zhufengpeixun.com/strong/index.html"
  );

  $ = cheerio.load(response.data);
  const children = $("body .nav ul li a");
  const markPath = path.join(__dirname, "/zhufeng_mark");
  Reflect.ownKeys(children).forEach((key, index) => {
    try {
      if (!fs.existsSync(markPath)) {
        fs.mkdirSync(markPath);
      }
      process.chdir(markPath);
      if (children[key].attribs?.href) {
        // console.log(children[key].attribs?.href,children[key].attribs["href"].replace('html/',''));
      }
      if (children[key].attribs?.href) {
        console.log(children[key].attribs?.href);
        setTimeout(function () {
          exec(
            `clean-mark http://zhufengpeixun.com/strong/${encodeURI(
              children[key].attribs["href"]
            )}`,
            function (error, stdout, stderr) {
              if (stderr)
                console.log(`${children[key].attribs["href"]}下载失败`, stderr);
            }
          );
        }, index);
      }
    } catch (error) {
      console.log(children[key], error);
    }
  });
}
main();
