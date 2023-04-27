const UserModel = require("../models/user.model");
const AuthService = require("../services/auth.service");

class UserController {
  constructor() {
    this.auth_svc = new AuthService();
  }
  getAllUsers = async (req, res, next) => {
    //
    try {
      let filters = {};
      if (req.query.role && req.query.role !== "all") {
        filters = {
          role: req.query.role,
        };
      }
      let result = await UserModel.find(filters);
      res.json({
        result: result,
        msg: "User Fetched",
        status: true,
      });
    } catch (error) {
      next(error);
    }
  };

  updateUserById = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      // req.files
      //
      data.image = req.file.filename;
    }
    try {
      let validation = this.auth_svc.registerValidate(data);

      if (validation) {
        next({
          status: 400,
          msg: validation,
        });
      } else {
        if (data.role) {
          data.role = data.role.split(",");
        }

        data.address = {
          billing: {
            address: data.address_billing_address,
            house_no: data.address_billing_house_no,
          },
          shipping: {
            address: data.address_shipping_address,
            house_no: data.address.shipping_house_no,
          },
        };

        let user = UserModel.findByIdAndUpdate(req.params.id, {
          $set: data,
        })
          .then((ack) => {
            res.json({
              result: user,
              status: true,
              msg: "User Registered successfully.",
            });
          })
          .catch((err) => {
            next({
              status: 500,
              msg: err,
            });
          });
      }
    } catch (error) {
      next({
        status: 400,
        msg: error,
      });
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      let result = await UserModel.findByIdAndDelete(req.params.id);
      if (result) {
        res.json({
          result: result,
          msg: "User Deleted Successfully",
          status: true,
        });
      } else {
        next({
          status: 404,
          msg: "User not found",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      let result = await UserModel.findById(req.params.id);
      if (result) {
        res.json({
          result: result,
          msg: "User Fetched Successfully",
          status: true,
        });
      } else {
        next({
          status: 404,
          msg: "User not found",
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
