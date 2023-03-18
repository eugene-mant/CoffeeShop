<styles lang="scss">
.main-wrapper{
    max-width: 900px;
    margin: 0 auto;
}
</styles>

<template>
    <div class="main-wrapper">
    <p>{{ title }}</p>
   
    <Catalog></Catalog>
    </div>
</template>

<script>
import Catalog from './catalog.vue';
import cart from './cart.vue';

export default{
    name: 'main-wrapper',
    components:{
        Catalog,
        cart,

    },
    props:{

    },
    data(){
        return{
            title:'Main wrapper'
        }
    },
    computed:{},
    method:{},
    watch:{},
    mounted(){
        console.log('Hello i am wrapper')
    }
}
</script>