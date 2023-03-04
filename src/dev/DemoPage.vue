<styles lang="scss">
	.login-block {
		display: flex;
		flex-direction: column;
		width: 20rem;
		//height: 30rem;
		padding: 1rem;
		//background: #ddd;

		position: absolute;
		top: 8rem;
		left: 50%;

		border-radius: 1rem;
		backdrop-filter: blur(10px);
		box-shadow: 0 0 1em rgb(0 0 0 / 10%);
		align-items: center;


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
				border-bottom: 1px dashed cadetblue;
			}
			.to-singup {
				flex: 1;
			}

			.login-btn {
				margin: auto 60% auto 0;
				padding: 0.8rem 1em;
				border: 1px solid cadetblue;
				border-radius: 0.8em;
				color: cadetblue;
				font-weight: 500;
				box-sizing: border-box;
				
				
				&:hover {
					background-color: cadetblue;
					color: whitesmoke;
				}
			}
			.signup-link {
				display: inline-block;
				margin-left: .5rem;
				color: cadetblue;
				font-size: larger;
				font-weight: 600;
			}
		}
	}

	.open-login-btn {
		height: 3rem;
		width: 3rem;
		border-radius: 1rem;
		background-color: #ddd;

		position: absolute;
		top: 4rem;
		left: 50%;
	}
	

	.demo-block-content1 {
		position: absolute;
		top: 20rem;
		left: 5%;
		display: flex;
		flex-wrap: wrap;

		.v-icon {
			width: 3rem;
			height: 3rem;
			margin-left: 1rem;

			.v-icon-home {
				fill: #582;
				transition: .3s;
				&:hover {
					fill: rgb(172, 255, 88);
				}
			}
			.v-icon-email {
				fill: rgb(207, 137, 45);
				transition: .8s;
				&:hover {
					fill: rgb(41, 168, 190);
				}
			}
			.v-icon-login {
				fill: rgb(140, 151, 130);
				transition: 1s;
				&:hover {
					fill: rgb(112, 178, 253);
				}
			}
			.v-icon-eye {
				fill: rgb(136, 34, 39);
				transition: 2s;
				&:hover {
					fill: rgb(216, 123, 193);
				}
			}
			.v-icon-password {
				fill: rgb(136, 134, 34);
				&:hover {
					fill: rgb(16, 170, 42);
					stroke:black;
					stroke-width: 4px;
				}
			}
		} 
	}
</styles>

<template>
	<div class="demo-page page">
		<main>
			<div class="demo-block">
				<h2>Demo: Login form</h2>
				<div class="demo-block-content">
					<div style="position: absolute; left: 50%; top: 2rem">{{lbs.clickMe}}</div>

					<div class="open-login-btn v-icon-80" 
						v-icon="'login'"
						@click="isOpenLoginBlock = !isOpenLoginBlock"
						></div>
					<div class="login-block" v-show="isOpenLoginBlock">
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
									@click="onChange">{{lbs.login}}</button>
							</div>
							<div class="to-signup field v-box">
								<div style="margin: 0 auto">
									<span>{{lbs.noAccount}}</span>
									<a class="signup-link" href="#">{{lbs.signup}}</a>
								</div>
							</div>
						</form>

					</div>
					
				</div>

				<div style="position: absolute; left: 15%; top: 17rem">{{lbs.hoverMe}}</div>
				<div class="demo-block-content1">
					<div v-icon="'home'" class="v-icon-60" />
					<div v-icon="'email'" class="v-icon-70" />
					<div v-icon="'login'" class="v-icon-90" />
					<div v-icon="'eye'" class="v-icon-100" />
					<div v-icon="'password'" class="v-icon-110" />
				</div>
			</div>
		</main>
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
	name: 'DemoPage',
	components: {
		VTextbox
	},
	data : () => ({
		isOpenLoginBlock: false, 
		lbs: labels,
		loginFormData: {
			email: 'blah-blah@blah.cc',
			password: '',

		}
	}),
	computed: {},
	watch: {},
	methods: {
		onChange(...args) {
			console.log('onChange: ', args, this.loginFormData);
		}
	}
}
</script>