const Host = require('../models/host.model');

exports.registerHost = async (req, res) => {
  const { userId, organization } = req.body;
  try {
    const host = await Host.create({ userId, organization, photos: [] });
    res.status(201).json({ message: 'Host registered', host });
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};

exports.approveHost = async (req, res) => {
  const { hostId } = req.params;
  try {
    const host = await Host.findByPk(hostId);
    host.verified = true;
    await host.save();
    res.json({ message: 'Host approved', host });
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};
