<template >
    <div class='catalog'>
        <h1>Catalog</h1>
        <div class="catalog__list">
            <catalogItem
             v-for="product in products"
             :key="product.article"
             :product-data="product"
             @sendArticle="showChildArticleInConsole"
            />
        </div>
        <div v-show="isLoad" class="catalog-load-msg">Йде завантаження...</div>
    </div>
</template>

<script>
import api from '~/bll/productsApi.js';
import catalogItem from './catalog-item.vue';

export default {
    name: 'catalog',
    components: {
        catalogItem,
    },
    props: {},
    data() {
        return {
            isLoad: false,
            products: []
        }
    },
    computed: {},
    methods: {
        showChildArticleInConsole(data){
            console.log(data)
        },
        loadData() {
            this.isLoad = true;

            // отримуємо з api всі товари
            api.getProducts()
            /* 
                звісно це відбудеться миттєво, бо у нас немає ніякого звернення до сервера
                розкоментуй цей код і отримаєш 4 секунди затримки
                це демо того, що буде при реальному запиті. 
                нам потрібно це враховувати, і показувати користувачу що йде завантаження
            */
            //.then((p) => new Promise((resolve) => { setTimeout(() => resolve(p), 4000) }))
            .then(products => {
                this.products = products;
                this.isLoad = false;
            });
        }
    },
    created() {
        this.loadData();
    }
}
</script>

<style lang="scss">
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
    .catalog-load-msg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #ffffffde;
        font-size: 2.5rem;
        line-height: 100vh;
    }
}
</style>