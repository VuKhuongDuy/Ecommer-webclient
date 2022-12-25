import Link from "next/link";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const Navigation = ({ positionClass, categories = [] }) => {
  const renderCategories = () => {
    const render = <ul className="sub-menu--mega__list">
    {
      categories.map(ct => {
        return <li key={ct._id}>
          <Link href={`/category/${encodeURIComponent(ct.slug)}`}>
            <a>{ct.name}</a>
          </Link>
        </li>
      })
    }
    </ul>
    return render;
  }

  return (
    <nav className="navigation d-none d-lg-block">
      <ul
        className={`d-flex ${
          positionClass ? positionClass : "justify-content-end"
        }`}
      >
        <li>
          <Link href="/">
            <a className="nav-link">
              PRODUCTS <IoIosArrowDown />
            </a>
          </Link>
          <ul className="sub-menu sub-menu--one-column sub-menu--one-column--has-children sub-menu--one-column--reverse">
            <li className="sub-menu--mega__column">
            {
              renderCategories()
            }
            </li>
          </ul>
        </li>
        <li>
          <Link href="/other/about-us">
            <a className="nav-link">
              About Us
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className="nav-link">
              BLOG <IoIosArrowDown />
            </a>
          </Link>
          <ul className="sub-menu sub-menu--one-column sub-menu--one-column--has-children sub-menu--one-column--reverse">
            <li>
              <Link href="/blog/grid-four-columns">
                <a>
                  Grids <IoIosArrowForward />
                </a>
              </Link>
              <ul className="sub-menu sub-menu--one-column sub-menu--one-column--child-menu">
                <li>
                  <Link href="/blog/grid-three-columns">
                    <a>Three Columns</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-four-columns">
                    <a>Four Columns</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-left-sidebar">
                    <a>Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-right-sidebar">
                    <a>Right Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-standard-left-sidebar">
                    <a>Standard Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/grid-standard-right-sidebar">
                    <a>Standard Right Sidebar</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/blog/list-left-sidebar">
                <a>
                  Lists <IoIosArrowForward />
                </a>
              </Link>
              <ul className="sub-menu sub-menu--one-column sub-menu--one-column--child-menu">
                <li>
                  <Link href="/blog/list-left-sidebar">
                    <a>Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/list-right-sidebar">
                    <a>Right Sidebar</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/blog/post-left-sidebar">
                <a>
                  Single Post <IoIosArrowForward />
                </a>
              </Link>
              <ul className="sub-menu sub-menu--one-column sub-menu--one-column--child-menu">
                <li>
                  <Link href="/blog/post-left-sidebar">
                    <a>Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-right-sidebar">
                    <a>Right Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-slider">
                    <a>Slider Post</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-audio">
                    <a>Audio Post</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/post-video">
                    <a>Video Post</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/other/contact-us">
            <a className="nav-link">CONTACT US</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
