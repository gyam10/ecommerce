const loginCheck = require("../app/middleware/auth.middleware");
const uploader = require("../app/middleware/file-upload.middleware");
const { isAdminSeller } = require("../app/middleware/rbac.middlware");
const ProductController = require("../app/controllers/product.controller");

const prod_ctrl = new ProductController();

const router = require("express").Router();

const setDestination = (req, res, next) => {
  (req.dest = "product"), next();
};

router
  .route("/")
  .post(
    loginCheck,
    isAdminSeller,
    setDestination,
    uploader.array("image"),
    prod_ctrl.addProduct
  )
  .get(prod_ctrl.getProduct);

router.get("/cat/:slug", prod_ctrl.getProductByCategory);
router.get("/byslug/:slug", prod_ctrl.getProductBySlug);

router
  .route("/:id")
  .put(
    loginCheck,
    isAdminSeller,
    setDestination,
    uploader.array("image"),
    prod_ctrl.updateProduct
  )
  .get(prod_ctrl.getProductById)
  .delete(loginCheck, isAdminSeller, prod_ctrl.deleteProductById);
module.exports = router;
