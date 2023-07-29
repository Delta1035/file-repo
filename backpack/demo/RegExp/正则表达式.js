var re = /quick\s(brown).+?(jumps)/ig;
var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
console.log(result);
var str = 'The Quick Brown Fox Jumps Over The Lazy Dog';
var r2 = str.replace(/(Fox)/,function($1){
    console.log($1);
    return 'fox'
});
console.log(r2);
console.log(str);