import { connect } from "react-redux";
import { getProducts } from "../../lib/product";
import { LayoutFive } from "../../layouts";
import { HeroSliderFive } from "../../components/HeroSlider";
import { BannerFive } from "../../components/Banner";
import { ProductTabThree } from "../../components/ProductTab";
import { BrandLogoThree } from "../../components/BrandLogo";
import {
  ProductSliderEightWrapper,
  ProductSliderNine,
  DealProductSlider
} from "../../components/ProductSlider";
import { categoryService, productService } from "../../api-services";

import heroSliderFiveData from "../../data/hero-sliders/hero-slider-five.json";
import brandLogoData from "../../data/brand-logo/brand-logo-one.json";

const ElectronicsOne = ({
  categories,
  newProducts,
  featuredProducts,
  bestSellerProducts,
  flashSaleProducts,
  dealOfTheDayProducts,
  carouselProducts
}) => {
  console.log({categories})
  console.log({newProducts})
  console.log({featuredProducts})
  console.log({bestSellerProducts})
  console.log({flashSaleProducts})
  console.log({dealOfTheDayProducts})
  console.log({carouselProducts})

  return (
    <LayoutFive navPositionClass="justify-content-start">
      {/* hero slider */}
      <HeroSliderFive carouselProducts={carouselProducts} />
      {/* tab product */}
      <ProductTabThree
        title="Exclusive Products"
        bannerImage="/assets/images/banner/shop_banner_img6.jpg"
        newProducts={newProducts}
        bestSellerProducts={bestSellerProducts}
        featuredProducts={featuredProducts}
        saleProducts={flashSaleProducts}
      />
      {/* banner */}
      <BannerFive containerClass="custom-container" />
      {/* deal products */}
      <DealProductSlider title="Deal Of The Day" products={dealOfTheDayProducts} />
      {/* product slider */}
      <ProductSliderNine
        title="Trending Products"
        bannerImage="/assets/images/banner/shop_banner_img10.jpg"
        products={bestSellerProducts}
      />
      {/* brand logo */}
      <BrandLogoThree title="Our Brands" brandLogoData={brandLogoData} />
      {/* product slider */}
      <ProductSliderEightWrapper
        featuredTitle="Featured Products"
        bestSellerTitle="Bestseller Products"
        saleTitle="Sale Products"
        featuredProducts={featuredProducts}
        bestSellerProducts={bestSellerProducts}
        saleProducts={bestSellerProducts}
      />
    </LayoutFive>
  );
};


export async function getServerSideProps() {
  console.log("Get server side")
  const categoriesData = await categoryService.get();
  // const productsData = await productService.get();
  const newProductsData = await productService.getNew();
  const featuredProducts = await productService.getFeatured();
  const bestSellerProducts = await productService.getBestSeller();
  const flashSaleProducts = await productService.getFlashSale();
  const dealOfTheDayProducts = await productService.getDealOfTheDay();
  const carouselProducts = await productService.getCarousel();
  return {
    props: {
      categories: categoriesData.data || [],
      newProductsData: newProductsData.data || [],
      featuredProducts: featuredProducts.data || [],
      bestSellerProducts: bestSellerProducts.data || [],
      flashSaleProducts: flashSaleProducts.data || [],
      dealOfTheDayProducts: dealOfTheDayProducts.data || [],
      carouselProducts: carouselProducts.data || []
    },
  }
}

export default ElectronicsOne;
