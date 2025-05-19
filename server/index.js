const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const bodyParser = require('body-parser');
const mailService = require('./helper/mailService');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//Email Service
app.use(mailService);

const uri = "mongodb+srv://<username>:<password>@twitter.ljkz0ww.mongodb.net/?retryWrites=true&w=majority&appName=twitter";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  ssl: true,
});

async function run() {
  try {
    await client.connect();

    const db = client.db("database");
    const postcollection = db.collection("posts");
    const usercollection = db.collection("users");

    app.post("/register", async (req, res) => {
      const user = req.body;
      const result = await usercollection.insertOne(user);
      res.send(result);
    });

    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email }).toArray();
      res.send(user);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const posts = await postcollection.find().toArray();
      res.send(posts.reverse());
    });

    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const posts = await postcollection.find({ email }).toArray();
      res.send(posts.reverse());
    });

    app.get("/user", async (req, res) => {
      const users = await usercollection.find().toArray();
      res.send(users);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const email = req.params.email;
      const profile = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("X-Clone(Twitter) is working");
});

app.listen(port, () => {
  console.log(`Twitter clone is running on http://localhost:${port}`);
});
