<style lang="scss" scoped>
    .login-block {
        margin: auto;
    }
</style>

<template>
	<div class="page">
        <v-auth-block />
	</div>
</template>

<script>
import AuthBlock from '~/views/part-view/AuthBlockPv.vue';

export default {
	name: 'LoginPage',
    components: {
        VAuthBlock: AuthBlock
    },
	data : () => ({
	})
}
</script>