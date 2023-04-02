import { Fragment, useEffect, useState } from "react";
import { HeaderSix } from "../components/Header";
import { FooterSix } from "../components/Footer";
import { categoryService } from "../api-services";

const LayoutOne = ({ children, navPositionClass }) => {
  const [categories, setCategories] = useState([])
  useEffect(async()=>{
    const categoriesData = await categoryService.get();
    setCategories(categoriesData.data);
  },[])
  return (
    <Fragment>
      <HeaderSix navPositionClass={navPositionClass} categories={categories}/>
      {children}
      <FooterSix />
    </Fragment>
  );
};

export default LayoutOne;
