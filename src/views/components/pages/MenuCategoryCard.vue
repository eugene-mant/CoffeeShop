<styles lang="scss" scoped>
	$page-margin-side: 3rem;
	$cards-space-between: 2rem;

	.menu-category-card {
		flex: 1;
        flex-direction: column;
		display: flex;
		//width: 50%;
		//height: 25rem;
		//background: #ddd;
        border-radius: .8em;

		&:not(:last-child) {
  			margin-right: $cards-space-between;
		}


		.card-title {
			font-size: 3em;
			margin: auto;
		}
        .card-description {
            margin: 0 auto 1em;
            font-size: 1.5em;
            padding: 0 1em;
        }
	}
</styles>

<template>
    <router-link class="menu-category-card" :to="data.url">
        <div class="v-box" style="flex:1">
            <div class="card-title">{{data.title}}</div>
        </div>
        <div class="card-description">{{data.description}}</div>
    </router-link>
</template>

<script>
export default {
	name: 'MenuCategoryCard',
    props: ['data']
}
</script>