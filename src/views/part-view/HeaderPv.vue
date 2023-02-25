<styles lang="scss">
	.header-pv {
		height: 5rem;
		padding: 0 3rem;
		//background: #444;

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
</styles>

<template>
    <header class="header-pv h-box">
        <router-link class="app-logo u-circle" to="/"></router-link>
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