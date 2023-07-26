import fs from 'fs';
import path from "path";
import { DataService } from "./data.service";
const data = new DataService();
const result = {};
Object.keys(data).forEach(key => {
    // @ts-ignore
    result[key[0].toLowerCase() + key.substring(1)] = data[key];
});
console.log(data);
fs.writeFileSync(path.join(__dirname,'i18.json'),JSON.stringify(result));