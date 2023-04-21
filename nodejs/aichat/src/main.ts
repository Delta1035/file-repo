import * as dotenv from "dotenv";
import Readline from "readline";
const { config } = dotenv;
config();
console.log(process.env.OPEN_AI_KEY);

const chat = (input: string) => {
  return ` : ${input}`;
};
const shell = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
shell.prompt();
shell.on("line", (input) => {
  console.log(chat(input));
  shell.prompt();
});
