import { useState } from "react";
import Link from "next/link";
import { SlideDown } from "react-slidedown";
import { IoIosMenu, IoIosArrowForward } from "react-icons/io";

const CategoryMenuThree = ({ categoryMenuStyle, categories }) => {
  const [categoryMenuExpandStatus, setCategoryMenuExpandStatus] = useState(
    false
  );
  const [
    categoryMenuItemExpandStatus,
    setCategoryMenuItemExpandStatus
  ] = useState(false);
  return (
    <div className="header-categories-wrap">
      <button
        className={`category-menu-trigger ${
          categoryMenuStyle ? categoryMenuStyle : ""
        }`}
        onClick={() => setCategoryMenuExpandStatus(!categoryMenuExpandStatus)}
      >
        <IoIosMenu /> ALL CATEGORIES
      </button>
      <nav className="category-menu dark-skin">
        <SlideDown closed={categoryMenuExpandStatus ? false : true}>
          <ul>
            {
              categories.map(elem =>
                <li className="has-children-mega" key={elem.id}>
                  <Link href="/shop/grid-left-sidebar">
                    <a className="nav-link">
                      <i className="flaticon-tv"></i>{" "}
                      <span>
                        {elem.name} <IoIosArrowForward />
                      </span>
                    </a>
                  </Link>
                </li>
              )
            }
          </ul>
        </SlideDown>
      </nav>
    </div>
  );
};

export default CategoryMenuThree;
