const Program = require('../models/Program.model');

exports.createProgram = async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json(program);
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPrograms = async (req, res) => {
  const programs = await Program.findAll();
  res.json(programs);
};
