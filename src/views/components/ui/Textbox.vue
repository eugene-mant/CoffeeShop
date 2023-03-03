<style lang="scss" scoped>
	$height: 2em;
	$space: .4em;
	$color: cadetblue;
	$color-dark: rgb(71, 116, 117);
	
	.v-textbox {
		display: flex;
		position: relative;
		height: $height;
		user-select: none;

		&.v-textbox-password {
			.v-textbox-input {
				padding-right: $height;
			}
		}
		.v-textbox-icon, .v-textbox-sp {
			display: block;
			height: 100%;
			width: $height;
			use {
				fill: $color;
			}
		}
		.v-textbox-icon {
			padding: $space;
			padding-bottom: 0;
		}
		.v-textbox-input-block {
			position: relative;
			display: flex;
			flex: 1;
			z-index: 2;
			
			.v-textbox-input {
				display: flex;
				width: 100%;
				flex: 1;
				color: $color-dark;
				border-bottom: 1px $color-dark solid;

				&:focus {
					border-bottom: 1px $color solid;
				}
			}	
		}
		.v-textbox-label-block {
			position: absolute;
			display: flex;
			width: 100%;
			height: 100%;
			z-index: -1;
			transition: .3s;

			.v-textbox-label {
				position: relative;
				margin: auto 0;
				font-weight: 500;
				color: $color-dark;
				transition: .3s;
			}
		}

		.v-textbox-sp {
			position: absolute;
			right: 0;
			z-index: 3;
			
			.v-icon {
				width: 100%;
				height: 100%;
				background: none;
				opacity: .5;

				&:hover {
					opacity: .7;
				}
				//&::v-deep
				use {
					fill: $color;
				}
			}
			input[type="checkbox"] {
				position: absolute;
				opacity: 0;
				width:0;
				height:0;

				&:checked + .v-icon {
					opacity: 1;
				}
			}	
		}
	}


/* 
	задача: 
		перемістити label вверх при фокусі на input,
		і залишати його там поки input заповнений:

	1. комбінація 
		input:focus + label,
		input:valid + label { ... }

		спрацьовує тільки коли поле обов'язкове (required), і при цьому валідне.
		якщо:
		 - не буде required, input:valid + label спрацює одразу;
		 - вказаний pattern, і він буде невалідний (invalid), 
		 label переміститься вниз і перекриє заповнений input;

	2. комбінація
		input:focus + label,
		input:not(:placeholder-shown) + label { ... }

		здається робочою. тільки потрібно вказувати placeholder.
		можна вказати з пробілом - placeholder=" "
		якщо не вказати placeholder, input:not(:placeholder-shown) + label
		спрацює одразу

	:focus
	:focus-within
	:valid
	:invalid
*/

	.v-textbox-input:focus + .v-textbox-label-block,
	.v-textbox-input:not(:placeholder-shown) + .v-textbox-label-block { 
		.v-textbox-label {
			color: $color;
			transform: scale(.9) 
				translateY(-$height/1.5) 
				translateX(-$space/2);
		}
	}

</style>

<template>
	<div :class="'v-textbox v-textbox-' + type">
		<span v-icon="type" class="v-textbox-icon v-icon-100"></span>
		<div class="v-textbox-input-block">
        	<input class="v-textbox-input" 
				:type="realType" 
				:value="modelValue" 
				placeholder=" " 
				@input="change"
				/>
				<!-- required pattern="[A-Za-z0-9]{1,20}" -->
			<div class="v-textbox-label-block">
				<span class="v-textbox-label">{{label}}</span>
			</div>
	
			<template v-if="type === 'password'">
				<label class="v-textbox-sp">
					<input type="checkbox" @change="tooglePassword" />
					<span v-icon="'eye'" class="v-icon-60" ></span>
				</label>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Textbox',
	props: ['modelValue', 'type', 'label'],
	emits: ['update:modelValue'],
	data : () => ({
		inputValue: '',
		realType: 'text',
	}),
	computed: {},
	methods: {
        change(e) { 
			this.$emit('update:modelValue', e.target.value); 
		},
		tooglePassword(e) {
			this.realType = e.target.checked ? 'text' : this.type;
		}
	},
	created() {
		this.realType = this.type;
    }
}
</script>