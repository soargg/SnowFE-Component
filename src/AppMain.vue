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
        <t-popup v-model="isPopup" popup-transtion="popup-opacity">
            <h1>标题一</h1>
            <h2>标题2</h2>
        </t-popup>

        <button @click="isPopup = true">click</button>
    </div>
</template>

<script>
    import Icon from './components/Icon';
    import Foldlist from './components/Foldlist';
    import Folditem from './components/Folditem';
    // 弹窗
    import Poppup from './components/Popup';

    export default {
        data() {
            return {
                isPopup: false
            };
        },
        methods: {
            closeHandle() {
                alert('close');
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
</style>
