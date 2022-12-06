const express = require('express');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const app = express()
const port = process.env.PORT || 5000;
// middle wares
app.use(cors())
//this middleware to save data in mongodb
app.use(express.json())
//it for env file config
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wg8wdsp.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const token = require('crypto').randomBytes(64).toString('hex')
console.log(token)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
    })

}



async function run() {
    try {
        const serviceCollection = client.db('gym-Instructor').collection('service')
        const blogCollection = client.db('gym-Instructor').collection('blog')
        const reviewCollection = client.db('gym-Instructor').collection('review')

        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            res.send({ token })
        })

        app.get('/services', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size)
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.skip(page * size).limit(size).toArray();
            const count = await serviceCollection.estimatedDocumentCount();
            res.send({ count, services });
        });
        // get specific data
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        app.post("/service", async (req, res) => {
            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        })

        app.get('/blog', async (req, res) => {
            const query = {}
            const cursor = blogCollection.find(query);
            const blog = await cursor.toArray();
            res.send(blog);
        });
        app.post("/review", async (req, res) => {
            const review = req.body;
            console.log(review)
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })
        app.get('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { service: id };

            const options = {
                sort: { datetime: -1 },
            };

            const cursor = await reviewCollection.find(query, options);
            const review = await cursor.toArray();
            res.send(review);
        });

        app.get('/review', verifyJWT, async (req, res) => {
            const decoded = req.decoded;
            console.log('inside oders api ', decoded)

            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const review = await reviewCollection.deleteOne(query);
            console.log(review)
            res.send(review)

            console.log("trying to delete", id)
        })
        // for update
        app.get('/updateReview/:id', async (req, res) => {
            console.log("clicked")
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.findOne(query);
            console.log(result);
            res.send(result)
        })
        app.put('/update/:id', async (req, res) => {
            console.log(" updated clicked")
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = req.body;
            console.log(user)
            //if data found thahole update kore daw r jodi na pay thahole insert kore daw
            const options = { upsert: true };
            const updatedUser = {
                //ei set er moddhe bole dite hobe kon kon property k set korte chao
                $set: {
                    content: user.name,
                },
            };
            const result = await reviewCollection.updateOne(query, updatedUser, options);
            res.send(result)
        })

    }
    catch (err) {
        console.log(err)
    }
    finally {

    }



}
run().catch(err => { console.log(err) })




app.get('/', (req, res) => {
    res.send('gym trainer inside server e')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
