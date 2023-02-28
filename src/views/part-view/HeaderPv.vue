<styles lang="scss">
	.header-pv {
		height: 6rem;
		padding: 0 3rem;
		//background: #ddd;
		
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
        <app-nav />
        <div class="h-box" style="margin: auto 0">
            <div class="btn u-circle"></div>	
            <div class="btn u-circle"></div>
            <div class="btn u-circle"></div>
        </div>
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