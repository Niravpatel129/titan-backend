const axios = require('axios');

const fetchPendingOrders = async (req, res) => {
  axios
    .get(
      'https://icy-toronto.myshopify.com/admin/api/2023-04/orders.json?status=open&created_at_min=2023-11-11',
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        },
      },
    )
    .then((response) => {
      res.send(response.data?.orders);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error fetching orders');
    });
};

module.exports = {
  fetchPendingOrders,
};
