import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const BannerSix = ({ banner }) => {
  return (
    <div className="banner-area space-pb--r100">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="sale-banner mb-0">
              {
                banner.map(element => <Link href={element.redirect_url} key={element.id}>
                <a className="hover-effect">
                  <img
                    src={element.image}
                    alt="shop_banner"
                  />
                </a>
              </Link>)
              }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BannerSix;
