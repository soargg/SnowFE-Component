/*
 *   {\__/}
 *   ( •-•)
 *   /つ 封装一下Ajax.
 */
import axios from 'axios';
import qs from 'qs';
import { analysisUrl } from '../../appassets/javascript/utils';
import Toast from '../components/Toast';

const toString = Object.prototype.toString;
const deCode = window.decodeURIComponent || window.unescape;// url 解码

const $ajax = {
    config: () => {},
    interceptRequest: (params) => {// params,数组或者对象
        let objParams = {}; // 请求之前追加的参数
        if (toString.call(params) === '[object Array]') {// params的类型为数组
            params.forEach((key) => {
                (analysisUrl()[key] !== undefined) && (objParams[key] = deCode(analysisUrl()[key]));
            });
        }
        else if (toString.call(params) === '[object String]') {// params的类型为字符串
            (analysisUrl()[params] !== undefined) && (objParams[params] = deCode(analysisUrl()[params]));
        }
        else if (toString.call(params) === '[object Object]') {// params的类型为字符串的类型为对象
            objParams = params;
        }
        else {
            return;
        }

        axios.interceptors.request.use(
            (config) => {
                if(config.method === 'post') {
                    let data = qs.parse(config.data);
                    config.data = qs.stringify({
                        ...objParams,
                        ...data
                    })
                } else if(config.method === 'get') {
                    config.params = {
                        ...objParams,
                        ...config.params
                    }
                }
                return config;
            }, 
            (error) => {
                return Promise.reject(error);
            }
        );
    },
    /*
        get 请求
        params: {
            url: String,
            data: {},
            success: Function,
            error: Function
        }
    */
    get: (params) => {
        (params.url === undefined) && printError('Error:url is required.');// 请接口时必须的；
        (typeof params.success !== 'function') && printError('Error:success must be a Function.');//

        axios.get(params.url, {
            params: {
                ...params.data
            }
        })
        .then((response) => {
            if (!response) return;
            if (response.data.code == 0) {
                (typeof params.success === 'function') && params.success(response.data);
            } else {
                (typeof params.error === 'function') && params.error(response.data);
            }
        });
    },
    /*
        post 请求
        params: {
            url: String,
            data: {},
            success: Function,
            error: Function
        }
    */
    post: (params) => {
        (params.url === undefined) && printError('Error:url is required.');// 请接口时必须的；
        (typeof params.success !== 'function') && printError('Error:success must be a Function.');// 成功毁掉函数

        axios.post(params.url, {
            ...params.data
        }).then((response) => {
            if (!response) return; // 没有返回数据时不在执行
            if (response.data.code == 0) {
                (typeof params.success === 'function') && params.success(response.data);
            } else {
                (typeof params.error === 'function') && params.error(response.data);
            }
        })
    },
    // Vue注册
    install(Vue) {
        Vue.prototype.$ajax = this;
    }
}

// 请求返回拦截
axios.interceptors.response.use(
    (response) => {
        if (response.data.code !== 0) {// 返回码不为0时Toast错误信息
            Toast({
                text: response.data.message,
                duration: 3000
            });
        }
        return response
    },
    (error) => {
        printError('Error:'+error.response.data + '\nstatus:' + error.response.status + '.');
        Toast({
            text: '请求失败！！！',
            duration: 3000
        });
    }
);

// 错误信息输出
function printError(str) {
    console.error(str);
}

export default $ajax;
