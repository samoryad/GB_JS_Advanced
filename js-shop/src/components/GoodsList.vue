<template>
  <div class="goods-list">
    <div v-for="item in goods" :key="item.id_product" class="goods-item">
      <img class="images" alt="some image" />
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
      <button
        class="buy-button"
        :data-good-id="item.id_product"
        @click="purchaseHandler(addItemToCart)"
      >
        Купить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Array,
      default: () => [],
    },
    addItemToCart: {
      type: Function,
    },
  },

  methods: {
    purchaseHandler(orderFunction) {
      this.goods.forEach((good) => {
        if (parseInt(event.target.dataset.goodId) === good.id_product) {
          orderFunction(good);
        }
      });
    },
  },
};
</script>

<style scoped>
.goods-list {
  display: flex;
  justify-content: space-around;
}

.goods-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>