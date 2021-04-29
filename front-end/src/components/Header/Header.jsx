import "./Header.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const Header = ({ history, location }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (ev) => {
    setSearchValue(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    history.push({
      pathname: "/items",
      search: `?search=${encodeURIComponent(searchValue)}`,
    });
  };

  return (
    <header className="nav-bar">
      <div className="nav-bar-wrapper">
        <Link className="nav-bar-logo" to="/">
          <img
            src="/mercado-libre-logo.png"
            className=""
            alt="logo mercadolibre"
          />
        </Link>
        <form className="nav-bar__search" onSubmit={handleSubmit}>
          <input
            className="nav-bar__input"
            type="text"
            id="search"
            name="search"
            placeholder="Nunca dejes de buscar"
            maxLength="100"
            required
            value={searchValue}
            onChange={handleChange}
          />
          <button className="nav-bar__button" type="submit" aria-label="buscar">
            <img
              src="/loupe.svg"
              className="nav-bar__image"
              alt="icono busqueda"
            />
          </button>
        </form>
      </div>
    </header>
  );
};

export default withRouter(Header);
