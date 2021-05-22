const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const makeGETRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest)
            xhr = new XMLHttpRequest();
        else if (window.ActiveXObject)
            xhr = new ActiveXObject("Microsoft.XMLHTTP");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status);
                }
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    });
}

class GoodsItem {
    constructor(id_product, product_name = 'some_product', price = 0, img = 'https://placehold.it/200x150') {
        this.id_product = id_product
        this.product_name = product_name;
        this.price = price;
        this.img = img;

    }

    render(id_product = 1, product_name = 'default', price = 0, img = 'image') {
        return `<div class="goods-item">
        <img class="images" src="${this.img}" alt="some image">
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        <button class="buy-button" data-good-id="${this.product_name}">Купить</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }

    // fetchGoods() {
    //     return fetch(`${API_URL}/catalogData.json`)
    //         .then(response => response.json())
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    // fetchGoods(cb) {
    //     makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
    //       this.goods = JSON.parse(goods);
    //       this.filteredGoods = JSON.parse(goods);
    //       cb();
    //     })
    //   }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }

    fetchGoods() {
        return new Promise(resolve => {
            makeGETRequest(`${API_URL}/catalogData.json`)
                .then((goods) => {
                    this.goods = JSON.parse(goods);
                    this.filteredGoods = JSON.parse(goods);
                    resolve();
                }).catch((error) => {
                    console.log(`Error: ${error}`);
                })
        })
    }

    purchaseHandler(event, basket) {
        if (event.target.tagName === 'BUTTON') {
            this.goods.forEach(good => {
                if (good.product_name === event.target.dataset.goodId) {
                    basket.addItemToCart(good);
                    basket.render();
                }
            });
        }
    }

    render() {
        let html = '';
        this.filteredGoods.forEach(good => {
            let goodItem = new GoodsItem(good.id_product, good.product_name, good.price, good.img);
            html += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = html;
        this._basket.setAddListeners(this.filteredGoods);
    }

    // render() {
    //     this.fetchGoods()
    //         .then(data => {
    //             let listHtml = '';
    //             this.goods = [...data]
    //             this.goods.forEach(good => {
    //                 const goodItem = new GoodsItem(good.id_product, good.product_name, good.price, good.img);
    //                 listHtml += goodItem.render();
    //             });
    //             document.querySelector('.goods-list').innerHTML = listHtml;
    //         });
    // }

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
        // this.fetchGoods()
        //     .then(data => {
        //         this.goods = [...data.contents];
        //         this.render()
        //     });
    }

    // fetchGoods() {
    //     return fetch(`${API_URL}/getBasket.json`)
    //         .then(response => response.json())
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    pushToCart(item) {
        this.goods.push({ product_name: item.product_name, price: item.price, quantity: 1 });
    }

    // render() {
    //     const block = document.querySelector(this.container);
    //     block.innerHTML = ''

    //     this.goods.forEach(good => {
    //         const goodItem = new BasketElem(good.id_product, good.product_name, good.price, good.img);
    //         block.insertAdjacentHTML('beforeend', goodItem.render());
    //     });
    // }

    // новый рендер
    render() {
        let html = ``;
        this.goods.forEach(good => {
            let basketItem = new BasketElem(good.id_product, good.product_name, good.price, good.img, good.quantity);
            html += basketItem.render();
        });
        document.querySelector('.basket').innerHTML = html;
    }

    isInCart(unknownItem, cartItem) {
        return unknownItem.product_name === cartItem.product_name;
    }

    increaseQuantity(item) {
        item.quantity++;
    }

    addItemToCart(item) {
        let inCart = false;
        if (this.goods.length) {
            this.goods.forEach(good => {
                if (this.isInCart(item, good)) {
                    this.increaseQuantity(good);
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
    }

    removeHandler(event) {
        if (event.target.tagName === 'BUTTON') {
            this.goods.forEach(good => {
                if (event.target.dataset.goodId === good.product_name) {
                    this.removeFromCart(good);
                }
            });
        }
    }

    // Решение 2-го задания
    removeFromCart(item) {
        for (let idx = 0; idx < this.goods.length; idx++) {
            if (this.goods[idx].product_name === item.product_name) {
                if (this.goods[idx].quantity > 1)
                    this.goods[idx].quantity--;
                else
                    this.goods.splice(idx, 1);
            }
        }
        this.render();
    }

    // addItem() {
    //     fetch(`${API_URL}/addToBasket.json`)
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    // removeItem() {
    //     fetch(`${API_URL}/deleteFromBasket.json`)
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }
}

class BasketElem extends GoodsItem {
    constructor(id_product, product_name, price, img, quantity = 1) {
        super(id_product, product_name, price, img);
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.quantity * this.price;
    }

    render() {
        return `<div class="container basket_item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="basket-item-desc">
                    <h3>${this.product_name}</h3>
                    <p>Количество: ${this.quantity}</p>
                    <p>${this.price} </p>
                    <p>Общая стоимость: ${this.getTotalPrice()}</p>
                    <button class="buy-button" data-good-id="${this.product_name}">Удалить</button>

                </div>
            </div>`
    }

}

const list = new GoodsList();
list.fetchGoods()
    .then(() => {
        list.render();
    });

let basket = new Basket();
basket.render();
// basket.addItem();
// basket.removeItem();



document.querySelector('.goods-list')
    .insertAdjacentHTML('beforebegin', `<h2>Каталог</h2>`);

document.querySelector('.basket')
    .insertAdjacentHTML('beforebegin', `<h2>Корзина</h2>`);

document.querySelector('.goods-list')
    .addEventListener('click', event => {
        list.purchaseHandler(event, basket);
    });
document.querySelector('.basket')
    .addEventListener('click', event => {
        basket.removeHandler(event);
    });

const searchButton = document.querySelector('.search-button')
const searchInput = document.querySelector('.goods-search')
searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});
searchInput.addEventListener('keydown', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});