<styles lang="scss" scoped>
	$cards-space-between: 2rem;

    .u-block-1 {
        //width: 80%;
        height: 15rem;
        margin: auto;
    }

	.group {
		justify-content: space-between;
		margin: $cards-space-between 0;
	}
	.menu-category-card {
		flex: 1;
		display: flex;
		height: 25rem;
		background: #ddd;

		&:not(:last-child) {
  			margin-right: $cards-space-between;
		}
	}

	.bread-crumbs {
		width: 40%;
		height: .8rem;
	}
</styles>

<template>
	<div class="page">
		<app-header />
		<main>
            <div class="page-title">{{title}}</div>
			<in-dev class="bread-crumbs" type="component" title="Хлібні крихти" />
			<div class="group h-box">
				<menu-category-card :data="categories[0]" />
				<menu-category-card :data="categories[1]" />
			</div>
			<in-dev class="u-block-1" type="view" title="Рекомендовані вам" />
			<div class="group h-box">
				<menu-category-card :data="categories[2]" />
				<menu-category-card :data="categories[3]" />
				<menu-category-card :data="categories[4]" />
			</div>
        </main>
		<app-footer />
	</div>
</template>

<script>
import HeaderPv from '~/views/part-view/HeaderPv.vue';
import FooterPv from '~/views/part-view/FooterPv.vue';
import MenuCategoryCard from '~/views/components/pages/MenuCategoryCard.vue';

const categories = [
	{ 
		title: 'Кава', 
		url: '/menu/coffee', 
		description: 'Наш супер-класний опис...', 
		img: '...' 
	},
	{ title: 'Випічка', url: '/menu/cakes', description: 'Теж такий класний опис' },
	{ title: '?', url: '/menu/hz', 
		description: 'хз, як назвати категорію, де і зерна і ложки з виделками' },
	{ title: 'Подарунки', url: '/menu/gifts' },
	{ title: 'Більше', url: '/menu/all' }
];

export default {
	name: 'MenuPage',
	data : () => ({
        title: 'Меню',
		categories
	}),
	components: {
		AppHeader: HeaderPv,
		AppFooter: FooterPv,
		MenuCategoryCard
	}
}
</script>