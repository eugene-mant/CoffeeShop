<template lang="">
    <div class="catalog-item">
        <img :src="imageSrc" alt="img"> 
        
        <!-- помилка з відображенням картинок 
            поки відображається тільки одна картинка та не береться шлях з данних які надходять
            були спроби використати: 
            <img :src="require('~/assets/images/' + product_data.image)" alt="img">
            це видало помилку ,що воно не задефіновано саме помилка в "require"
            потім я спробував

            <img :src="getImageUrl(product_data.image)" alt="img">

           methods: {
                 getImageUrl(imageName) {
                  return require("~/assets/images/" + imageName);
                 },
              },

              нажаль це викликало тільки помилки(
        -->
        <p class="catalog-item__name name">{{product_data.name}}</p>
        <p class="catalog-item__price price">Price:{{product_data.price}} $</p>
        <button
         class="catalog-item__add_to_cart_btn btn" 
        @click="sendDataToParent"
        >Add to cart
        </button>
    </div>
</template>

<script>
import imgSrc from '~/assets/images/1.jpg'


export default {
    name: 'CatalogItem',
    props: {
        product_data: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data(){

        return{
            imageSrc: imgSrc,
        }
    },
    computed:{},
    methods: {
        sendDataToParent() {
            this.$emit('sendArticle', this.product_data.article)
        }
    }
}
</script>

<styles lang='scss'>
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

    
</styles>