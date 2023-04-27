import { Button, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import noImageFound from "../../../assets/image/no-image-found.jpg";
import Badge from "react-bootstrap/Badge";
import NumberFormat from "react-number-format";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useSelector, useDispatch } from "react-redux";
import { addAnItemToCart } from "../../../reducers/cart.reducer";

const SingleProductView = ({ data, type }) => {
  const handelError = (e) => {
    e.target.src = noImageFound;
  };
  let dispatch = useDispatch();
  let all_cart = useSelector((store) => {
    return store.cart.cartDetail;
  });
  const addCurrentProductToCart = () => {
    dispatch(addAnItemToCart({ product_id: data._id, qty: 1 }));
  };

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            process.env.REACT_APP_IMAGE_URL + "/" + type + "/" + data.images[0]
          }
          onError={handelError}
          className="thumb-small"
        />
        <hr />

        <Card.Body>
          <Card.Title className="h6 ">
            <p className="text-center">
              <Tippy content={data.title}>
                {data.slug ? (
                  <NavLink
                    to={"/" + type + "/" + data.slug}
                    className="nav-link"
                  >
                    {data.title.slice(0, 25) + "..."}
                  </NavLink>
                ) : (
                  <>{data.title.slice(0, 25) + "..."}</>
                )}
              </Tippy>
            </p>
          </Card.Title>
          <Card.Text className="product-thumb">
            <Badge pill bg="info">
              <NavLink
                to={"/category/" + data.category.slug}
                className="nav-link"
              >
                {data.category && data.category.title}
              </NavLink>
            </Badge>
            <p className="h6 mt-3">
              <NumberFormat
                value={data.after_discount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Nrp. "}
              />
              {data.discount && (
                <del className="text-danger px-3">
                  <NumberFormat
                    value={data.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Nrp. "}
                  />
                </del>
              )}
            </p>
            <Button
              variant="warning"
              type="button"
              size="sm"
              className="mt-3"
              onClick={addCurrentProductToCart}
            >
              Add To Cart
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleProductView;
