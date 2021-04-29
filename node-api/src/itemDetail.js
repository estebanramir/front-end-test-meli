const axios = require('axios');

const {
  API_URL,
  ITEMS,
  ITEMS_DESCRIPTION,
  CATEGORIES,
} = require('./variables/variables');

const itemDetailMapper = (item, desc) => {
  const picture =
    item.pictures && item.pictures[0] ? item.pictures[0].url : null;
  const itemMap = {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: (item.price % 1).toFixed(2).split('.')[1],
    },
    picture: picture,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    sold_quantity: item.sold_quantity,
    description: desc,
  };
  return itemMap;
};

const getItemDescription = async (itemId) => {
  try{
    const itemDescRequest = await axios.get(
      `${API_URL}${ITEMS}${itemId}${ITEMS_DESCRIPTION}`
    );
    const { data } = itemDescRequest;
    if (data) {
      return data.plain_text;
    }
    return null;
    } catch (err) {
    res.status(500).send({ err: err.message });
   }
};

const getItemCategories = async (categoryId) => {
  try{
    const Categories = await axios.get(
      `${API_URL}${CATEGORIES}${categoryId}`
    );
    const { data } = Categories;
    if (data) {
      return data.path_from_root.map((category) => category.name);
    }
    return [];
    } catch (err) {
    res.status(500).send({ err: err.message });
   }
};

const fetchProductById = async (req, res) => {
  try {
    const { itemId } = req.params;
    const itemRequest = await axios.get(`${API_URL}${ITEMS}${itemId}`);

    const { data } = itemRequest;
    if (data) {
      const itemDescRequest = await getItemDescription(itemId);
      const categories = await getItemCategories(data.category_id);
      const result = {
        author: {
          name: 'Esteban',
          lastname: 'Ramirez',
        },
        categories: categories,
        item: itemDetailMapper(data, itemDescRequest),
      };
      return res.status(200).send(result);
    } else {
      return res.status(404).send({ msg: `item not found` });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
   }
};

module.exports = {
  fetchProductById: fetchProductById,
};
