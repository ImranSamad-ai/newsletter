const blogModel = require("../models/blog");

exports.createblog = async (req, res) => {
  const { title, content } = req.body;

  const newblog = await blogModel.create({
    title,
    content,
  });

  res.send(newblog);
};
exports.getblogs = async (req, res) => {
  const blogs = await blogModel.find();

  res.send(blogs);
};
