import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import noImageFound from "../../../assets/image/no-image-found.jpg";
const CardLayout = ({ data, type }) => {
  const handelError = (e) => {
    e.target.src = noImageFound;
  };
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={process.env.REACT_APP_IMAGE_URL + "/" + type + "/" + data.image}
          onError={handelError}
          className="thumb-small"
        />
        <hr />

        <Card.Title>
          {data.slug ? (
            <NavLink to={"/" + type + "/" + data.slug} className="nav-link">
              {data.title}
            </NavLink>
          ) : (
            <p>{data.title}</p>
          )}
        </Card.Title>
      </Card>
    </>
  );
};
export default CardLayout;
