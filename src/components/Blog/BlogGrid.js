import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

const BlogGrid = ({ customClass, posts }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  }

  return (
    <div className="blog-grid-area space-pb--r70">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div className="section-title text-center space-mb--25">
              <h2>Latest News</h2>
            </div>
            {/* <p className="leads text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p> */}
          </Col>
        </Row>
        <Row className="justify-content-center">
          {
            posts.map((elem) => 
              <Col lg={4} md={6} key={elem.id}>
                <div
                  className={`blog-post blog-post--style-two ${
                    customClass ? customClass : ""
                  }`}
                >
                  <div className="blog-post__image">
                    <Link href={`/blog/${elem.slug}`}>
                      <a>
                        <img
                          src={elem.image}
                          alt="blog_small_img1"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="blog-post__content">
                    <div className="blog-text">
                      <h6 className="blog-title">
                        <Link href="/blog/post-left-sidebar">
                          <a>
                            {elem.title}
                          </a>
                        </Link>
                      </h6>
                      <ul className="blog-meta">
                        <li>
                          <Link href="/blog/post-left-sidebar">
                            <a>
                              <FaCalendarAlt /> {formatDate(elem.create_at)}
                            </a>
                          </Link>
                        </li>
                      </ul>
                      <p>
                        {elem.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              )
          }
        </Row>
      </Container>
    </div>
  );
};

export default BlogGrid;
