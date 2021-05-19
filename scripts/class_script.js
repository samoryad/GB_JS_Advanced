const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const makeGETRequest = (url, callback) => {
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

class GoodsItem {
    constructor(product_name, price, img = 'https://placehold.it/200x150') {
        this.product_name = product_name;
        this.price = price;
        this.img = img
    }

    render(product_name = 'default', price = 0, img = 'image') {
        return `<div class="goods-item">
        <img class="images" src="${this.img}" alt="some image">
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        <button class="buy-button">Купить</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = []
    }

    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.img);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getTotalSum() {
        const totalSum = this.goods.reduce((acc, item) => {
            if (!item.price) return acc;
            return acc += item.price;
        }, 0);
        console.log(totalSum);
    }

}

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});


class Basket extends GoodsList {
    constructor(...args) {
        super(...args);
    }

    clearAll() {

    }

    addItem() {

    }

    removeItem() {

    }
}

class BasketElem extends GoodsItem {
    constructor(...args) {
        super(...args);
        this.count = 0;
    }

    addToOrder() {

    }

    removeFromOrder() {

    }

    createOrder() {

    }
}
