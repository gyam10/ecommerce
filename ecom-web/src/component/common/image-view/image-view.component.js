import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const ImageViewComponent = ({ src, width = null }) => {
  let path = process.env.REACT_APP_IMAGE_URL + src;
  const onInit = (e) => {
    console.log("LigthGallery has been initialized");
  };

  let style = {};
  if (width) {
    style = {
      width: width,
    };
  }
  return (
    <>
      <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
        <a href={path} data-lg-size="1400-1400">
          <img
            className="img img-fluid"
            alt=""
            style={{ ...style }}
            src={path}
          />
        </a>
      </LightGallery>
    </>
  );
};
export default ImageViewComponent;
