var ws = new WebSocket('ws://127.0.0.1:8080');
ws.onmessage = async function (msg) {
    // 此时接收到一blob对象
    const b = msg.data
    if (msg && typeCompare(b, 'Blob')) {
        console.log('result',b.stream());
    } else {
        console.log('msg', b);
    }
};
ws.onerror = function (error) {
    console.log('error', merrorsg);
};
ws.onclose = function (close) {
    console.log('close', close);
};
ws.onopen = (open) => {
    console.log('open', open);
    // this.send({ type: 'text', meg: 'Hello 大家好~' });
}


// this.ws.close();
// function send() {
//     console.log('send', msg.value);
//     ws.send(msg.value);
// }

function readBlob(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(blob, 'utf-8');
        reader.onload = function (e) {
            console.log('blob loaded',e);
            resolve(reader.result)
        }
    })
}

/**
 * 比较是否是对应的对象
 * @param {any} target 
 * @param {string} type 
 * @returns boolean
 */
function typeCompare(target, type) {
    const targetType = /(?<=\s)\w+(?=])/.exec(Object.prototype.toString.call(target))[0];
    return targetType === type;
}