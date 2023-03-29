<style lang="scss" scoped>
	//$main-color: cadetblue;
	$main-color: #888;

	.login-block {
		display: flex;
		flex-direction: column;
		width: 18rem;
		padding: $v-space-sm;

		border-radius: $def-block-border-radius;
		backdrop-filter: blur(10px);
		box-shadow: 0 0 2px rgb(0 0 0 / 18%);
		//background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(204, 204, 204, 0.2588235294) 2px, rgba(221, 221, 221, 0.3294117647) 2px, rgba(255, 255, 255, 0.3803921569) 4px);
    	//background-color: rgb(219 219 219 / 25%);

		@include setPrettyBg(
			rgb(219 219 219 / 25%), 0deg,
			#cccccc00, #ffffff61, 2px);

		.login-block-title {
			font-size: 2rem;
			margin-bottom: 2rem;
		}
		.login-block-form {
			display: flex;
			flex-direction: column;
			//width: 20em;

			.field {
				margin-bottom: 2rem;
				&:last-child {
					margin-bottom: 0;
				}
			}
			.login-email {
				
			}
			.login-password {

			}

			.rem-field {
				flex: 1;
			}
			.forgot-field {
				border-bottom: 1px dashed $main-color;
			}
			.to-singup {
				flex: 1;
			}

			.login-btn {
				margin: auto 60% auto 0;
				padding: 0.8rem 1em;
				border: 1px solid $color-simple-blue;
				border-radius: 0.8em;
				color: $color-simple-blue;
				font-weight: 500;
				box-sizing: border-box;
				
				
				&:hover {
					background-color: $color-simple-blue;
					color: whitesmoke;
				}
			}
			.signup-link {
				display: inline-block;
				margin-left: .5rem;
				color: $color-simple-blue;
				font-size: larger;
				font-weight: 600;
			}
		}
	}
</style>

<template>
	<div class="login-block">
        <div class="login-block-title">{{lbs.login}}</div>
        <form class="login-block-form" action="#">
            <v-textbox class="login-email field"
                type="email" 
                label="Пошта" 
                v-model="loginFormData.email" 
                />
            <v-textbox class="login-password field"
                type="password" 
                label="Пароль" 
                v-model="loginFormData.password" 
                />
            <div class="h-box field">
                <div class="rem-field">{{lbs.rememberMe}}</div>
                <router-link class="forgot-field" 
                    to="/auth/forgot-password" >
                    {{lbs.forgotPass}}
                </router-link>
            </div>
            <div class="login field v-box" >
                <button class="login-btn"
                    @click="onSubmitForm">{{lbs.login}}</button>
            </div>
            <div class="to-signup field v-box">
                <div style="margin: 0 auto">
                    <span>{{lbs.noAccount}}</span>
                    <a class="signup-link" href="#">{{lbs.signup}}</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import VTextbox from '~/views/components/ui/Textbox.vue';

const labels = {
	auth: 'Авторизація',
	login: 'Увійти',
	close: 'Закрити',
	mail: 'Пошта',
	pass: 'Пароль',
	rememberMe: 'Запам\'ятати мене',
	forgotPass: 'Забув пароль?',
	forgotPassMsg: 'Не пощастило',
	signup: 'Реєстрація',
	noAccount: 'Не маєш акаунту?',
	auth: 'Авторизація',
	clickMe: 'Клікай',
	hoverMe: 'Спробуй hover'
};


export default {
	name: 'LoginBlockPv',
	components: {
		VTextbox
	},
    props: ['open'],
	data : () => ({
		lbs: labels,
		loginFormData: {
			email: 'kenny@gmail.com',
			password: 'qwerty123',
		}
	}),
	computed: {},
	watch: {
        open() {
            console.log('open', this.open);
        }
    },
	methods: {
		onChange(...args) {
			console.log('onChange: ', args, this.loginFormData);
		},
		onSubmitForm(e) {
			e.preventDefault();
			
			// валідацію опускаємо
			this.$auth.login({
				username: this.loginFormData.email,
				password: this.loginFormData.password
			})
			.then(res => {
				console.log('login: ', res);
				console.log(this.$auth.state.isAuth)
			})
		}
	}
}
</script>