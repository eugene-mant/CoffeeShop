<template>
    <div class="cart">
      <h1>Cart</h1>
      <div class="cart__items">
        <cart-item
          v-for="(item, index) in cartItems"
          :key="index"
          :item-data="item"
          @removeItem="removeItemFromCart(index)"
        />
      </div>
      <div class="cart__total">
        <p>Total: {{ getTotalPrice }} $</p>
        <button class="cart__buy-btn" @click="buyItems">Buy</button>
      </div>
    </div>
  </template>
  
  <script>
  import cartItem from './cart-item.vue';
  
  export default {
    name: 'cart',
    components: {
      cartItem,
    },
    data() {
      return {
        cartItems: [],
      }
    },
    computed: {
      getTotalPrice() {
        let total = 0;
        for (let item of this.cartItems) {
          total += item.price;
        }
        return total.toFixed(2);
      },
    },
    methods: {
      addItemToCart(item) {
        this.cartItems.push(item);
      },
      removeItemFromCart(index) {
        this.cartItems.splice(index, 1);
      },
      buyItems() {
        this.cartItems = [];
        alert('Purchase successful!');
      },
    },
  }
  </script>
  
  <style lang="scss">
    .cart {
      .cart__items {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
      }
      .cart__total {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        p {
          margin-bottom: 10px;
          font-weight: bold;
          font-size: 20px;
        }
        .cart__buy-btn {
          padding: 10px 20px;
          font-size: 16px;
          font-weight: bold;
          color: white;
          background-color: #490c0c;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          &:hover {
            background-color: #732727;
          }
        }
      }
    }
  </style>