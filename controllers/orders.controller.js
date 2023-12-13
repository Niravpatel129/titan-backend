const axios = require('axios');
const readyOrdersModel = require('../models/readyOrders.model');

const fetchPendingOrders = async (req, res) => {
  const productsIds = new Set();

  axios
    .get(
      'https://icy-toronto.myshopify.com/admin/api/2023-04/orders.json?status=open&created_at_min=2023-11-11',
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        },
      },
    )
    .then(async (response) => {
      response.data?.orders.forEach((order) => {
        order.line_items.forEach((item) => {
          if (!item.product_id) return;

          productsIds.add(item.product_id);
        });
      });

      const products = await axios.get(
        `https://icy-toronto.myshopify.com/admin/api/2023-04/products.json?ids=${Array.from(
          productsIds,
        ).join(',')}}`,
        {
          headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
          },
        },
      );

      response.data?.orders.forEach((order) => {
        order.line_items.forEach((item) => {
          if (!item.product_id) return;

          const product = products.data.products.find((product) => product.id === item.product_id);

          item.product = product;
        });
      });

      res.send(response.data?.orders);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error fetching orders');
    });
};

const fetchPrintedOrders = async (req, res) => {
  const readyOrders = await readyOrdersModel.find({});

  const orderIds = readyOrders.map((order) => order.shopifyOrderId);
  console.log('🚀  productsIds:', orderIds);

  const orders = await axios.get(
    `https://icy-toronto.myshopify.com/admin/api/2023-04/orders.json?ids=${orderIds.join(',')}}`,
    {
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
      },
    },
  );

  res.send(orders.data?.orders);
};

module.exports = {
  fetchPendingOrders,
  fetchPrintedOrders,
};
