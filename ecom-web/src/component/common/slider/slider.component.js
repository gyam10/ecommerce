import { Carousel } from "react-bootstrap";

const SliderItem = ({ type, image, title }) => {
  return (
    <>
      <img
        className="d-block w-100"
        src={process.env.REACT_APP_BE_URL + "assets/" + type + "/" + image}
        alt=""
      />

      {title && (
        <>
          <Carousel.Caption>
            <h3>{title} </h3>
          </Carousel.Caption>
        </>
      )}
    </>
  );
};

const SliderComponent = ({ data, type }) => {
  return (
    <>
      <Carousel fade>
        {data &&
          data.map((item, index) => (
            <Carousel.Item key={index} className="banner-img">
              {item.link ? (
                <a href={item.link} target="_new">
                  <SliderItem
                    type={type}
                    title={item.title}
                    image={item.image}
                  />
                </a>
              ) : (
                <>
                  <SliderItem
                    type={type}
                    title={item.title}
                    image={item.image}
                  />
                </>
              )}
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};
export default SliderComponent;
