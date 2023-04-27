const ProductService = require("../services/product.service");
const slugify = require("slugify");
const ProductModel = require("../models/product.model");

class ProductController {
  constructor() {
    this.prod_svc = new ProductService();
  }
  addProduct = async (req, res, next) => {
    // TODO: Add Product
    try {
      let data = req.body;
      if (req.files) {
        let images = [];
        req.files.map((image) => {
          images.push(image.filename);
        });
        data.images = images;
      }

      this.prod_svc.validateProduct(data);

      data.slug = slugify(data.title.toLowerCase());
      data.after_discount = data.price - (data.price * data.discount) / 100;

      if (!data.category) {
        data.category = null;
      }

      if (!data.brand) {
        data.brand = null;
      }

      if (!data.seller) {
        data.seller = null;
      }

      let product = new ProductModel(data);
      let ack = await product.save();
      res.json({
        result: product,
        status: true,
        msg: "Product created successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
  getProduct = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.is_featured) {
        filter = {
          is_featured: true,
        };
      }
      let product = await ProductModel.find(filter)
        .populate("brand")
        .populate("category")
        .populate("seller");
      res.json({
        result: product,
        msg: "Products featched",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  updateProduct = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.files) {
        let images = [];
        req.files.map((image) => {
          images.push(image.filename);
        });
        data.images = images;
      }
      this.prod_svc.validateProduct(data);
      data.after_discount = data.price - (data.price * data.discount) / 100;
      if (!data.category) {
        data.category = null;
      }
      if (!data.brand) {
        data.brand = null;
      }
      if (!data.seller) {
        data.seller = null;
      }

      ProductModel.findByIdAndUpdate(req.params.id, {
        $set: data,
      })
        .then((response) => {
          res.json({
            result: data,
            msg: "Product updated sucessfully",
            status: true,
          });
        })
        .catch((error) => {
          next({
            status: 400,
            msg: error,
          });
        });
    } catch (error) {
      next(error);
    }
  };
  deleteProductById = async (req, res, next) => {
    try {
      let ack = await ProductModel.findByIdAndDelete(req.params.id)
        .populate("brand")
        .populate("category")
        .populate("seller");
      if (ack) {
        res.json({
          result: ack,
          msg: "Successfully deleted",
          status: true,
        });
      } else {
        next({
          msg: "Product does not exist or already deleted.",
          status: 400,
        });
      }
    } catch (err) {
      next(err);
    }
  };
  getProductById = async (req, res, next) => {
    try {
      let product = await ProductModel.findById(req.params.id)
        .populate("brand")
        .populate("category")
        .populate("seller");
      if (product) {
        res.json({
          result: product,
          msg: "Successfully fetched.",
          status: true,
        });
      } else {
        next({
          msg: "Product does not exist. ",
          status: 400,
        });
      }
    } catch (err) {
      next(err);
    }
  };
  getProductByCategory = async (req, res, next) => {
    try {
      let products = await ProductModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: {
            path: "$category",
          },
        },
        {
          $match: {
            "category.slug": req.params.slug,
            status: "active",
          },
        },
        {
          $lookup: {
            from: "labels",
            localField: "brand",
            foreignField: "_id",
            as: "brand",
          },
        },
        {
          $unwind: {
            path: "$brand",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "seller",
            foreignField: "_id",
            as: "seller",
          },
        },
        {
          $unwind: {
            path: "$seller",
          },
        },
      ]);

      res.json({
        result: products,
        msg: "Product fetched",
        status: true,
      });
    } catch (err) {
      next(err);
    }
  };
  getProductBySlug = async (req, res, next) => {
    try {
      let product = await ProductModel.findOne({
        slug: req.params.slug,
      })
        .populate("brand")
        .populate("category")
        .populate("seller");

      let related_product = await ProductModel.find({
        category: product.category._id,
        status: "active",
      })
        .populate("brand")
        .populate("category")
        .populate("seller");

      if (product) {
        res.json({
          result: {
            details: product,
            related: related_product,
          },
          msg: "Successfully fetched.",
          status: true,
        });
      } else {
        next({
          msg: "Product does not exist. ",
          status: 400,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ProductController;
