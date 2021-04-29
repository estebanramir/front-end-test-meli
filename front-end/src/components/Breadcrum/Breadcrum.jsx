import './Breadcrum.scss';

function Breadcrum({ categories = [] }) {
  const categoriesLength = categories.length;
  return (
    <div className="breadcrum">
      {categories.map((category, index) => {
        return index === categoriesLength - 1 ? (
          <span key={`${category}${index}`}>{category}</span>
        ) : (
          <div
            key={`${category}${index}`}
            className="breadcrum-category"
          >
            <a href='/'>{category}</a>
            <img
              src='/is-greater-than.svg'
              className="breadcrum-divider"
              alt='arrow icon'
            ></img>
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrum;
