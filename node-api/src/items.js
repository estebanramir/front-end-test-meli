const axios = require('axios');


const categoryListBuilder = (filters) => {
  const categoriesObject = filters.find((filter) => filter.id === 'category');
  const categories =
    categoriesObject &&
    categoriesObject.values &&
    categoriesObject.values.length > 0
      ? categoriesObject.values[0].path_from_root.map(
          (category) => category.name
        )
      : [];
  return categories;
};

const itemMapper = (item) => {
  const { prices } = item;
  const [firstPrice] = prices.prices;
  const { currency_id, amount } = firstPrice;
  const price = firstPrice
    ? { currency: currency_id, amount: amount, decimals: 0 }
    : {};
  return {
    id: item.id,
    title: item.title,
    price: price,
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    state_name: item.address.state_name,
  };
};

const fetchItemsList = async (req, res) => {
    const query = req.query.q;
    const request = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`
    );

    const { data } = request;
    if (data) {
      const catergoriesList = categoryListBuilder(data.filters);
      const result = {
        author: { name: 'Esteban', lastname: 'Ramirez' },
        categories: catergoriesList,
        items: data.results.map(itemMapper),
      };
      return res.status(200).send(result);
    } else {
      return res.status(404).send({ msg: `items not found` });
    }
};

module.exports = {
  fetchItemsList: fetchItemsList,
};