/*
 *   {\__/}
 *   ( •-•)
 *   /つ 要不要用一下tool.js
 */

var _ = {
    getCookieAll: function() { // 获取到所有的cookie,返回一个对象。
        var obj = {};
        document.cookie.split(';').forEach(function(item, index) {
            var cookieStr = decodeURIComponent(_.trim(item));
            if( cookieStr !== '') {
                var temp = cookieStr.split('=');
                var str = temp[1];
                obj[temp[0]] = (/^\{|^\[/.test(str) && /\}$|\]$/.test(str)) ? JSON.parse(str) : str;
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
        if(typeof key !== 'string') return;
        value = (typeof value === 'object') ? JSON.stringify(value) : value;
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
    trim: function(str) {// 移除首尾空格
        return str.replace(/^\s+|\s+$/gm, '');
    },
    parseQuery: function(querystring) {// 解析查询字符串
        var obj = {};
        var queryArr = null;
        // 如果锚点放在查询字符串之后,使用search
        with(window.location) {
            var q = search ? search : hash;
        }
        querystring = (querystring!== undefined) ? querystring : q;
        // 获取查询字符串数组
        var queryArr = querystring.match(new RegExp('[^\?\&]+=[^\?\&]+', 'g'));
        if (queryArr != null) {
            queryArr.forEach(function(item, index) {
                var temp = decodeURIComponent(item).split('=');
                var str = temp[1];
                obj[temp[0]] = (/^\{|^\[/.test(str) && /\}$|\]$/.test(str)) ? JSON.parse(str) : str;
            });
        }
        return obj;
    },
    getRGB: function(str) {// 将16进制的颜色转换成 10进制 rgb
        // 检测是否是16进制颜色值
        var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        if (str && reg.test(str)) {
            var colorStr = str.toLowerCase();
            if (colorStr.length === 4) {
                var tmpArr = ['#'];
                colorStr.split('').slice(1).forEach(function(item) {
                    tmpArr.push(item, item);
                });
                colorStr = tmpArr.join('');
            }
            var rgb = [];
            for(let i = 1; i < 7; i += 2) {
                rgb.push(parseInt('0x' + colorStr.substr(i, 2), 16));
            }
            return {
                R: rgb[0],
                G: rgb[1],
                B: rgb[2]
            }
        } else {
            return {};
        }
    }
}
