<style lang="scss" scoped>

    .btnLogin-popup{
        width: 130px;
        height: 50px;
        background: transparent;
        border: 2px solid rgb(0, 0, 0);
        outline: none;  
        border-radius: 6px;
        cursor: pointer;
        text-align: center;
        font-size: 1.1em;
        color:black;
        font-weight: 500;
        margin-left: 40px;
        transition: .5s;
    }

    .btnLogin-popup:hover {
        background: rgb(104, 196, 238);  
        color: #162938;
    }

    .btnLogin-popup{
        width: 130px;
        height: 50px;
        background: transparent;
        border: 2px solid rgb(0, 0, 0);
        outline: none;  
        border-radius: 6px;
        cursor: pointer;
        text-align: center;
        font-size: 1.1em;
        color:black;
        font-weight: 500;
        margin-left: 40px;
        transition: .5s;
    }

    .btnLogin-popup:hover {
        background: rgb(104, 196, 238);  
        color: #162938;
    }

</style>

<template>
	<div class="page">
        <button class="btnLogin-popup" @click="isOpenLoginForm = !isOpenLoginForm">Login</button>
		<!-- передаємо в компонент prop open. тепер вони повязані з isOpenLoginForm  -->
		<LoginForm :open="isOpenLoginForm" />
	</div>
</template>

<script>
import LoginForm from './LoginForm.vue';

/*
    Переніс твою логін-форму сюди
*/

export default {
	name: 'HomePage',
	data : () => ({
		isOpenLoginForm: false,
	}),
	components: {
		LoginForm: LoginForm 
	},
	methods: {}
}
</script>