import { useEffect, useState } from "react";
import { Container, Row, Col, Badge, Form, Button } from "react-bootstrap";
import SliderComponent from "../../component/common/slider/slider.component";
import { NumericFormat } from "react-number-format";
import SingleProductView from "../../component/front/single-product-view/single-product.component";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../services/product.service";

const ProductDetailPage = () => {
  const params = useParams();
  let [data, setData] = useState();
  let [relatedProducts, setRelatedProducts] = useState();
  let [sliderData, setSliderData] = useState();
  let [qty, setQty] = useState(0);

  const getProduct = async () => {
    try {
      let response = await getProductBySlug(params.slug);
      console.log(response.result.details);
      if (response.result) {
        let images = response.result.details.images;
        setData(response.result.details);
        setRelatedProducts(response.result.related);
        let sliders = [];
        images.map((img) =>
          sliders.push({
            image: img,
            title: "",
          })
        );
        setSliderData(sliders);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
  }, [params]);

  return (
    <>
      <Container className="mt-5">
        {data && (
          <>
            <Row className="mt-3">
              <Col sm={12} md={6}>
                <SliderComponent
                  data={sliderData}
                  type="product"
                  className="img img-fluid"
                />
              </Col>

              <Col sm={12} md={6}>
                <Row className="mt-3">
                  <Col>
                    <h2 className="text-center ">{data.title}</h2>
                  </Col>
                </Row>
                <hr />
                <Row className="mt-3">
                  {data.category && (
                    <Col sm={6} md={3}>
                      <Badge pill bg="info">
                        {data.category.title}
                      </Badge>
                    </Col>
                  )}
                  {data.brand && (
                    <Col sm={6}>
                      <Badge pill bg="success">
                        {data.brand.title}
                      </Badge>
                    </Col>
                  )}
                </Row>
                <Row className="mt-3">
                  <Col>
                    <small>{data.seller?.name}</small>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <NumericFormat
                      value={data.after_discount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Nrp. "}
                    />
                    {data.discount && (
                      <del className="text-danger px-3">
                        <NumericFormat
                          value={data.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Nrp. "}
                        />
                      </del>
                    )}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form
                    //  onSubmit={addCurrentProductToCart}
                    >
                      <Form.Group className="row mb-3">
                        <Col sm={12} md={6}>
                          <Form.Control
                            type="number"
                            name="qty"
                            required
                            placeholder="0"
                            size="sm"
                            min={0}
                            defaultValue={qty}
                            onChange={(e) => setQty(e.target.value)}
                          />
                        </Col>
                        <Col sm={12} md={6} className="d-grid gap-2">
                          <Button
                            variant="warning"
                            type="submit"
                            size="sm"
                            className="block"
                          >
                            Add To Cart
                          </Button>
                        </Col>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col dangerouslySetInnerHTML={{ __html: data.description }}></Col>
            </Row>
            <hr />
            <Row>
              <Col className="h2">
                <h2 className="text-center">Related Products</h2>
              </Col>
              <hr />
              {relatedProducts &&
                relatedProducts.map((item, key) => (
                  <Col sm={6} md={2} key={key} className="mt-2">
                    <SingleProductView data={item} type="product" />
                  </Col>
                ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};
export default ProductDetailPage;
