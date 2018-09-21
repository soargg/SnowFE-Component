<template>
    <div class="container">
        <div v-if="true">
            <div class="loop-wrap">
                <loop-img :imgs="imgs" :duration="0.5" :swipeable="true" :gap-time="4"/>
            </div>
            <div class="t-around">
                <button @click="itemId='t1'" class="btn">tab1</button>
                <button @click="itemId='t2'" class="btn">tab2</button>
                <button @click="itemId='t3'" class="btn">tab3</button>
            </div>
            <div class="loop-wrap">
                <tab-box v-model="itemId">
                    <tab-item id="t1">
                        <img src="/src/assets/img/bg1/bg2.jpg" alt="">
                    </tab-item>
                    <tab-item id="t2">
                        <img src="/src/assets/img/bg1/bg4.jpg" alt="">
                    </tab-item>
                    <tab-item id="t3">
                        <img src="/src/assets/img/bg1/bg3.jpg" alt="">
                    </tab-item>
                </tab-box>
            </div>
            <h4>Hello World!!</h4>
            <div class="inp-wrap">
                屏宽：<input type="number" placeholder="屏幕宽度" v-model="screenW" class="inp"><br>
                计算值：<input type="text" v-model="initSize" class="inp">
                <h4>结果：{{ compuSize }}</h4>
            </div>
            <t-icon type="4column"/>
            <t-popup v-model="isPopup" popup-transtion="popup-scale" popup-position="center" :to-block="true">
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

        <fold-list :initialNumber="3" open-text="展开" foldText="收起">
            <fold-item v-for="i in 6" :key="i" style="border-bottom: 1px solid #eee;">
                <span style="font-size: 24px;">{{i}}</span>
            </fold-item>
        </fold-list>
    </div>
</template>

<script>
    import Icon from './components/Icon';
    import foldList from './components/Foldlist';
    import foldItem from './components/Folditem';
    // 弹窗
    import Popup from './components/Popup';
    import Toast from './components/Toast';
    import Picker from './components/Picker';
    import pro from './components/Progress';
    import loopImg from './components/LoopImg';
    import tabBox from './components/TabBox';
    import tabItem from './components/TabItem';

    export default {
        data() {
            return {
                itemId: 't1',
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
            this.$nextTick(() => {
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
            })
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
            foldList,
            foldItem,
            't-popup': Popup,
            pro,
            loopImg,
            tabBox,
            tabItem
        }
    };
</script>

<style lang="scss" scoped>
    @import url(./assets/css/base.css);
    @function remfun($number) {
        @return ($number / 75) + rem
    }
    .container {
        .loop-wrap {
            height: remfun(400);
            overflow: hidden;
            img {
                width: 100%;
            }
            margin-bottom: remfun(30)
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
        background-color: #FFF;
        font-size: remfun(40);
        color: darkgray;
        font-weight: bold;
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
