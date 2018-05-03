<template>
    <div class="container">
        <h1>Hello World!!</h1>
        <t-icon type="4column"/>
        <div class="box">
            <t-foldlist>
                <t-folditem v-for="i in 15" :key="i" class="item">
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

        <button @click="isPopup = true" class="btn">click</button>
        <button @click="handleClick" class="btn">Toast</button>
        <div class="box">

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
                    text: '不要再点了，再点也没用！！！',
                    duration: 2000,
                    position: 'middle'
                });
            },
           
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

    .box {
        height: 1500px;
        background-color: aqua;
    }
</style>
