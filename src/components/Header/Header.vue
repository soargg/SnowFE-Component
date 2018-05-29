<template>
    <div class="header-wrap">
        <div class="back-header" ref="headerEle" :style="{
                'background': baColor,
                'color': textColor
            }">
            <div class="item item-back">
                <span @click="goBack" class="icon-back">
                    <t-icon type="arrowRight"/>
                </span>
            </div>
            <div class="item item-title">
                {{ title }}
            </div>
            <div v-if='picker.show' class="item header-item-picker" @click="pickering">
                <span class="picker-text">学习时长</span>
                <span class="header-icon-arrow" :class="{'header-icon-arrow-up': selecting}">
                    <t-icon type="arrowDown"/>
                </span>
            </div>
            <div v-else class="item header-item-picker"></div>
        </div>
    </div>
</template>

<script>
    import tIcon from '../Icon';
    import Picker from '../Picker';
    export default {
        props: {
            config: {
                type: Object,
                default: () => {
                    return {
                        backgroundColor: '',
                        textColor: '',
                        textScrollColor: ''
                    }
                }
            },
            picker: {
                type: Object,
                default: () => {
                    return {
                        show: false,
                        title: '',
                        data: [],
                        onSelect() {},
                        onCancel() {}
                    }
                }
            },
            title: String
        },
        data() {
            return {
                name: 'BackHeader',
                opacity: 0,
                textColor: this.config.textColor,
                rgb: [],
                tpicker: null,
                selecting: false, // picker选择中
            };
        },
        computed: {
            baColor() {// 存在配置背景色，使用配置，不存在使用默认白色
                if (this.rgb.length !== 0) {
                    return 'rgba('+ this.rgb.join(',') + ',' + this.opacity +')';
                }else {
                    return 'rgba(255, 255, 255,' + this.opacity +')';
                }
            }
        },
        beforeMount() {
            this.getRGB(this.config.backgroundColor);
        },
        mounted() {
            this.$nextTick(() => {
                let H = this.$refs.headerEle.offsetHeight * 2;
                window.addEventListener('scroll', (e) => {
                    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                    // 透明度计算
                    if (H >= scrollTop) {
                        this.opacity = scrollTop / H;
                    } else {
                        this.opacity = 1;
                    }
                    // 设置字体颜色
                    if (scrollTop > 10) {
                        this.textColor = this.config.textScrollColor || '#242424';
                    } else {
                        this.textColor = this.config.textColor || '#FFFFFF';
                    }
                });

                // 添加picker
                if (this.picker.show) {
                    let _self = this;
                    this.tpicker = Picker({
                        titlr: _self.picker.title,
                        data: _self.picker.data,
                        onSelect(text, value, index) {
                            _self.selecting = false;
                            typeof _self.picker.onSelect === 'function' && _self.picker.onSelect(text, value, index);
                        },
                        onCancel() {
                            _self.selecting = false;
                            typeof _self.picker.onCancel === 'function' && _self.picker.onCancel();
                        }
                    });
                }
            });
        },
        methods: {
            goBack() {
                let obj = {
                    handleName: "exitPage",
                    data: {}
                }
                window.location.href = 'http://' + window.location.host + '/event?extra=' + JSON.stringify(obj);
            },
            getRGB(colorStr) {// 将16进制的颜色转换成 10进制 rgb 数组;
                // 检测是否是16进制颜色值
                let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
                // 
                if (colorStr && reg.test(colorStr)) {
                    let str = colorStr.toLowerCase();
                    if (str.length === 4) {// 处理4位的颜色值
                        let tmpArr = ['#'];
                        str.split('').slice(1).forEach((item) => {
                            tmpArr.push(item, item)
                        });
                        str = tmpArr.join('');
                    }
                    let rgb = [];
                    for(let i = 1; i < 7; i += 2) {
                        rgb.push(parseInt('0x' + str.substr(i, 2)));
                    }
                    this.rgb = rgb;
                }
            },
            pickering() {
                this.selecting = true;
                this.tpicker.show();
            }
        },
        components: {
            tIcon
        }
    }
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number /75)+rem;
    }

    .header-wrap {
        height: 64px;
        .back-header {
            position: fixed;
            height: 64px;
            width: 100%;
            left: 0;
            top: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #FFFFFF;
            z-index: 999;

            .item-back {
                width: remfun(250);
                text-align: left;
                line-height: 44px;
                .icon-back {
                    display: inline-block;
                    padding: 0 remfun(30);
                    font-weight: bold;
                    font-size: 18px;
                    transform: rotate(180deg);
                    -moz-transform: rotate(180deg);
                    -o-transform: rotate(180deg);
                    -webkit-transform: rotate(180deg);
                }
            }

            .item-title {
                flex-grow: 1;
                text-align: center;
                font-size: 18px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow:ellipsis;
            }

            .header-item-picker {
                width: remfun(250);
                box-sizing: border-box;
                padding-right: remfun(30);
                font-size: 14px;
                text-align: right;

                .header-icon-arrow {
                    display: inline-block;
                    transition: transform .5s;

                    &.header-icon-arrow-up {
                        transform: rotate(180deg);
                    }
                }

            }
        }
    }
</style>
