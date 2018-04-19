<template>
    <div class="container">
        <h1>Hello World!!</h1>
        <t-icon type="4column"/>
        <div class="box">
            <t-foldlist>
                <t-folditem v-for="i in 5" :key="i" class="item">
                    {{ i }}
                </t-folditem>
            </t-foldlist>
        </div>
        <t-popup v-model="isPopup" popup-transtion="popup-scale">
            <h1>标题一</h1>
            <h2>标题2</h2>
        </t-popup>

        <button @click="isPopup = true" class="btn">click</button>
        <button @click="dom2image" class="btn">DOMtoIMAGE</button>

        <div id="toast"></div>

        <div ref='toImg' class="img-box">
            <img src="./assets/img/1.png" alt="">
            <div class="text">稻香村</div>
        </div>
    </div>
</template>

<script>
    import Icon from './components/Icon';
    import Foldlist from './components/Foldlist';
    import Folditem from './components/Folditem';
    // 弹窗
    import Poppup from './components/Popup';

    import Toast from './components/Toast';

    import toast from './components/Toast/toast.vue';

    // toImage插件
    import domtoimage from 'dom-to-image';

    export default {
        data() {
            return {
                isPopup: false
            };
        },
        mounted() {
        },
        methods: {
            handleClick() {
                Toast({
                    text: '您没有获得奖品',
                    duration: 2000,
                    position: 'middle'
                });
            },
            dom2image() {
                let node = this.$refs.toImg;
                node.style.transform = 'scale(3)';

                domtoimage.toPng(node, {
                    
                }).then(dataUrl => {
                    console.log(dataUrl);
                    node.style.transform = 'scale(1)';
                })
            }
        },
        components: {
            't-icon': Icon,
            't-foldlist': Foldlist,
            't-folditem': Folditem,
            't-popup': Poppup
        }
    };
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    }
    .container {
        background-color: #eeeeee;
    }

    .box {
        margin-bottom: remfun(20);

        .item {
            padding-left: remfun(20);
        }
    }
    .btn {
            width: remfun(200);
            height: remfun(60);
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
</style>
