const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000; // you can change it if needed

// -----------------------------
// 1. Set EJS as the template engine
// -----------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// -----------------------------
// 2. Serve Static Files
// Everything in /public becomes available in browser
// -----------------------------
// Serve static files from the project root so existing assets (style.css, img/, js/, financials.json)
// remain available without moving them.
app.use(express.static(path.join(__dirname)));


// -----------------------------
// 3. Routes (One route per EJS file)
// -----------------------------
app.get("/", (req, res) => {
    res.render("index");   // views/index.ejs
});

app.get("/faq", (req, res) => {
    res.render("faq");     // views/faq.ejs
});

app.get("/about", (req, res) => {
    res.render("about");   // views/about.ejs
});

app.get("/buy", (req, res) => {
    res.render("buy");     // views/buy.ejs
});

app.get("/signup", (req, res) => {
    res.render("signup");  // views/signup.ejs
});

// Dashboard route (render EJS view)
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Sell and Login routes
app.get('/sell', (req, res) => {
    res.render('sell');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Keep an alias for the old static filename to redirect to the new route
app.get('/about_us.html', (req, res) => res.redirect('/about'));
// More pages later (like CRUD page)


// -----------------------------
// 4. Start server
// -----------------------------
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
