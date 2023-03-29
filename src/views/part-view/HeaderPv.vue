<style lang="scss">
$header-height: 6rem;
$header-content-height: 2rem;
$btn-size: $header-content-height;
$search-block-height: $header-content-height;
$logo-height: $header-content-height * 2;

.app-header {
	@include flex-h-box;

	position: relative;
	top:0;
	left: 0;
	justify-content: space-between;
	align-items: center;
	height: $header-height;
	padding: $v-space-sm $page-side-space;

	// допомагає при верстці
	//&, * { outline: 1px dashed #222; }

	& > * {
		margin-right: $v-space-sm;
		&:last-child {
			margin-right: 0;
		}
	}

	.s-filler-block {
		flex: 2;
		display: flex;
		justify-content: right;
		margin-right: $v-space-m;
	}

	.app-logo {
		height: $logo-height;
	}
	.search-block {
		width: 20rem;
		height: $search-block-height / 1.1; // tmp

		@include setPrettyBg(#ddd, -55deg, #ddd, #eee, 5px);
		border-radius: $def-block-border-radius;
		box-shadow: $def-block-inset-shadow;
	}
	.app-header-nav {
		flex: 1;
		justify-content: left;
		height: $header-content-height;
	}
	.app-header-nav-blocks {
		@include flex-h-box;
		& > * {
			margin-right: $v-space-sm;
			&:last-child {
				margin-right: 0;
			}
		}
	}


	.basket-drop-down, .auth-drop-down {
		width: 100%;
		height: 100%;

		.v-tdd-content {
			position: absolute;
			top: 3rem;
			right: -1rem;
		}
		.v-tdd-btn {
			width: 80%;
			height: 80%;
			margin: auto;
		}
	}
	.basket-block {
		height: $btn-size;
		width: $btn-size;
		
		.basket-body {
			display: flex;
			background: antiquewhite;
			width: 10rem;
			height: 5rem;
			border-radius: $def-block-border-radius;

			& > * {
				margin: auto;
			}
		}
	}
	.auth-block {
		height: $btn-size;
		width: $btn-size;
		position: relative;

		.auth-content {}

		.profile-btn {
			height: $btn-size;
			width: $btn-size;
		}
	}
}
</style>

<template>
    <header class="app-header">
		<app-logo link="/" />
		<div class="s-filler-block">
			<div class="search-block" title="Тут буде блок пошуку"></div>
		</div>
		<app-top-navigation class="app-header-nav" />

		<nav class="app-header-nav-blocks">
			<div class="basket-block">
				<v-tmpl-drop-down class="basket-drop-down">
					<template #button>
						<div v-icon="'basket'"></div>
					</template>
					<template #content>
						<div class="basket-body">
							<span>Корзина порожня</span>
						</div>
					</template>
				</v-tmpl-drop-down>
			</div>

			<!-- блок буде відображатись якщо юзер не авторизований -->
			<div v-if="!$auth.isAuth" class="auth-block" >
				<v-tmpl-drop-down class="auth-drop-down">
					<template #button>
						<div v-icon="'login'"></div>
					</template>
					<template #content>
						<app-auth-block class="auth-content"></app-auth-block>
					</template>
				</v-tmpl-drop-down>
			</div>
			<!-- якщо юзер авторизований -->
			<div v-else class="auth-block" >
				<router-link class="profile-btn" v-icon="'user'" to="/profile">
				</router-link>
			</div>
		</nav>
    </header>
</template>

<script>
import AppLogo from '~/views/components/AppLogo.vue';
import TopNavigation from '~/views/components/TopNavigation.vue';
import AuthBlock from '~/views/part-view/AuthBlockPv.vue';

import VTmplDropDown from '~/views/components/ui/TmplDropDown.vue';

export default {
	name: 'HeaderPv',
	data : () => ({
	}),
	components: {
		AppLogo,
		AppTopNavigation: TopNavigation,
		AppAuthBlock: AuthBlock,
		VTmplDropDown
	}
}
</script>