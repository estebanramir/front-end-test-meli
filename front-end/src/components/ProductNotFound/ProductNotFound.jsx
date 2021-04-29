import React from "react"
import './ProductNotFound,scss';

const ProductNotFound = () => (
  <>
    <div className="">
      <div className="">
        <img
          src='/not-found.svg'
          className=""
          alt='icono de no se encontro nada'
        />
      </div>
      <div className="">
        <p class="error-title">Parece que la Pagina no existe.</p>
        <p> Ir a la pagina principal</p>
      </div>
    </div>
</>
);

export default ProductNotFound;