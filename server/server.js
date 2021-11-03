const express = require("express");
const app = express();
const getDetails =require("./selenium");

const PORT = 5000; // process.env.PORT ??

app.get('/getItemDetails',async (req,res) => {
    console.log('got call to details endpoint')
    const itemData = await getDetails(req.query.url)
    res.json(itemData)
})

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
