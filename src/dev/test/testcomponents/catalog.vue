<template >
    <div class='catalog'>
        <h1>Catalog</h1>
        <div class="catalog__list">
            <!-- раз робиш ...mapGetters([, чому б не використовувати? -->
            <catalogItem
             v-for="product in PRODUCTS"
             :key="product.article"
             :product-data="product"
             @sendArticle="showChildArticleInConsole"
            />
        </div>
        <div v-show="isLoad" class="catalog-load-msg">Йде завантаження...</div>
    </div>
</template>

<script>

import catalogItem from './catalog-item.vue';
import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'catalog',
    components: {
        catalogItem,
    },
    props: {},
    data() {
        return {
            
            
        }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS'
        ])
    },
    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_API'
          ]),
        showChildArticleInConsole(data){
            console.log(data)
        }
    },
    created() {
        // нащо чекати поки компонент буде змонтований?
        // можна завантажувати при строренні
        this.GET_PRODUCTS_FROM_API();
    },
    mounted() {
        // компоненту не обов'язково знати такі страшні подробиці
        /*
        this.GET_PRODUCTS_FROM_API()
        .then((response) =>{
            if(response.data){
                console.log('Data arriver!');
            }
        })
        */
    },
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