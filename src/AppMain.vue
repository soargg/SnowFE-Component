<template>
    <div class="container">
        <div class="loop-wrap">
            <loop-img :imgs="imgs" :duration="0.5" :gap-time="4"/>
        </div>
        <h4>Hello World!!</h4>
        <div class="inp-wrap">
            屏宽：<input type="number" placeholder="屏幕宽度" v-model="screenW" class="inp"><br>
            计算值：<input type="text" v-model="initSize" class="inp">
            <h4>结果：{{ compuSize }}</h4>
        </div>
        <t-icon type="4column"/>
        <div class="box">
            <t-foldlist :initial-number='5'>
                <t-folditem v-for="i in 5" :key="i" class="item">
                    {{ i }}
                </t-folditem>
            </t-foldlist>
        </div>
        <t-popup v-model="isPopup" popup-transtion="popup-slide-top" popup-position="bottom" :to-block="true">
            <div class="bg-white">
                <h1>标题一</h1>
                <h2>标题2</h2>
            </div>
        </t-popup>

        <button @click="isPopup = true" class="btn">Poppup</button>
        <button @click="handleClick" class="btn">Toast</button>
        <button @click="handlePicker" class="btn">Picker</button>
        <div class="box">
            <pro :rate="rate" :active="true" :standard="60"/>
        </div>
    </div>
</template>

<script>
    import Icon from './components/Icon';
    import Foldlist from './components/Foldlist';
    import Folditem from './components/Folditem';
    // 弹窗
    import Popup from './components/Popup';

    import Toast from './components/Toast';
    import Picker from './components/Picker';
    import pro from './components/Progress';
    import loopImg from './components/LoopImg';

    export default {
        data() {
            return {
                isPopup: false,
                initSize: 0,
                screenW: 414,
                rate: 58,
                imgs: [
                    {
                        imgSrc: '/src/assets/img/bg1/bg1.jpg',
                        link: 'https://tall-ui.github.io'
                    },
                    '/src/assets/img/bg1/bg2.jpg',
                    '/src/assets/img/bg1/bg3.jpg',
                    '/src/assets/img/bg1/bg4.jpg',
                ]
            };
        },
        computed: {
            compuSize() {
                return Math.floor(this.screenW * this.initSize / 750);
            }
        },
        mounted() {
            this.picker = Picker({
                title: '请选择班级',
                data: [
                    {text: '一年级1班', value: '1'},
                    {text: '一年级2班', value: '2'},
                    {text: '一年级3班', value: '3'},
                    {text: '一年级4班', value: '4'},
                    {text: '一年级5班', value: '5'},
                    {text: '一年级6班', value: '6'},
                    {text: '一年级7班', value: '7'},
                ],
                onSelect(text, value, index) {
                    Toast({
                        text: 'text:' + text + '  value:' + value + '  index：' + index
                    })
                },
                onCancel() {
                    Toast({
                        text: '取消了'
                    })
                }
            });
        },
        methods: {
            handleClick() {
                Toast({
                    text: '不要再点了，再点也没用！！！',
                    duration: 2000,
                    position: 'middle'
                });
            },
            handlePicker() {
                this.picker.show();
            }
        },
        components: {
            't-icon': Icon,
            't-foldlist': Foldlist,
            't-folditem': Folditem,
            't-popup': Popup,
            pro,
            loopImg
        }
    };
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    }
    .container {
        .loop-wrap {
            height: remfun(400);
            overflow: hidden;
        }
    }
    
    .box {
        margin-bottom: remfun(20);
        padding-top: remfun(50);

        .item {
            padding-left: remfun(20);
            border-bottom: 1px solid #E6e6e6
        }

        
    }
    .btn {
        width: remfun(200);
        height: remfun(60);
    }

    .bg-white {
        background-color: #fff;
    }

    .img-box {
        position: relative;
        img {
            width: 100%;
        }
        .text {
            position: absolute;
            left: remfun(150);
            top: remfun(180);
            font-size:remfun(40);
            color: black;
            font-weight: bold;
        }
    }

    .inp-wrap {
        margin: remfun(25) 0;
        font-size: remfun(38);
        .inp {
            height: remfun(50);
            border: 1px sol
        }
    }
</style>
