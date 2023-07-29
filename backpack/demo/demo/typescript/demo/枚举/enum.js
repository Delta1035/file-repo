var Days;
(function (Days) {
    Days[Days["sun"] = 5] = "sun";
    Days[Days["mon"] = 1] = "mon";
    Days[Days["tue"] = 2] = "tue";
    Days[Days["wed"] = 3] = "wed";
    Days[Days["thu"] = 4] = "thu";
    Days[Days["fri"] = 5] = "fri";
    Days[Days["sat"] = 6] = "sat";
})(Days || (Days = {}));
; //手动赋值的时候枚举会从7开始递增
console.log(Days);
