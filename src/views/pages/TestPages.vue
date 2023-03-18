<style scoped>
#app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

}
</style>


<template>
    <div id="app">
        <p>Hello Vue!</p>
        <mainWrapper></mainWrapper>
    </div>
</template>


<script>
import mainWrapper from '../components/testcomponents/main-wrapper.vue';

export default{
    name: 'TestPages',
    components:{
        mainWrapper,
    }
}

</script>