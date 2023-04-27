import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getProductByCategory } from "../../services/product.service";
import SingleProductView from "../../component/front/single-product-view/single-product.component";

const CategoryDetailPage = () => {
  const params = useParams();
  const [products, setProducts] = useState();

  const getAllProductsByCategory = async () => {
    try {
      let all_cats_product = await getProductByCategory(params.slug);
      if (all_cats_product) {
        setProducts(all_cats_product.result);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAllProductsByCategory();
  }, []);

  return (
    <>
      <Container>
        {products && products.length > 0 ? (
          <>
            <Row className="mt-4">
              <Col>
                <h2 className="text-center">
                  Product Listing of{" "}
                  <em>{products && products[0].category.title}</em>
                </h2>
              </Col>
              <hr />
            </Row>
            <Row className="mt-3">
              {products &&
                products.map((item, index) => (
                  <Col sm={6} md={2} className="mt-3" key={index}>
                    <SingleProductView data={item} type="product" />
                  </Col>
                ))}
            </Row>
          </>
        ) : (
          <>
            <h3 className="text-danger text-center mt-5">Category is empty</h3>
          </>
        )}
      </Container>
    </>
  );
};
export default CategoryDetailPage;
