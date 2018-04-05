<template>
    <div class="list-item">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    }

    .list-item {
        display: flex;
        flex-flow:row nowrap;
        height: remfun(60);
        padding: remfun(6) 0;
        box-sizing: border-box;
        font-size: remfun(28);
        line-height: remfun(44);
        overflow: hidden;
        background-color: #ffffff;        
    }
</style>
