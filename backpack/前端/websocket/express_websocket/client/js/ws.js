var ws = new WebSocket('ws://127.0.0.1:8080');
ws.onmessage = async function (msg) {
    // 此时接收到一blob对象
    //   const str = await msg.text();
    var text = await (new Response(msg)).text();
    console.log('msg', text);
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
function send() {
    console.log('send', msg.value);
    ws.send(msg.value);
}

function createMsgSpan(blob) {

}