<styles lang="scss">
	.header-pv {
		position: fixed;
		padding: 20px 100px;
		//background: #ddd;
		top:0;
		left: 0;
		width: 100%;
		display:flex;
		justify-content: space-between;
		align-items: center;
		z-index: 99;
		
		.app-logo {
			height: 6rem;
			width: 6rem;
			margin: auto 0;
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
	}
</styles>

<template>
    <header class="header-pv h-box">
		<app-logo link="/" />
        <app-nav @toggleLoginForm="$emit('toggleLoginForm')" />
    </header>
</template>

<script>
import AppLogo from '~/views/components/AppLogo.vue';
import Navigation from '~/views/components/Navigation.vue';

export default {
	name: 'HeaderPv',
	data : () => ({}),
	components: {
		AppLogo,
		AppNav: Navigation
	}
}
</script>