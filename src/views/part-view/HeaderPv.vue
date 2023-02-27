<styles lang="scss">
	.header-pv {
		height: 5rem;
		padding: 0 3rem;
		//background: #444;

		.app-logo {
			min-width: 3rem;
			min-height: 3rem;
			background: none;
			width: 100px;
			height: 100px;
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
		.logo
		{
			width: 100px;
			height: 100px;

		}
	}
</styles>

<template>
    <header class="header-pv h-box">
		<img class="app-logo" src="https://images.vexels.com/media/users/3/149532/isolated/preview/7ecd44f018ccc3e0bfe0c5f22b925a29-coffee-shop-take-away-badge.png" alt="">
       
        <app-nav />
        <div class="h-box">
            <div class="btn u-circle"></div>	
            <div class="btn u-circle"></div>
            <div class="btn u-circle"></div>
        </div>
    </header>
</template>

<script>
import Navigation from '~/views/components/Navigation.vue';

export default {
	name: 'HeaderPv',
	data : () => ({}),
	components: {
		AppNav: Navigation
	}
}
</script>