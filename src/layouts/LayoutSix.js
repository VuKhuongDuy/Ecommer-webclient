import { Fragment } from "react";
import { HeaderSix } from "../components/Header";
import { FooterSix } from "../components/Footer";

const LayoutSix = ({ children, navPositionClass, categories }) => {
  return (
    <Fragment>
      <HeaderSix navPositionClass={navPositionClass} categories={categories}/>
      {children}
      <FooterSix />
    </Fragment>
  );
};

export default LayoutSix;
