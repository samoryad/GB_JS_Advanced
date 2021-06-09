const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.post('/addToCart', (req, res) => {
    fs.readFile('./database/cart.json', 'utf8', (err, data) => {
        // console.log(data)
        if (err) {
            res.send('{ "result": 0 }')
        } else {
            const cart = JSON.parse(data);
            const item = req.body;

            cart.push(item);

            fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
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
            const cart = JSON.parse(data);
            // console.log(cart)
            const item = req.body;
            // console.log(item)
            const updatedCart = cart.filter(cartItem => JSON.stringify(cartItem) != JSON.stringify(item));

            fs.writeFile('./database/cart.json', JSON.stringify(updatedCart), (err) => {
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