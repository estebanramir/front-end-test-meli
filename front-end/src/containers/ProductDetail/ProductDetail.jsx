import useFetch from "use-http";
import "./ProductDetail.scss";
import BuyButton from "../../components/BuyButton/BuyButton";
import Breadcrum from "../../components/Breadcrum/Breadcrum";
import { useParams } from "react-router";

const ProductDetail = () => {
  let { id } = useParams();
  const options = {};
  const { loading, error, data = [] } = useFetch(
    `http://localhost:3001/api/items/${id}`,
    options,
    []
  );
  if (!loading && error === undefined) {
    const {
      price,
      title,
      picture,
      description,
      condition,
      sold_quantity,
    } = data.item;

    const priceFormatter = (value) => {
      const formatter = new Intl.NumberFormat("de", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return `$ ${formatter.format(value.amount)}`;
    };
    return (
      <>
        <Breadcrum categories={data.categories} />
        <section className="pd">
          <div className="pd-image">
            <img src={picture} className="" alt="titulo" />
            <div className="pd-description">
              <h2 className="pd-description__title">Descripcion de Producto</h2>
              <p className="pd-description__content">{description}</p>
            </div>
          </div>

          <div className="pd-header">
            <div className="pd-header-subtitle">
              <span>{condition}</span> - <span>{sold_quantity} vendidos</span>
            </div>
            <div className="pd-header-title">
              <h1 className="pd-header-title">{title}</h1>
            </div>
            <span className="pd-header-price">
              <span>{priceFormatter(price)}</span>
              <span className="pd-header-price-decimals">.00</span>
            </span>
            <BuyButton type="button" ariaLabel="comprar">
              Comprar
            </BuyButton>
          </div>
        </section>
      </>
    );
  } else return <></>;
};

export default ProductDetail;
