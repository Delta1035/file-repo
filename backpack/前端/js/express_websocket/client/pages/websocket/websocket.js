export class Websocket {
    template = `<div class='websocket'>
  <p>Websocket</p>
<input type='text' v-model='msg' />
<button @click='send(msg)'>send</button>
  </div>`

    data() {
        return {
            posts: [
                { id: 1, title: 'My journey with Vue' },
                { id: 2, title: 'Blogging with Vue' },
                { id: 3, title: 'Why Vue is so fun' }
            ],
            count:{
                value:100
            },
            msg:'这是msg'
        }
    }
    methods = {
        addCount(){
            this.count.value ++;
        },
        send(msg){
            ws.send({
                type:'text',
                msg:msg
            });
        }
    }
    

    created(){
        console.log('created execute',this);
    }
}