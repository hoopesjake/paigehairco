const express = require("express");
const app = express();
const path = require("path");
const port = 5100; //Changing this to see if this can work

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., images, CSS) from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// // Connect to PostgreSQL database
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "Indiglo51919",
        database: "paigehairco",
        port: 5432,
    },
});

// Test database connection
knex.raw('SELECT 1')
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection failed:', err));

// Route to render the index.ejs view
app.get("/", (req, res) => {
    res.render("index", { AboutMePic: "" });
});

// Example POST route for handling form submissions
app.post("/submit", (req, res) => {
    const { name, email } = req.body;
    // Here, you can add code to save form data to the database
    console.log(`Name: ${name}, Email: ${email}`);
    res.redirect("/");
});

// Start the server
app.listen(port, () => console.log(`Express app listening on port ${port}!`));
