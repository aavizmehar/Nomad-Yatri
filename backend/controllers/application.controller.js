const Application = require('../models/Application.model');

exports.applyProgram = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByPk(id);
    application.status = req.body.status;
    await application.save();
    res.json(application);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};
