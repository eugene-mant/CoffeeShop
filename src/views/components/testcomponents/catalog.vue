<template >
    <div class='catalog'>
        <h1>Catalog</h1>
        <div class="catalog__list">
            <catalogItem
             v-for="product in products"
             :key="product.article"
             :product_data="product"
             @sendArticle="showChildArticleInConsole"
            />
        </div>
       
    </div>
</template>

<script>
import catalogItem from './catalog-item.vue';

export default {
    name: 'catalog',
    components: {
        catalogItem,
    },
    props: {},
    data() {
        return {

            products: [
                {
                    image: "1.jpg",
                    name: "Americano",
                    price: 111,
                    article: "1",
                    available: true,
                    category: "drink"
                },
                {
                    image: "2.jpg",
                    name: "Americano",
                    price: 222,
                    article: "2",
                    available: true,
                    category: "drink"
                },
                {
                    image: "3.jpg",
                    name: "Americano",
                    price: 333,
                    article: "3",
                    available: false,
                    category: "drink"
                },
                {
                    image: "4.jpg",
                    name: "Americano",
                    price: 444,
                    article: "4",
                    available: true,
                    category: "drink"
                },
                {
                    image: "5.jpg",
                    name: "Americano",
                    price: 555,
                    article: "5",
                    available: false,
                    category: "drink"
                },
                {
                    image: "6.jpg",
                    name: "Americano",
                    price: 666,
                    article: "6",
                    available: true,
                    category: "drink"
                }
            ],
        }
    },
    computed: {},
    methods: {
        showChildArticleInConsole(data){
            console.log(data)
        }
    },

}
</script>

<styles lang="scss">
h1{
    margin-top: 50px;
}

.catalog{
    &__list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-beetween;
        align-items: center;
    }
}
</styles>