<template>
  <div id="app">
    <header class="container header">
      <input v-model="searchLine" type="text" class="goods-search" />
      <button class="search-button" type="button" @click="filterGoods">
        Искать
      </button>
      <button
        class="container header cart-button"
        type="button"
        onclick="window.location.href = '#openModal';"
      >
        Корзина
      </button>
    </header>
    <main class="container">
      <h2>Каталог</h2>
      <div class="goods-list">
        <div
          v-for="item in filteredGoods"
          :key="item.id_product"
          class="goods-item"
        >
          <img class="images" alt="some image" />
          <h3>{{ item.product_name }}</h3>
          <p>{{ item.price }}</p>
          <button
            class="buy-button"
            :data-good-id="item.product_name"
            @click="addItemToCart"
          >
            Купить
          </button>
        </div>
      </div>

      <h2>Корзина</h2>
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
            <p>Общая стоимость: {{ getTotalPrice() }}</p>
            <button
              class="buy-button"
              :data-good-id="item.product_name"
              @click="removeHandler"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </main>
    <footer class="container footer">
      <span class="span-footer">Интернет-магазин</span>
    </footer>
  </div>
</template>

<script>
const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

export default {
  data: () => ({
    goods: [],
    filteredGoods: [],
    basket: [],
    searchLine: "",
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

    filterGoods() {
      const regexp = new RegExp(this.searchLine, "i");
      console.log(this.goods);
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
    },

    pushToCart(item) {
      console.log(item);
      this.basket.push({
        product_name: item.product_name,
        price: item.price,
        quantity: 1,
      });
    },

    addItemToCart(item) {
      // TODO не могу понять, как найти product_name (почему-то не работает data-good-id, может синтаксис не тот...)
      console.log(item);
      console.log(item.product_name);
      console.log(item.srcElement.dataset.goodId);
      // if (item.product_name === item.srcElement.dataset.goodId) {
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
      // }
    },

    isInCart(unknownItem, cartItem) {
      return unknownItem.product_name === cartItem.product_name;
    },

    increaseQuantity(item) {
      item.quantity++;
    },

    getTotalPrice() {
      return this.quantity * this.price;
    },

    removeHandler(event) {
      if (event.target.tagName === "BUTTON") {
        this.basket.forEach((basket) => {
          if (event.target.dataset.goodId === basket.product_name) {
            this.removeFromCart(basket);
          }
        });
      }
    },

    removeFromCart(item) {
      for (let idx = 0; idx < this.basket.length; idx++) {
        if (this.basket[idx].product_name === item.product_name) {
          if (this.basket[idx].quantity > 1) this.basket[idx].quantity--;
          else this.basket.splice(idx, 1);
        }
      }
      this.render();
    },
  },

  watch: {
    searchLine() {
      const regexp = new RegExp(this.searchLine, "i");
      this.filteredGoods = this.goods.filter((good) =>
        regexp.test(good.product_name)
      );
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

.goods_sum {
  font-family: sans-serif;
  color: #340144;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 82%;
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

.goods-list {
  display: flex;
  justify-content: space-around;
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

.goods-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.modalDialog:target {
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
}

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
