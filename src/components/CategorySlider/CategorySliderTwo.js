import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
const domainImage = process.env.NEXT_PUBLIC_MINIO_MEDIA_HOST

const CategorySliderTwo = ({ categorySliderData }) => {
  const params = {
    loop: false,
    slidesPerView: categorySliderData.length,
    grabCursor: true,
    spaceBetween: 30,
    breakpoints: {
      1024: {
        slidesPerView: categorySliderData.length
      },
      769: {
        slidesPerView: 5
      },
      576: {
        slidesPerView: 3
      },
      320: {
        slidesPerView: 2
      }
    }
  };
  return (
    <div className="category-slider-area space-pb--r100">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div className="section-title text-center space-mb--25">
              <h2>Top Categories</h2>
            </div>
            <p className="leads text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12}>
            <Swiper {...params}>
              {categorySliderData &&
                categorySliderData.map((single, key) => {
                  return (
                    <div className="item" key={key}>
                      <div className="categories-box categories-box--style-two">
                        <Link href={`category/${single.slug}`}>
                          <a>
                            <img src={`${domainImage}${single.image}`} alt="" style={{ height: "100px", width: "100px" }} />
                            <span>{single.name}</span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategorySliderTwo;
