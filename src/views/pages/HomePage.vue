<styles lang="scss">
	.slogan {
		height: calc(100vh - 6rem);

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
	.link-demo-page {
		background-color: darkred;
		color: white;
	}
	.app-auth-panel {
		display: none; // приховав логін форму
	}
</styles>

<template>
	<div class="page">
		<app-header />


	    <LoginForm class="app-auth-panel" />
		<div class="slogan v-box">
			<div class="group v-box" style="">
				<div class="title">{{homeSlogan}}</div>
				<router-link class="link-demo-page u-btn" to="/demo">ДЕМО ТУТ</router-link>
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
import LoginForm from '~/views/components/LoginForm.vue';

export default {
	name: 'HomePage',
	data : () => ({
		homeSlogan : 'Цей слоган увікни...'
	}),
	components: {
		AppHeader: HeaderPv,
		AppFooter: FooterPv,
		LoginForm: LoginForm 
	}
}
</script>