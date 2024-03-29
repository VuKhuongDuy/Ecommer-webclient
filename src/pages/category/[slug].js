import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { LayoutOne } from "../../layouts";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { Sidebar, ShopHeader, ShopProducts } from "../../components/Shop";
import { productService, bannerService, categoryService } from '../../api-services/';
import { useRouter } from "next/router";

const ListLeftSidebar = ({ _products, bannerProduct, _productTotal, category }) => {
  const [layout, setLayout] = useState("list");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  const [categoryViewing, setCategoryViewing] = useState(null);
  const [productTotal, setProductTotal] = useState(_productTotal)
  const router = useRouter()
  const {q = "", slug = ""} = router.query;
  
  const getLayout = (layout) => {
    setLayout(layout);
  };

  const viewCategory = (value) => {
    setCategoryViewing(value);
  }

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    // let sortedProducts = getSortedProducts(products, sortType, sortValue);
    // const filterSortedProducts = getSortedProducts(
    //   sortedProducts,
    //   filterSortType,
    //   filterSortValue
    // );
    // sortedProducts = filterSortedProducts;
    // setSortedProducts(sortedProducts);
    // setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, _products, sortType, sortValue, filterSortType, filterSortValue]);

  useEffect(() => {
    let arr = [];
    if(!categoryViewing) {
      arr = _products;
    } else {
      arr = _products.filter(m => m.category.id === categoryViewing.id);
    }
    setCurrentData(arr);
  }, [categoryViewing]);

  useEffect(async () => {
    const productResponse = await productService.get(q, 10, currentPage, slug);
    setCurrentData(productResponse.data.data)
  }, [currentPage])

  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle="Shop">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Category</li>
        </ol>
      </BreadcrumbOne>
      <div className="shop-content space-pt--r100 space-pb--r100">
        <Container>
          <Row>
            <Col lg={9}>
              {/* shop page header */}
              <ShopHeader
                getLayout={getLayout}
                getFilterSortParams={getFilterSortParams}
                shopTopFilterStatus={shopTopFilterStatus}
                setShopTopFilterStatus={setShopTopFilterStatus}
                layout={layout}
              />
              {/* shop products */}
              <ShopProducts layout={layout} products={currentData} />

              {/* shop product pagination */}
              <div className="pagination pagination-style pagination-style--two justify-content-center">
                <Paginator
                  totalRecords={productTotal}
                  pageLimit={10}
                  pageNeighbours={2}
                  setOffset={setOffset}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageContainerClass="mb-0 mt-0"
                  pagePrevText="«"
                  pageNextText="»"
                />
              </div>
            </Col>
            <Col lg={3} className="order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
              {/* sidebar */}
              <Sidebar banner={bannerProduct} products={_products} viewCategory={viewCategory} category={category}/>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
};

export async function getServerSideProps({query}) {
  const {q, slug} = query;
  const category = await categoryService.getBySlug(slug);
  const products = await productService.get(q, 10, 1, slug);
  const bannerProduct = await bannerService.getBannerProductSidebar();
  if(!category.data){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      _products: products.data.data || [],
      _productTotal: products.data.total,
      category: category.data,
      bannerProduct: bannerProduct || [],
    },
  };
};

export default ListLeftSidebar;
