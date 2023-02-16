const express = require("express")
const app = express()

app.use(express.json())

const birdStorage = {
    birds: [
        {
            id: 1,
            name: "Eagle",
            wingspanMeters: 5,
        },

        {
            id: 2,
            name: "Magpie",
            wingspanMeters: 5
        },

        {
            id: 3,
            name: "Emu",
            wingspanMeters: 5
        }
    ],


}

app.get("/", (req, res) => {
    res.send("welcome to this bird-app");
})

app.get("/birds", (req, res) => {
    res.send(birdStorage.birds);
})


app.get("/birds/:id", (req, res) => {
    const id = req.params.id;
    let response;

    birdStorage.birds.map(bird => {
        if (bird.id === +id){
            response = bird
        }
    });

    res.send(response);
})


app.listen(8080);
