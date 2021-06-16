const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(bodyParser.json())


class cartHandler {
    constructor(cart) {
        this.content = cart
    }
    pushToCart(item) {
        this.content.push({ ...item, quantity: 1 })
    }
    increaseQuantity(item) {
        item.quantity++
    }
    isInCart(unknownItem, cartItem) {
        return unknownItem.product_name === cartItem.product_name
    }
    addItemToCart(item) {
        let inCart = false
        if (this.content.length) {
            this.content.forEach(good => {
                if (this.isInCart(item, good)) {
                    this.increaseQuantity(good)
                    inCart = true
                }
            })
        } else {
            this.pushToCart(item)
            return
        }
        if (!inCart) {
            this.pushToCart(item)
        }
    }
    removeFromCart(item) {
        for (let idx = 0; idx < this.content.length; idx++) {
            if (this.content[idx].product_name === item.product_name) {
                if (this.content[idx].quantity > 1) {
                    this.content[idx].quantity--
                } else {
                    this.content.splice(idx, 1)
                }
            }
        }
    }
}

app.post('/addToCart', (req, res) => {
    fs.readFile('./database/cart.json', 'utf8', (err, data) => {
        // console.log(data)
        if (err) {
            res.send('{ "result": 0 }')
        } else {
            const cart = new cartHandler(JSON.parse(data));
            const item = req.body;

            cart.addItemToCart(item);

            fs.writeFile('./database/cart.json', JSON.stringify(cart.content), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    })
})

app.post('/deleteFromCart', (req, res) => {
    fs.readFile('./database/cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{ "result": 0 }')
        } else {
            let cart = new cartHandler(JSON.parse(data));
            // console.log(cart)
            const item = req.body;
            // console.log(item)
            cart.removeFromCart(item)

            fs.writeFile('./database/cart.json', JSON.stringify(cart.content), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    })
})


app.get('/catalogData', (req, res) => {
    fs.readFile('./database/goods.json', 'utf8', (err, data) => {
        res.send(data)
    })
})

app.get('/cartData', (req, res) => {
    fs.readFile('./database/cart.json', 'utf8', (err, data) => {
        res.send(data)
    })
})

app.listen(3000, () => {
    console.log('server started on port 3000');
});