const express = require("express");
const app = express();

const PORT = 5000; // process.env.PORT ??

const testData = {
    'title': 'Jersey Top', 
    'imageUrl': 'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemThumb/520383.jpg', 
    'price': '€36'
}

app.get('/getItems', (req,res) => {
    console.log('got call to details endpoint')
    res.json(testData)
})

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
