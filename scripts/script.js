const goods = [
    { title: 'Shirt', price: 1000, img: 'images/shirt.jpg' },
    { title: 'Hat', price: 500, img: 'images/hat.jpg' },
    { title: 'Jacket', price: 3500, img: 'images/jacket.jpg' },
    { title: 'Shoes', price: 4500, img: 'images/shoes.jpg' },
];

// const renderGoodsItem = product => {
//     return `<div class="goods-item">
//     <img class="images" src="${product.img}">
//     <h3>${product.title}</h3>
//     <p>${product.price}</p>
//     <button class="buy-button">Купить</button></div>`;
// };

// const renderGoodsList = list => {
//     let goodsList = list.map(item => renderGoodsItem(item)).join('');
//     document.querySelector('.goods-list').innerHTML = goodsList;
// }

// renderGoodsList(goods);

const renderGoodsItem = (title = 'default', price = 0, img) => {
    return `<div class="goods-item">
    <img class="images" src="${img}">
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="buy-button">Купить</button></div>`;
};

const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.img));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);
