const readyOrdersModel = require('../models/readyOrders.model');

exports.addOrderToPrinted = async (req, res) => {
  try {
    const { shopifyOrderId, status } = req.body;

    if (!shopifyOrderId) return res.status(400).send('Missing shopifyOrderId');
    if (!status) return res.status(400).send('Missing status');
    if (shopifyOrderId.length === 0) return res.status(400).send('shopifyOrderId is empty');

    shopifyOrderId.forEach(async (id) => {
      const order = await readyOrdersModel.findOne({ shopifyOrderId: id });
      if (order) return;

      const newReadyOrder = new readyOrdersModel({ shopifyOrderId: id, status });
      await newReadyOrder.save();
    });

    res.send('addOrderToPrinted');
  } catch (error) {
    console.log('🚀  error:', error);
    res.status(500).send('Server error');
  }
};
