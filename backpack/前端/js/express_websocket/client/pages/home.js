export class Home {
    template = `<div>
  <p>Home2</p>
  <p v-for="post in posts"
  :key="post.id"
  >{{post.title}}</p>
  <p>这是来自home的count值{{count.value}}</p>
  <button @click='addCount()'>add count</button>
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
            }
        }
    }
    methods = {
        addCount(){
            this.count.value ++;
        }
    }
    

    created(){
        console.log('created execute',this);
    }
}