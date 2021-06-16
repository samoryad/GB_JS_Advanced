<template>
  <div v-show="isVisibleCart" class="basket">
    <span class="basket-span"> Корзина товаров: </span>
    <hr class="hr" />
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
          @click="removeFromCart(item)"
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
    isVisibleCart: {
      type: Boolean,
      default: false,
    },
    removeFromCart: {
      type: Function,
    },
  },
};
</script>

<style scoped>
.basket_item {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.basket-item-desc {
  text-align: center;
}

.basket {
  box-shadow: 0px 0px 8px 2px rgba(91, 1, 82, 0.2);
  padding: 20px;
  width: 600px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #340144;
  overflow: auto;
  border-radius: 12px;
  box-shadow: 1px 1px 3px #340144;
  color: #ffffff;
}

.basket:hover {
  background: #5d0279;
}

.hr {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>