# Toast

简短的消息提示框，支持自定义位置、持续时间

## 引入

```javascript
import Toast from '../../appassets/components/Toast';
```

## 例子

基本用法

```javascript
Toast('艺术的粉尘')；//默认存在时间2000ms
```

在调用 `Toast` 时传入一个对象即可配置更多选项

```javascript
Toast({
    text: 'toast',
    duration: 3000,
    position: 'middle'
});
```

## API

| 参数     | 说明                     | 类型   | 可选值                        | 默认值   |
| -------- | ------------------------ | ------ | ----------------------------- | -------- |
| text     | toast提示文案            | string | -                             | -        |
| duration | 持续时间，单位ms         | number | -                             | 2000     |
| position | 位置                     | String | 'top'<br>'middle'<br>'bottom' | 'middle' |
| align    | 文本对齐方式（默认居中） | String | 'left'                        | ''       |