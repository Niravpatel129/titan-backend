const Item = require('../models/item.model.js');

exports.createItem = async (req, res) => {
  try {
    let newItem = new Item(req.body);
    newItem = await newItem.save();
    res.send(newItem);
  } catch (error) {
    res.status(500).send(error);
  }
};
