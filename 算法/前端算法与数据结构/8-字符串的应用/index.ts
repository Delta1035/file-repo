import { ajax } from 'rxjs/ajax';
ajax({
    method: 'get',
    url: 'www.baidu.com'
}).subscribe(
    {
        next: data => {
            console.log(data);
        }
    }
);