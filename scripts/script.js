const goods = [
    { title: 'Shirt', price: 150, img: 'images/shirt.jpg' },
    { title: 'Hat', price: 50, img: 'images/hat.jpg' },
    { title: 'Jacket', price: 350, img: 'images/jacket.jpg' },
    { title: 'Shoes', price: 250, img: 'images/shoes.jpg' },
];

const renderGoodsItem = (product) => {
    return `<div class="goods-item">
    <img class="images" src="${product.img}">
    <h3>${product.title}</h3>
    <p>${product.price}</p>
    <button class="buy-btn">Купить</button></div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item)).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);