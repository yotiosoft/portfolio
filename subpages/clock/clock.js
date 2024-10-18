// 時計 by yotio
// 日時を取得
function clock_date() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    // 2桁表示
    month = ("0" + month).slice(-2);
    day = ("0" + day).slice(-2);
    var date = year + "." + month + "." + day;
    return date;
}

// 現在時刻を取得
function clock_time() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    // 2桁表示
    hour = ("0" + hour).slice(-2);
    minute = ("0" + minute).slice(-2);
    second = ("0" + second).slice(-2);
    var time = hour + ":" + minute + ":" + second;
    return time;
}

// 表示
addEventListener("load", function() {
    setInterval(function() {
        document.getElementById("clock_date").innerHTML = clock_date();
        document.getElementById("clock_time").innerHTML = clock_time();
    }, 500);
});
