import { useEffect, useState } from "react";
import { getLabelByType } from "../../services/label.service";
import SliderComponent from "../../component/common/slider/slider.component";
import { Container, Row, Col } from "react-bootstrap";
import { getCategoryByType } from "../../services/category.service";
import CardLayout from "../../component/common/card-layout/card-layout.component";
import SingleProductView from "../../component/front/single-product-view/single-product.component";
import { getProductByType } from "../../services/product.service";

const HomePage = () => {
  let [banners, setBanners] = useState();
  let [cats, setCats] = useState();
  let [products, setProducts] = useState();
  let getAllBanners = async () => {
    let result = await getLabelByType("banner");
    if (result) {
      let all_active_banners = result.result.filter(
        (item) => item.status === "active"
      );
      setBanners(all_active_banners);
    }
  };

  let getAllCategories = async () => {
    let result = await getCategoryByType();
    console.log(result);
    if (result) {
      let all_cats = result.result.filter(
        (item) => item.status === "active" && item.show_in_home === true
      );
      setCats(all_cats);
    }
  };
  let getAllProducts = async () => {
    let result = await getProductByType();

    if (result.result) {
      let all_products = result.result.filter(
        (item) => item.status === "active"
      );

      setProducts(all_products);
    }
  };

  useEffect(() => {
    getAllBanners();
    getAllCategories();
    getAllProducts();
  }, []);

  return (
    <>
      {/* Banners */}
      <SliderComponent data={banners} type="label" />

      <Container>
        <Row className="mt-3">
          <Col sm={12}>
            <h4 className="text-center">Categories</h4>
            <hr />
          </Col>
        </Row>

        <Row className="mt-3">
          {cats &&
            cats.map((item, index) => (
              <Col sm={6} md={2} key={index}>
                <CardLayout data={item} type="category" />
              </Col>
            ))}
        </Row>
      </Container>

      <Container>
        <Row className="mt-5">
          <Col sm={12}>
            <h4 className="text-center">All Products</h4>
            <hr />
          </Col>
        </Row>
        <Row>
          {products &&
            products.map((item, index) => (
              <Col sm={6} md={2} className="mt-3" key={index}>
                <SingleProductView data={item} type="product" />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
