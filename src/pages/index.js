import { LayoutSix } from "../layouts";
import { HeroSliderSix } from "../components/HeroSlider";
import { BannerFive, BannerSix } from "../components/Banner";
import { CategorySliderTwo } from "../components/CategorySlider";
import { ProductTabFour } from "../components/ProductTab";
import { ProductSliderEleven } from "../components/ProductSlider";
import { TestimonialOne } from "../components/Testimonial";
import { BlogGrid } from "../components/Blog";
import { BrandLogoTwo } from "../components/BrandLogo";

// import heroSliderSixData from "../data/hero-sliders/hero-slider-six.json";
// import categorySliderData from "../data/category-sliders/category-slider-two.json";
import testimonialOneData from "../data/testimonials/testimonial-one.json";
import brandLogoData from "../data/brand-logo/brand-logo-one.json";
import { categoryService, productService, bannerService } from "../api-services";

const ElectronicsTwo = ({
  categories,
  categoriesSlideData,
  newProducts,
  featuredProducts,
  bestSellerProducts,
  flashSaleProducts,
  dealOfTheDayProducts,
  carouselProducts,
  banner1,
  banner2,
  slides,
}) => {
  console.log({categories})
  console.log({newProducts})
  console.log({featuredProducts})
  console.log({bestSellerProducts})
  console.log({flashSaleProducts})
  console.log({dealOfTheDayProducts})
  console.log({carouselProducts})
  console.log({banner1})
  console.log({banner2})
  console.log({slides})

  return (
    <LayoutSix navPositionClass="justify-content-start" categories={categories}>
      {/* hero slider */}
      <HeroSliderSix heroSliderData={slides}/>
      {/* banner */}
      <BannerFive banner={banner1} />
      {/* category slider */}
      <CategorySliderTwo categorySliderData={categoriesSlideData} />
      
      <ProductSliderEleven
        title="Flash Sale Products"
        products={flashSaleProducts}
      />
      {/* banner */}
      <BannerSix banner={banner2} />
      {/* tab product */}
      <ProductTabFour
        title="Best Seller Products"
        newProducts={newProducts}
        bestSellerProducts={bestSellerProducts}
        featuredProducts={featuredProducts}
        saleProducts={flashSaleProducts}
      />
      
      <ProductSliderEleven
        title="Trending Products"
        products={bestSellerProducts}
      />
      {/* testimonial */}
      <TestimonialOne testimonialData={testimonialOneData} />
      {/* blog grid */}
      <BlogGrid customClass="blog-post--style-two--no-radius" />
      {/* brand logo */}
      <BrandLogoTwo brandLogoData={brandLogoData} />
    </LayoutSix>
  );
};

// const mapStateToProps = (state) => {
//   const products = state.productData;
//   return {
//     trendingProducts: getProducts(products, "electronics", "popular", 10),
//     featuredProducts: getProducts(products, "electronics", "featured", 8),
//     newProducts: getProducts(products, "electronics", "new", 8),
//     bestSellerProducts: getProducts(products, "electronics", "popular", 8),
//     saleProducts: getProducts(products, "electronics", "sale", 8)
//   };
// };

export async function getServerSideProps() {
  const categoriesData = await categoryService.get();
  const categoriesSlideData = await categoryService.get('', 7);
  // const productsData = await productService.get();
  const newProductsData = await productService.getNew();
  const featuredProducts = await productService.getFeatured();
  const bestSellerProducts = await productService.getBestSeller();
  const flashSaleProducts = await productService.getFlashSale();
  const dealOfTheDayProducts = await productService.getDealOfTheDay();
  const carouselProducts = await productService.getCarousel();
  const banner1 = await bannerService.getHomeBanner1();
  const banner2 = await bannerService.getHomeBanner2();
  const slides = await bannerService.getBannerSlide();
  return {
    props: {
      categories: categoriesData.data || [],
      categoriesSlideData: categoriesSlideData.data || [],
      newProductsData: newProductsData.data || [],
      featuredProducts: featuredProducts.data || [],
      bestSellerProducts: bestSellerProducts.data || [],
      flashSaleProducts: flashSaleProducts.data || [],
      dealOfTheDayProducts: dealOfTheDayProducts.data || [],
      carouselProducts: carouselProducts.data || [],
      banner1: banner1.data || [],
      banner2: banner2.data || [],
      slides: slides.data || []
    },
  }
}

export default ElectronicsTwo;
