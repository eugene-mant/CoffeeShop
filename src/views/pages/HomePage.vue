<styles lang="scss">
    header {
		padding: 2rem 3rem;

		.app-logo {
			min-width: 3rem;
			min-height: 3rem;
			background: #aaa;
		}
		.main-nav {
			margin: auto;
		}
		.btn {
			width: 2rem;
			height: 2rem;
			background: #aaa;
			margin-left: 1rem;
		}
		* {
			margin-top: auto;
			margin-bottom: auto;
		}
	}
	.slogan {
		height: calc(100vh - 5rem);

		.group {
			margin: auto;
			width: 50%;

			.title {
				padding: 2rem;
				font-size: 4rem;
				font-weight: 600;
				background: #aaa;
			}
			a {
				margin: 1rem auto 0;
			}
		}
	}
</styles>

<template>
	<div class="page">
		<app-header />
		<div class="slogan v-box">
			<div class="group v-box" style="">
				<div class="title">{{homeSlogan}}</div>
				<router-link class="u-btn" to="/products">Shop now</router-link>
			</div>
		</div>

		<div class="u-block" style="height: 40em; width: 50%; margin-left: 3rem"></div>
		<div class="u-block" style="height: 600px; width: 70%; margin: 2rem 3rem 0 auto"></div>
		<div class="u-block" style="height: 20rem; width: 40%; margin: 5rem auto"></div>
		<app-footer />
	</div>
</template>

<script>
import HeaderPv from '~/views/part-view/HeaderPv.vue';
import FooterPv from '~/views/part-view/FooterPv.vue';

export default {
	name: 'HomePage',
	data : () => ({
		homeSlogan : 'Цей слоган увікни...'
	}),
	components: {
		AppHeader: HeaderPv,
		AppFooter: FooterPv
	}
}
</script>