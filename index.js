const express = require("express");
const myPath = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

myPath.use(cors());
myPath.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4njvdfp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("my-profile");
    const servicesCollection = db.collection("services");
    const skillsCollection = db.collection("skills");
    const backendSkillsCollection = db.collection("backend_skills");
    const projectsCollection = db.collection("projects");
    const educationsCollection = db.collection("educations");

    myPath.get("/services", async (req, res) => {
      const result = await servicesCollection.find().toArray();
      res.send(result);
    });
    myPath.get("/skills", async (req, res) => {
      const result = await skillsCollection.find().toArray();
      res.send(result);
    });
    myPath.get("/backend_skills", async (req, res) => {
      const result = await backendSkillsCollection.find().toArray();
      res.send(result);
    });
    myPath.get("/projects", async (req, res) => {
      const result = await projectsCollection.find().toArray();
      res.send(result);
    });
    myPath.get("/educations", async (req, res) => {
      const result = await educationsCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

myPath.get("/", (req, res) => {
  res.send("portfoloi is opning...........");
});
myPath.listen(port, (req, res) => {
  console.log(`portfoloi is opening on PORT: `, port);
});
