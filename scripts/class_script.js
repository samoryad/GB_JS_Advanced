const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class GoodsItem {
    constructor(id_product, product_name, price, img = 'https://placehold.it/200x150') {
        this.id_product = id_product
        this.product_name = product_name;
        this.price = price;
        this.img = img;

    }

    render(id_product = 1, product_name = 'default', price = 0, img = 'image') {
        return `<div class="goods-item">
        <img class="images" src="${this.img}" alt="some image">
        <p>id - ${this.id_product}</p>
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        <button class="buy-button">Купить</button></div>`;
    }
}

class GoodsList {
    constructor(container = '.container') {
        this.goods = [];
        this.container = container
    }

    fetchGoods() {
        return fetch(`${API_URL}/catalogData.json`)
            .then(response => response.json())
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        this.fetchGoods()
            .then(data => {
                let listHtml = '';
                this.goods = [...data]
                this.goods.forEach(good => {
                    const goodItem = new GoodsItem(good.id_product, good.product_name, good.price, good.img);
                    listHtml += goodItem.render();
                });
                document.querySelector('.goods-list').innerHTML = listHtml;
            });
    }

    getTotalSum() {
        const totalSum = this.goods.reduce((acc, item) => {
            if (!item.price) return acc;
            return acc += item.price;
        }, 0);
        console.log(totalSum);
    }


}

class Basket extends GoodsList {
    constructor(container = '.basket') {
        super(container);
        this.fetchGoods()
            .then(data => {
                this.goods = [...data.contents];
                this.render()
            });
    }

    fetchGoods() {
        return fetch(`${API_URL}/getBasket.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        block.innerHTML = ''

        this.goods.forEach(good => {
            const goodItem = new BasketElem(good.id_product, good.product_name, good.price, good.img);
            block.insertAdjacentHTML('beforeend', goodItem.render());
        });
    }


    addItem() {
        fetch(`${API_URL}/addToBasket.json`)
            .then(response => {
                response.json();
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    removeItem() {
        fetch(`${API_URL}/deleteFromBasket.json`)
            .then(response => {
                response.json();
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}

class BasketElem extends GoodsItem {
    constructor(...args) {
        super(...args);
        this.count = 0;
    }

    render() {
        return `<div class="goods-item basket_item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                </div>
            </div>`
    }

}

const list = new GoodsList();
list.render();

let basket = new Basket();
basket.render();
basket.addItem();
basket.removeItem();
