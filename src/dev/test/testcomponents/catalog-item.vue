<template lang="">
    <div class="catalog-item">
        <img :src="productData.image" alt="img"> 
    
        <p class="catalog-item__name name">{{productData.name}}</p>
        <p class="catalog-item__price price">Price:{{productData.price}} $</p>
        <button
         class="catalog-item__add_to_cart_btn btn" 
        @click="sendDataToParent"
        >Add to cart
        </button>
    </div>
</template>

<script>
export default {
    name: 'CatalogItem',
    props: {
        productData: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data() {
        return{

        }
    },
    computed:{},
    methods: {
        sendDataToParent() {
            this.$emit('sendArticle', this.productData.article)
        },
    }
}
</script>

<style lang='scss' scoped>
.catalog-item{
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 16px;
    margin-bottom: 16px;
    margin: 30px;
}

.name{
    margin: 15px;
}

.price{
    margin: 10px;
}

.btn{
    border: #490c0c;
    border-radius: 20px ;
}

    
</style>