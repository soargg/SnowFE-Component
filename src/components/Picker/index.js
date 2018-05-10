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
    pickerInstance.cancel = options.onCancel;

    document.body.appendChild(pickerInstance.$el);

    return pickerInstance;
}

export default Picker;