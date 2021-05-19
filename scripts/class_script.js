class GoodsItem {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img
    }

    render(title = 'default', price = 0, img = 'image') {
        return `<div class="goods-item">
        <img class="images" src="${this.img}">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button class="buy-button">Купить</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = []
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 1000, img: 'images/shirt.jpg' },
            { title: 'Hat', price: 500, img: 'images/hat.jpg' },
            { title: 'Jacket', price: 3500, img: 'images/jacket.jpg' },
            { title: 'Shoes', price: 4500, img: 'images/shoes.jpg' },
        ];

    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.img);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        const cart = document.querySelector('.header')
        cart.insertAdjacentHTML('afterend', `<div class=" goods_sum"> Сумма всех товаров равна: ${this.sumAllGoods()}</div>`)
    }

    sumAllGoods() {
        let sum = 0;
        for (let good of this.goods) {
            sum += good.price
        }
        return sum
    }

}

class Basket {
    addGood() {

    }

    removeGood() {

    }
}

class BasketElem {
    addToOrder() {

    }

    removeFromOrder() {

    }

    createOrder() {

    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
