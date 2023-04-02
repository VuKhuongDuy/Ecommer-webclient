import { LayoutSix } from "../layouts";
import { HeroSliderSix } from "../components/HeroSlider";
import { BannerFive, BannerSix } from "../components/Banner";
import { CategorySliderTwo } from "../components/CategorySlider";
import { ProductSliderEleven } from "../components/ProductSlider";
import { BlogGrid } from "../components/Blog";

// import heroSliderSixData from "../data/hero-sliders/hero-slider-six.json";
// import categorySliderData from "../data/category-sliders/category-slider-two.json";
import { categoryService, productService, bannerService, postService } from "../api-services";

const ElectronicsTwo = ({
  categories,
  categoriesSlide,
  newProducts,
  featuredProducts,
  bestSellerProducts,
  flashSaleProducts,
  dealOfTheDayProducts,
  carouselProducts,
  homebanner,
  centerbanner,
  slides,
  posts,
}) => {
  return (
    <LayoutSix navPositionClass="justify-content-start" categories={categories}>
      {/* hero slider */}
      <HeroSliderSix heroSliderData={slides}/>
      {/* banner */}
      <BannerFive banner={homebanner} />
      {/* category slider */}
      <CategorySliderTwo categorySliderData={categoriesSlide} />
      
      <ProductSliderEleven
        title="Flash Sale Products"
        products={flashSaleProducts}
      />
      {/* banner */}
      <BannerSix banner={centerbanner} />
      {/* tab product */}
      {/* <ProductTabFour
        title="Best Seller Products"
        newProducts={newProducts}
        bestSellerProducts={bestSellerProducts}
        featuredProducts={featuredProducts}
        saleProducts={flashSaleProducts}
      /> */}
      <ProductSliderEleven
        title="Best Seller"
        products={bestSellerProducts}
      />
      <ProductSliderEleven
        title="Featured"
        products={featuredProducts}
      />
      <ProductSliderEleven
        title="New"
        products={newProducts}
      />
      
      <ProductSliderEleven
        title="Trending Products"
        products={bestSellerProducts}
      />
      {/* testimonial */}
      {/* <TestimonialOne testimonialData={testimonialOneData} /> */}
      {/* blog grid */}
      <BlogGrid customClass="blog-post--style-two--no-radius" posts={posts} />
      {/* brand logo */}
      {/* <BrandLogoTwo brandLogoData={brandLogoData} /> */}
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
  const categoriesSlide = await categoryService.get('', 7);
  // const productsData = await productService.get();
  const newProductsData = await productService.getNew();
  const featuredProducts = await productService.getFeatured();
  const bestSellerProducts = await productService.getBestSeller();
  const flashSaleProducts = await productService.getFlashSale();
  const dealOfTheDayProducts = await productService.getDealOfTheDay();
  const carouselProducts = await productService.getCarousel();
  const homebanner = await bannerService.getHomeBanner();
  const centerbanner = await bannerService.getHomeCenter();
  const slides = await bannerService.getBannerSlide();
  const posts = await postService.getSlidePost();
  return {
    props: {
      categories: categoriesData.data || [],
      categoriesSlide: categoriesSlide.data || [],
      newProducts: newProductsData.data || [],
      featuredProducts: featuredProducts.data || [],
      bestSellerProducts: bestSellerProducts.data || [],
      flashSaleProducts: flashSaleProducts.data || [],
      dealOfTheDayProducts: dealOfTheDayProducts.data || [],
      carouselProducts: carouselProducts.data || [],
      homebanner: homebanner || [],
      centerbanner: centerbanner || [],
      slides: slides || [],
      posts: posts.data || [],
    },
  }
}

export default ElectronicsTwo;
