const express = require("express");
const app = express();
// const app = express.Router();

const category_routes = require("./category.routes");
const user_routes = require("./user.routes");
const auth_routes = require("./auth.routes");
const label_routes = require("./label.routes");
const product_routes = require("./product.routes");


app.use('/user', user_routes);
app.use("/label", label_routes);
app.use("/category", category_routes);
app.use("/product", product_routes)
app.use(auth_routes);


module.exports = app;