const express = require("express")
const {query} = require("express");
const app = express()

app.use(express.json())


const birdStorage = {
    1: {
        id: 1,
        name: "Eagle",
        wingspanMeters: 3
    },

    2: {
        id: 2,
        name: "Magpie",
        wingspanMeters: 5
    },

    3: {
        id: 3,
        name: "Emu",
        wingspanMeters: 1
    }
}

app.get("/birds", (req, res) => {
    res.send(birdStorage);
})

app.get("/birds/:id", (req, res) => {
    const id = req.params.id;
    let response = birdStorage[id];
    res.send(response);
})

app.post("/birds", (req, res) => {
    let body = req.body;
    if (body.id && body.name && body.wingspanMeters) {
        const newBird = {
            id: body.id,
            name: body.name,
            wingspanMeters: body.wingspanMeters
        }
        if (!birdStorage[newBird.id]) {
            birdStorage[newBird.id] = newBird;

            res.status(200);
            res.send(newBird)

        } else {
            res.status(400);
            res.send("bird with this id exist")
        }
    } else {
        res.status(400);
        res.send("could not convert body to bird")
    }
})

app.patch("/birds/:id", (rec, res) => {
        const id = rec.params.id;
        if (birdStorage[id]) {
            const bird = birdStorage[id];
            let keys = Object.keys(rec.query);
            let validQueries = keys.filter(key => (key in bird));
            validQueries.map((key) => {
                const idQuery = rec.query[key];
                if (idQuery) {
                    bird[key] = idQuery;
                }
            })
            birdStorage[id] = bird;
            res.send(bird);
        } else {
            res.status(404)
            res.send("Could not find element");
        }
    })

app.delete("/birds/:id", (rec, res) => {
    let id = rec.params.id;
    if (birdStorage[id]){
        const birdStorageElement = birdStorage[id];
        delete birdStorage[id];

        res.send({birdStorageElement, message: "is delete"})

    } else {
        res.status(404);
        res.send("could not find object")
    }
})

app.listen(8080);
