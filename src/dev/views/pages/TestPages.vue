<style scoped>
.test-page {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

}
</style>


<template>
    <div class="test-page">
        <p>Hello Vue!</p>
        <mainWrapper></mainWrapper>
    </div>
</template>


<script>
import mainWrapper from '~/dev/test/testcomponents/main-wrapper.vue';

export default{
    name: 'TestPages',
    components:{
        mainWrapper,
    }
}

</script>