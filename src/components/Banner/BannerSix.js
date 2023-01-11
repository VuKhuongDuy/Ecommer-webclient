import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const BannerSix = ({ banner }) => {
  return (
    <div className="banner-area space-pb--r100">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="sale-banner mb-0">
              <Link href={banner.redirect_url} key={banner.id}>
                <a className="hover-effect">
                  <img
                    src={banner.image}
                    alt="shop_banner"
                  />
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BannerSix;
