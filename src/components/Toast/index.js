import Vue from 'vue';
import toast from './toast.vue';


const ToastConstructor = Vue.extend(toast);
// 定义toast实例池，保存所有的toast实力
let toastPool = [];

let getAnInstance = () => {
    if (toastPool.length > 0) {
        // 获取实例池中的第一个实例，并将该实例从实例池中移除；
        let instance = toastPool[0];
        toastPool.splice(0, 1);
        return instance;
    }
    // 初始创建toast实例
    return new ToastConstructor({
        el: document.createElement('div')
    });
};

// 向实例池池中添加一个toast实例
let returnAnInstance = instance => {
    if (instance) {
        toastPool.push(instance);
    }
};

// 移除toastDOM结构
let removeDom = event => {
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};
// 
ToastConstructor.prototype.close = function() {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    this.closed = true;
    returnAnInstance(this);
};

let Toast = (options = {}) => {
    let duration = options.duration || 3000;

    let instance = getAnInstance();
    instance.closed = false;
    clearTimeout(instance.timer);
    // 文案
    instance.text = typeof options === 'string' ? options : options.text;
    instance.position = options.position || 'middle';

    document.body.appendChild(instance.$el);
    Vue.nextTick(function() {
        instance.visible = true;
        instance.$el.removeEventListener('transitionend', removeDom);
        instance.timer = setTimeout(function() {
            if (instance.closed) return;
            instance.close();
        }, duration);
    });
    return instance;
};

export default Toast;