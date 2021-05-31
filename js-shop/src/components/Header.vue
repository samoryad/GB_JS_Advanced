<template>
  <header class="container header">
    <input v-model="searchLine" type="text" class="goods-search" />
    <button class="search-button" type="button" @click="filter(searchLine)">
      Искать
    </button>
    <button class="container header cart-button" type="button">Корзина</button>
  </header>
</template>

<script>
export default {
  data: () => ({
    searchLine: "",
  }),

  props: {
    filter: Function,
  },

  methods: {
    filterGoods() {
      this.filter(this.searchLine);
    },
  },
  watch: {
    searchLine() {
      this.filter(this.searchLine);
    },
  },
};
</script>

<style scoped>
.goods-search {
  margin-left: 20px;
}

.cart-button {
  box-shadow: 5px 10px 20px rgb(53 110 173 / 20%);
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.04em;
  color: #340144;
  margin-right: 22px;
  text-decoration: none;
  border-radius: 5px;
  width: 100px;
  display: inline-block;
}
</style>
