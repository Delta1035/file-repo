const exec = require("child_process");
const fs = require("fs");
const path = require("path");
const schedule = require("node-schedule");
function task1() {
  exec.exec("ipconfig /flushdns", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      saveLog(`exec error: ${error}`)
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    saveLog(`stdout: ${JSON.stringify(stdout)}`)
    saveLog(`stderr: ${stderr}`)
  });
}
task1();
// exec.exec('mkdir test',error=>{
//     console.log('命令执行失败2：'+JSON.stringify(error));
// });

function saveLog(err) {
  const dir = String.raw`C:\Users\wh2104220\Desktop\log`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const file = path.join(dir, `${Date.now()}`);
  fs.writeFileSync(file, `[${new Date().toLocaleString()}] :>> ${err}`, {
    encoding: "utf-8",
  });
}
const job = schedule.scheduleJob("flush dns", "* */4 * * *", function () {
  task1();
});
