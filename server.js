"use strict"
require("dotenv").config()
const express = require("express")
const mongo = require("mongodb")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const validUrl = require("valid-url")
const shortid = require("shortid")

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGOLAB_URI)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/public", express.static(process.cwd() + "/public"))

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String
})
const urlModel = mongoose.model("Url", urlSchema)

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html")
})

app.post("/api/shorturl/new", (req, res) => {
  if (validUrl.isUri(req.body.url)) {
    const id = shortid.generate()
    const newUrl = new urlModel({
      original_url: req.body.url,
      short_url: id
    })

    newUrl.save((err, newUrl) => {
      if (err) {
        return console.error(err)
      } else {
        return console.log("successfully saved URL with short id:", id)
      }
    })

    res.json({ original_url: req.body.url, short_url: id })
  } else {
    res.json({ error: "Invalid URL" })
  }
})

app.get("/api/shorturl/:id", (req, res) => {
  urlModel.findOne({ short_url: req.params.id }, (err, data) => {
    if (data != null) {
      res.redirect(data.original_url)
    } else {
      res.json({ error: "Could not retrieve URL with given ID" })
    }
  })
})

app.listen(port, () => {
  console.log("Node.js listening ...")
})
