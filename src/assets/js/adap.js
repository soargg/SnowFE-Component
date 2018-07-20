// html 的 fontSize 为屏幕宽度的 1/10；也就是说10rem为满屏；设计稿的宽度为750；
// 元素在设计稿中的实际宽高(w or h)/750 * 10rem, 就转换为页面上的呈现的宽高。
// 也是我们css样式中sass语法的函数中 @return $number / 75 + rem。

! function (window, document) {
    function n() {
        document.body ? document.body.style.fontSize = 12 * o + "px" : document.addEventListener("DOMContentLoaded", n)
    }
    function d() {
        // 设置根fontSize
        var rootFontSize = i.clientWidth / 10;
        i.style.fontSize = rootFontSize + "px"
    }
    var i = document.documentElement,
        o = window.devicePixelRatio || 1;// 获取屏幕的像素比
    if (
        n(),
        d(),
        window.addEventListener("resize", d),
        window.addEventListener("pageshow", function (e) {
            e.persisted && d()
        }),
        o >= 2
    ) {
        var a = document.createElement("body"),
        s = document.createElement("div");
        s.style.border = ".5px solid transparent";
        a.appendChild(s);
        i.appendChild(a);
        1 === s.offsetHeight && i.classList.add("hairlines");
        i.removeChild(a)
    }
}(window, document);
