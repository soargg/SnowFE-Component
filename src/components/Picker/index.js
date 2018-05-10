import Vue from 'vue';
import picker from './picker.vue';
// 创造一个picker构造器;
const PickerConstructor = Vue.extend(picker);

const Picker = (options = {}) => {
    // 创建picker实例
    let pickerInstance = new PickerConstructor({
        el: document.createElement('div')
    });
    // picker 标题
    pickerInstance.title = options.title || '';
    pickerInstance.items = (Object.prototype.toString.call(options.data) == '[object Array]') ? options.data : [];
    pickerInstance.select = options.onSelect;
    pickerInstance.cancel = options.onCancel;

    document.body.appendChild(pickerInstance.$el);

    return pickerInstance;
};
// 用于 Vue 对象全局绑定。
Picker.install = (Vue) => {
    Vue.prototype.$Picker = Picker;
}

export default Picker;