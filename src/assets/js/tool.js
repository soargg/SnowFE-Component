var _ = {
    getCookieAll: function() { // 获取到所有的cookie,返回一个对象。
        var obj = {};
        document.cookie.split(';').forEach(function(item, index) {
            var cookieStr = _.trim(item);
            if( cookieStr !== '') {
                var temp = cookieStr.split('=');
                var str = decodeURIComponent(temp[1]);
                if (/^\{|^\[/.test(str) && /\}$|\]$/.test(str)) { // 存在对象或数组
                    obj[temp[0]] = JSON.parse(str);
                }else {
                    obj[temp[0]] = str;
                }
            };
        });

        return obj;
    },
    getCookieByKey: function(key) {// 根据key值返回cookie,没有的话返回‘’。
        var cookieObj = _.getCookieAll();
        return cookieObj[key] || '';
    },
    setCookie: function (key, value, expires) {//设置cookie, expires单位s
        // key 与 value 其中一个不是字符串时就不执行
        if(typeof key !== 'string' || typeof value !== 'string') return;
        var cookieStr = '';
        // 过期时间是一个数字时，为 cookie 添加一个过期时间； 
        if (Number(expires) !== NaN) {
            var exp = new Date();
            exp.setTime(exp.getTime() + expires * 1000);
            cookieStr = key + '=' + escape(value) + ';expires=' + exp.toGMTString();
        }else {
            cookieStr = key + '=' + escape(value)
        }
        document.cookie = cookieStr;
    },
    trim: function(str) {
        return str.replace(/^\s+|\s+$/gm, '');
    }
}
