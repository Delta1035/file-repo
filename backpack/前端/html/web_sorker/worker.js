onmessage = function(e) {
    console.log('Message received from index script');
    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    console.log('Posting message back to index script');
    self.postMessage(workerResult);
  }