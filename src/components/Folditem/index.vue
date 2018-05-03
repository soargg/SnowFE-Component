<template>
    <div class="list-item  tal-fold-list-item">
        <slot />
    </div>
</template>
<script>
    export default {
        name: 'Folditem'
    };
</script>
<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    }

    .list-item {
        width: auto;
        display: -webkit-flex;
        display: flex;
        flex-flow: row nowrap;
        padding: remfun(5) 0;
        box-sizing: border-box;
        overflow: hidden;      
    }
</style>
