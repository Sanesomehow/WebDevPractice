//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

const postSchema = {
    title: String,
    content: String,
};

const Post = mongoose.model("Post", postSchema);

const homeStartingContent =
    "Discover a new way to organize your thoughts, experiences, and ideas. The Journal Management System is your personal space for digital journaling. Whether you're a writer, a dreamer, or someone who simply loves to reflect on life, our platform offers an intuitive and secure environment for creating, managing, and revisiting your journal entries.";
const aboutContent =
    "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
    "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//let posts = [];

app.get("/", function (req, res) {
    Post.find()
        .then(function (foundPosts) {
            res.render("home", {
                homeStartingContent: homeStartingContent,
                posts: foundPosts,
            });
        })
        .catch(function (err) {
            console.log(err);
        });
});

app.get("/about", function (req, res) {
    res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody,
    });

    post.save()
        .then(function () {
            res.redirect("/");
        })
        .catch(function (err) {
            console.log(err);
        });
});

app.get("/posts/:postId", function (req, res) {
    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId })
        .then(function (post) {
            res.render("post.ejs", {
                title: post.title,
                content: post.content,
            });
        })
        .catch(function (err) {
            console.log(err);
        });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
