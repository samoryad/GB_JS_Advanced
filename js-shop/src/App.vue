<template>
  <div id="app">
    <Header @toggle="toggleCart" :filter="filterGoods" />
    <main class="container">
      <h2>Каталог</h2>
      <GoodsList :addItemToCart="addItemToCart" :goods="filteredGoods" />
      <BasketList
        :basket="basket"
        :isVisibleCart="isVisibleCart"
        :removeFromCart="removeFromCart"
      />
    </main>
    <footer class="container footer">
      <span class="span-footer">Интернет-магазин</span>
    </footer>
  </div>
</template>

<script>
import GoodsList from "./components/GoodsList";
import Header from "./components/Header";
import BasketList from "./components/BasketList";

const API_URL = "http://localhost:3000";

export default {
  components: {
    GoodsList,
    Header,
    BasketList,
  },

  data: () => ({
    goods: [],
    filteredGoods: [],
    basket: [],
    isVisibleCart: false,
  }),

  mounted() {
    this.getGoods();
    this.getCart();
  },

  methods: {
    makePOSTRequest(url, data) {
      return fetch(url, {
        method: "POST",
        headers: {
          // добавили хэдер
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((data) => data.json());
    },

    makeGETRequest(url) {
      return fetch(url).then((data) => data.json());
    },

    getGoods() {
      this.makeGETRequest(`${API_URL}/catalogData`).then((data) => {
        this.goods = data;
        this.filteredGoods = data;
      });
    },

    getCart() {
      this.makeGETRequest(`${API_URL}/cartData`).then((data) => {
        this.basket = data;
      });
    },

    filterGoods(value) {
      const regexp = new RegExp(value, "i");
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
    },

    addItemToCart(item) {
      this.makePOSTRequest(`${API_URL}/addToCart`, item).then(() => {
        this.getCart();
      });
    },

    removeFromCart(item) {
      this.makePOSTRequest(`${API_URL}/deleteFromCart`, item).then(() => {
        this.getCart();
      });
    },

    toggleCart() {
      this.isVisibleCart = !this.isVisibleCart;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  width: 100%;
}

header {
  background-color: #340144;
  margin: 0 0 0 32px;
  display: flex;
  justify-content: flex-end;
  padding-top: 22px;
  padding-bottom: 22px;
}

.container {
  margin: 0 auto;
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

.head_name {
  color: #340144;
  margin: 22px 0 22px 22px;
}

.buy-button {
  background: #340144;
  box-shadow: 5px 20px 50px rgba(141, 0, 193, 0.2);
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
  width: 50%;
  display: block;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 50px;
}

.images {
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.footer {
  background-color: #340144;
  height: 40px;
  margin-top: 20px;
  text-align: center;
  padding-top: 20px;
}

.span-footer {
  color: #fff;
  font-family: sans-serif;
}

main {
  min-height: calc(100vh - 40px);
  padding: 30px calc(50% - 1100px / 2);
}

.goods-search {
  margin-left: 20px;
}
</style>
