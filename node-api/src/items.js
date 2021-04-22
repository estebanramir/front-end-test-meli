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
    state_name: item.address?.state_name,
  };
};

const fetchItemsList = async (req, res) => {
  try {
    const query = req.query.q;
    const request = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`
    );

    const { data } = request;
    if (data) {
      const catergoriesList = categoryListBuilder(data.filters);
      const result = {
        author: { name: '', lastname: '' },
        categories: catergoriesList,
        items: data.results.map(itemMapper),
      };
      return res.status(200).send(result);
    } else {
      return res.status(404).send({ msg: `items not found` });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const itemDetailMapper = (item, desc) => {
  const itemMap = {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: 0,
    },
    picture: '',
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    sold_quantity: item.sold_quantity,
    description: desc,
  };
  return itemMap;
};

const getItemDescription = async (itemId) => {
  try {
    const itemDescRequest = await axios.get(
      `https://api.mercadolibre.com/items/${itemId}/description`
    );
    const { data } = itemDescRequest;
    if (data) {
      return data.plain_text;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

const fetchItemById = async (req, res) => {
  try {
    const { itemId } = req.params;
    const itemRequest = await axios.get(`https://api.mercadolibre.com/items/${itemId}`);

    if (itemRequest.data) {
      const itemDescRequest = await getItemDescription(itemId);

      const result = {
        author: {
          name: '',
          lastname: '',
        },
        item: itemDetailMapper(itemRequest.data, itemDescRequest),
      };
      return res.status(200).send(result);
    } else {
      return res.status(404).send({ msg: `item not found` });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  fetchItemsList: fetchItemsList,
  fetchItemById: fetchItemById,
};