<template>
    <div class="cart-item">
      <div class="cart-item__image-container">
        <img :src="productData.image" :alt="productData.name" class="cart-item__image" />
      </div>
      <div class="cart-item__info">
        <p class="cart-item__name">{{ productData.name }}</p>
        <p class="cart-item__price">{{ productData.price }} $</p>
        <p class="cart-item__quantity">Quantity: {{ quantity }}</p>
      </div>
      <div class="cart-item__actions">
        <button class="cart-item__remove-btn" @click="removeProduct">Remove</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CartItem",
    props: {
      productData: {
        type: Object,
        default() {
          return {};
        },
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
    methods: {
      removeProduct() {
        this.$emit("removeProduct", this.productData.article);
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }
  
  .cart-item__image-container {
    margin-right: 10px;
  }
  
  .cart-item__image {
    max-width: 80px;
  }
  
  .cart-item__info {
    flex-grow: 1;
  }
  
  .cart-item__name {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .cart-item__price {
    font-weight: bold;
  }
  
  .cart-item__quantity {
    margin-top: 5px;
  }
  
  .cart-item__remove-btn {
    background-color: #e0e0e0;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
  