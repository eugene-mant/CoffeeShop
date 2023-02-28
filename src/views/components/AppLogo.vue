<styles lang="scss">
    .app-logo {
        width: 100%;
        height: 100%;

        .app-logo-image {
            display: block;
            width: 100%;
            height: 100%;
            background-image: url("https://images.vexels.com/media/users/3/149532/isolated/preview/7ecd44f018ccc3e0bfe0c5f22b925a29-coffee-shop-take-away-badge.png");
            background-size: cover;
            background-position: center;
        }
    }
</styles>

<template>
    <div class="app-logo">
        <router-link v-if="link" class="app-logo-image" :to="link"></router-link>
        <div v-else class="app-logo-image" ></div>
    </div>
</template>

<script>
export default {
	name: 'AppLogo',
    props: { link: '' }
}
</script>