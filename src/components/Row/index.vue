<template>
    <div class="t-row-container">

    </div>
</template>

<script>
    export default {

    };
</script>

<style lang="scss" scoped>
    @function remfun($number) {
        @return ($number / 75) + rem
    }
    .t-row-container {
        display: -webkit-flex;
        display: flex;

        color: red;
    }
</style>