import Vue from 'vue';
import loading from './src/Loading.vue';

const LoadingConstructor = Vue.extend(loading);
const Loading = new LoadingConstructor({
    el: document.createElement('div')
})
document.body.appendChild(Loading.$el);

// 通过 Vue.use() 可以注册Vue插件
Loading.install = function(Vue) {
    Vue.prototype.$Loading = this;
}

export default Loading;