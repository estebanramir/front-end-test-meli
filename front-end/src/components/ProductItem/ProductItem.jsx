import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProductItem.scss";

const ProductItem = (props) => {
  const {
    id,
    price,
    title,
    picture,
    free_shipping,
    state_name,
  } = props.product;

  const detailUrl = `/items/${id}`;

  const priceFormatter = (value) => {
    const formatter = new Intl.NumberFormat("de", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `$ ${formatter.format(value.amount)}`;
  };

  return (
    <li className="search-item">
      <div className="search-item__image-wrapper">
        <Link to={detailUrl}>
          <img src={picture} className="search-item__image" alt="" />
        </Link>
      </div>

      <div className="search-item__content-wrapper">
        <div className="search-item__content">
          <span className="">{priceFormatter(price)}</span>
          {free_shipping && (
            <span className="search-item__shipping">
              <img src="/delivery-truck.svg" alt="icono envio gratis" />
            </span>
          )}
        </div>
        <Link to={detailUrl}>
          <h2 className="search-item__title">{title}</h2>
        </Link>
      </div>
      <div className="search-item__location">
        <address className="">{state_name}</address>
      </div>
    </li>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};
export default ProductItem;
