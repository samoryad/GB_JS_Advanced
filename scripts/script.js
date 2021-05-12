const goods = [
    { title: 'Shirt', price: 150, img: 'images/shirt.jpg' },
    { title: 'Hat', price: 50, img: 'images/hat.jpg' },
    { title: 'Jacket', price: 350, img: 'images/jacket.jpg' },
    { title: 'Shoes', price: 250, img: 'images/shoes.jpg' },
];

const renderGoodsItem = (img, title, price) => {
    return `<div class="goods-item">
    <img class="images" src="${img}">
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="buy-btn">Купить</button></div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.img, item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);