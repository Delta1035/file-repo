(function () {
  setTimeout(function () {
    console.time("start");
    let observer;
    const comments = ["ccoebot /approve", "ccoebot /merge"];
    const note_body = document.getElementById("note-body"); // comment 输入框
    note_body.value = comments.shift();
    const spans = document.querySelectorAll('span');
    let confirm_btn;
    for(let span of spans){
        if(span.innerText.trim() === 'Comment'){
            confirm_btn = span.parentElement;
        }
    }
    // const confirm_btn = document.getElementById("__BVID__110__BV_button_"); // 确认评论按钮
    // 观察确认按钮的配置项
    const config = {
      attributes: true,
    };
    // 观察到属性变化时执行的回调函数
    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation === "attributes") {
          console.log("属性变化了,可以点击确认按钮了", observer);
        }
      }
      if (comments.length === 0) {
        console.log("停止观察");
        observer.disconnect();
      }
    };
    observer = new MutationObserver(callback);
    observer.observe(confirm_btn, config);
    console.timeEnd("start");
  }, 1000);
})();
