<template>
  <div class="basket">
    <div
      class="container basket_item"
      v-for="item in basket"
      :key="item.id_product"
    >
      <img src="" alt="Some img" />
      <div class="basket-item-desc">
        <h3>{{ item.product_name }}</h3>
        <p>Количество: {{ item.quantity }}</p>
        <p>{{ item.price }}</p>
        <p>Общая стоимость: {{ item.price * item.quantity }}</p>
        <button
          class="buy-button"
          :data-good-id="item.product_name"
          @click="removeHandler(basket)"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    basket: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    removeHandler(basket) {
      basket.forEach((basketItem) => {
        if (event.target.dataset.goodId === basketItem.product_name) {
          this.removeFromBasket(basket, basketItem);
        }
      });
    },

    removeFromBasket(basket, item) {
      for (let idx = 0; idx < basket.length; idx++) {
        if (basket[idx].product_name === item.product_name) {
          if (basket[idx].quantity > 1) basket[idx].quantity--;
          else basket.splice(idx, 1);
        }
      }
    },
  },
};
</script>

<style scoped>
.basket {
  display: flex;
  align-items: center;
}

.basket_item {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.basket-item-desc {
  text-align: center;
}
</style>