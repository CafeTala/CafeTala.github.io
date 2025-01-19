const storeService = require('../services/storeService');

exports.getStoreList = async (req, res) => {
  try {
    const stores = await storeService.fetchStores();
    res.json(stores);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStoreDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await storeService.fetchStoreDetails(id);
    res.json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
