import "./ProductList.scss";
import useFetch from "use-http";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useLocation } from "react-router-dom";
import Breadcrum from "../../components/Breadcrum/Breadcrum";

const ProductList = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const options = {};
  const {
    loading,
    error,
    data = [],
  } = useFetch(
    `http://localhost:3001/api/items?q=$${encodeURIComponent(query).substring(
      9
    )}`,
    options,
    [encodeURIComponent(query)]
  );
  if (error === undefined && !loading) {
    return (
      <>
        <Breadcrum categories={data.categories} />
        <ol className="search-list">
          {data.items.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </ol>
      </>
    );
  } else return <></>;
};

export default ProductList;
