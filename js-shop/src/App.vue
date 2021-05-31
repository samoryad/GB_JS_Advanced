<template>
  <div id="app">
    <Header :filter="filterGoods" />
    <main class="container">
      <h2>Каталог</h2>
      <GoodsList :goods="filteredGoods" :addItemToCart="addItemToCart" />
      <h2>Корзина</h2>
      <BasketList :basket="basket" />
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

const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

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
    this.makeGETRequest(`${API_URL}/catalogData.json`);
  },

  methods: {
    makeGETRequest(url) {
      fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        });
    },

    filterGoods(value) {
      const regexp = new RegExp(value, "i");
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
    },

    pushToCart(item) {
      this.basket.push({
        product_name: item.product_name,
        price: item.price,
        quantity: 1,
      });
    },

    addItemToCart(item) {
      let inCart = false;
      if (this.basket.length) {
        this.basket.forEach((basket) => {
          if (this.isInCart(item, basket)) {
            this.increaseQuantity(basket);
            inCart = true;
          }
        });
      } else {
        this.pushToCart(item);
        return;
      }
      if (!inCart) {
        this.pushToCart(item);
      }
    },

    isInCart(unknownItem, cartItem) {
      return unknownItem.product_name === cartItem.product_name;
    },

    increaseQuantity(item) {
      item.quantity++;
    },
  },

  toggleCart() {
    this.isVisibleCart = !this.isVisibleCart;
  },

  // watch: {
  //   searchLine() {
  //     const regexp = new RegExp(this.searchLine, "i");
  //     this.filteredGoods = this.goods.filter((good) =>
  //       regexp.test(good.product_name)
  //     );
  //   },
  // },
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

/* .goods_sum {
  font-family: sans-serif;
  color: #340144;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 82%;
} */

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

.modalDialog {
  position: fixed;
  font-family: Arial, Helvetica, sans-serif;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99999;
  -webkit-transition: opacity 400ms ease-in;
  -moz-transition: opacity 400ms ease-in;
  transition: opacity 400ms ease-in;
  display: none;
  pointer-events: none;
}

/* .modalDialog:target {
  display: block;
  pointer-events: auto;
}

.modalDialog > div {
  width: 800px;
  position: relative;
  margin: 10% auto;
  padding: 5px 20px 13px 20px;
  border-radius: 10px;
  background: #fff;
  background: -moz-linear-gradient(#fff, #999);
  background: -webkit-linear-gradient(#fff, #999);
  background: -o-linear-gradient(#fff, #999);
} */

.close {
  background: #606061;
  color: #ffffff;
  line-height: 25px;
  position: absolute;
  right: -12px;
  text-align: center;
  top: -10px;
  width: 24px;
  text-decoration: none;
  font-weight: bold;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
  -moz-box-shadow: 1px 1px 3px #000;
  -webkit-box-shadow: 1px 1px 3px #000;
  box-shadow: 1px 1px 3px #000;
}

.close:hover {
  background: #00d9ff;
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
