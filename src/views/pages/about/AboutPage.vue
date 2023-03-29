<style lang="scss" scoped>
</style>

<template>
	<div class="about-page page">
        <app-header />
		<div class="page-title">{{title}}</div>
        <div class="u-block" style="height: 40em; width: 50%; margin: auto"></div>
		<div class="u-block" style="height: 600px; width: 70%; margin: 2rem 3rem 0 auto"></div>
		<div class="u-block" style="height: 20rem; width: 40%; margin: 5rem auto; background-color: #86a36a;"></div>
        <app-footer />
	</div>
</template>

<script>
import HeaderPv from '~/views/part-view/HeaderPv.vue';
import FooterPv from '~/views/part-view/FooterPv.vue';


export default {
	name: 'AboutPage',
    data: () => ({
        title: 'About' 
    }),
    components: {
		AppHeader: HeaderPv,
        AppFooter: FooterPv
	}
}
</script>