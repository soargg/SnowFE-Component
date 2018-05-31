<template>
    <div v-show="isLoading" @touchmove.prevent class="raz-img-loading">
      <div class="inner">
        <div class="raz-loading-spinner">
          <i class="raz-loading-dot"></i>
          <div class="raz-loading-message">{{ message }}</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        data() {
            return {
                message: '',
                isLoading: false //loading的显示与隐藏
            };
        },
        methods: {
            loading(msg) {
                this.message = msg;
                this.isLoading = true;
            },
            close() {
                this.isLoading = false;
            }
        }
    };    
</script>

<style lang="scss" scoped>
    .raz-img-loading {
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2)
    }
    .raz-img-loading .inner {
        width: 120px;
        height: 120px;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 5px;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #FFFFFF;
    }
    .raz-loading-dot {
        bottom: 25%;
        height: 12px;
        width: 12px;
        border-radius: 100%;
        background: #76b5ff;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        -webkit-animation: spin 1.5s ease infinite;
        animation: spin 1.5s ease infinite
    }
    .raz-loading-message {
        position: absolute;
        bottom: 14%;
        color: #666;
        font-size: 14px;
        width: 100%;
        text-align: center
    }
    .raz-loading-dot:before {
        background-color: #ffb63f
    }
    .raz-loading-dot:after {
        background-color: #72dee1
    }
    .raz-loading-dot:before,
    .raz-loading-dot:after {
        content: "";
        display: block;
        position: absolute;
        height: inherit;
        width: inherit;
        border-radius: inherit;
        -webkit-animation: spin 1.5s ease infinite;
        animation: spin 1.5s ease infinite
    }
    .raz-loading-dot:before {
        left: -16.8px
    }
    .raz-loading-dot:after {
        left: 16.8px
    }
    @-webkit-keyframes spin {
        0% {
            top: 0;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg)
        }
        50% {
            top: -20px;
            -webkit-transform: rotate(-180deg);
            transform: rotate(-180deg)
        }
        100% {
            top: 0;
            -webkit-transform: rotate(-360deg);
            transform: rotate(-360deg)
        }
    }
    @keyframes spin {
        0% {
            top: 0;
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg)
        }
        50% {
            top: -20px;
            -webkit-transform: rotate(-180deg);
            transform: rotate(-180deg)
        }
        100% {
            top: 0;
            -webkit-transform: rotate(-360deg);
            transform: rotate(-360deg)
        }
    }
</style>

