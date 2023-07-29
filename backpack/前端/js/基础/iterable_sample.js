let iterable = [1, 2, 3];

function createIterator(array) {
	let count = 0;
	return {
		next: function () {
			return count < array.length
				? { value: array[count ++], done: false }
				: { value: undefined, done: true };
		},
	};
}

let myIterator = createIterator(iterable);

// console.log(myIterator.next()); // {value: 1, done: false}
// console.log(myIterator.next()); // {value: 2, done: false}
// console.log(myIterator.next()); // {value: 3, done: false}
// console.log(myIterator.next()); // {value: undefined, done: true}

// for(let item of iterable){
//     console.log(item);
// }