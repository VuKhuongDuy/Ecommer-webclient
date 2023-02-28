import { Fragment, useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";

const ImageGalleryBottomThumb = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  const domainImage = process.env.NEXT_PUBLIC_MINIO_MEDIA_HOST
  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: product.images.length,
    loop: true,
    effect: "creative"
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: product.images && product.images.length >= 2 ? product.images.length : 2,
    loopedSlides: product.images && product.images.length >= 2 ? product.images.length : 2,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true
  };

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        <LightgalleryProvider>
          <Swiper {...gallerySwiperParams}>
            {product.images &&
              product.images.map((single, key) => {
                return (
                  <div key={key}>
                    <LightgalleryItem group="any" src={single.url}>
                      <button className="enlarge-icon">
                        <i className="icon-magnifier-add" />
                      </button>
                    </LightgalleryItem>
                    <div className="single-image">{
                      single.type !== "video" ? (
                        <img src={domainImage + single.url} className="img-fluid" alt="" />
                      ) : (
                        <video controls>
                          <source src={domainImage + single.url}></source>
                        </video>
                      )
                    }
                    </div>
                  </div>
                );
              })}
          </Swiper>
        </LightgalleryProvider>
      </div>
      <div className="product-small-image-wrapper">
        <Swiper {...thumbnailSwiperParams}>
          {product.images &&
            product.images.map((image, i) => {
              return (
                <div key={i}>
                  <div className="single-image">
                    {
                      image.type !== "video" ? (
                        <img src={domainImage + image.url} className="img-fluid" alt="" />
                      ) : (
                        <video>
                          <source src={domainImage + image.url}></source>
                        </video>
                      )
                    }
                  </div>
                </div>
              );
            })}
        </Swiper>
      </div>
    </Fragment>
  );
};

export default ImageGalleryBottomThumb;
