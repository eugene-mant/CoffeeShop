<style lang="scss">
// можна не імпортувати. В vite.config.js додано глобально
//@import "~/styles/_global.scss";

.home-page {
	.slogan-block {
		@include flex-v-box;
		height: calc(100vh - 6rem);

		.slogan-group {
			@include flex-v-box;
			margin: auto;
			min-width: 50%;

			.title {
				padding: $v-space-m;
				font-size: $title-big;
				text-align: center;
			}
		}
		.to-catalog-btn {
			margin: 1rem auto 0;
			color: white;
			@include setPrettyBg(rgb(248, 78, 78), 90deg, rgba(255, 255, 255, 0), rgb(0 0 0 / 10%), 3px);
		}
	}
}

</style>

<template>
	<div class="home-page page">
		<app-header />
		<main>
			<div class="slogan-block">
				<div class="slogan-group">
					<div class="title">{{lbs.homeSlogan}}</div>
					<router-link class="u-btn to-catalog-btn" to="/test">{{lbs.catalog}}</router-link>
				</div>
			</div>
			
			<div class="u-block" style="height: 40em; width: 50%; margin-left: 3rem"></div>
			<div class="u-block" style="height: 600px; width: 70%; margin: 2rem 3rem 0 auto"></div>
			<div class="u-block" style="height: 20rem; width: 40%; margin: 5rem auto"></div>
		</main>
		<app-footer />
	</div>
</template>

<script>
import HeaderPv from '~/views/part-view/HeaderPv.vue';
import FooterPv from '~/views/part-view/FooterPv.vue';

export default {
	name: 'HomePage',
	data : () => ({
		lbs: {
			homeSlogan : 'Цей слоган увікни...',
			catalog: 'КАТАЛОГ'
		}
	}),
	components: {
		AppHeader: HeaderPv,
		AppFooter: FooterPv
	},
	methods: {}
}
</script>