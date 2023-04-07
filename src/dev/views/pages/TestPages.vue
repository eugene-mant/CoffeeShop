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
        <app-header />
        <mainWrapper></mainWrapper>
        <app-footer />
    </div>
</template>


<script>
import HeaderPv from '~/views/part-view/HeaderPv.vue';
import FooterPv from '~/views/part-view/FooterPv.vue';
import mainWrapper from '~/dev/test/testcomponents/main-wrapper.vue';

export default{
    name: 'TestPages',
    components:{
        AppHeader: HeaderPv,
		AppFooter: FooterPv,
        mainWrapper,
    }
}

</script>