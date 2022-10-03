const Temple = require("../models/Temple");
const convertToSlug = require("../utils/slug");
const Cloudinary = require("../utils/cloudinary");


module.exports.addTemple_get = async (req, res) => {
  res.render("./adminpages/addTemple");
};

module.exports.addTemple_post = async (req, res) => {
  try {
    const result = await Cloudinary.uploader.upload(req.file.path);
    const temple = await new Temple({
      title: req.body.title,
      discription: req.body.discription,
      thumbnail: result.secure_url,
      content: req.body.content,
      status: req.body.status,
      slug: convertToSlug(req.body.title),
      cloudinary_id: result.public_id,
    });
    await temple.save();
    res.redirect("/admin/Temples");
  } catch (err) {
    console.log(err);
    res.status(404).render("./error/404");
  }
};

module.exports.updateTemple_get = async (req, res) => {
  const temple = await Temple.findOne({ slug: req.params.slug });
  res.render("./adminpages/editTemple", temple);
};

module.exports.updateTemple_post = async (req, res) => {
  try {
    const oldTemple = await Temple.findOne({ slug: req.params.slug });
    await Cloudinary.uploader.destroy(oldTemple.cloudinary_id);
    const result = await Cloudinary.uploader.upload(req.file.path);
    const temple = await Temple.findOneAndUpdate(
      { slug: req.params.slug },
      {
        $set: {
          title: req.body.title,
          discription: req.body.discription,
          thumbnail: result.secure_url,
          content: req.body.content,
          status: req.body.status,
          slug: convertToSlug(req.body.title),
          cloudinary_id: result.public_id,
        },
      }
    );
    res.redirect("/admin/temples");
  } catch (err) {
    console.log(err);
    res.status(404).render("./error/404");
  }
};

module.exports.deletetemple = async (req, res) => {
  try {
    const oldTemple = await Temple.findOne({ slug: req.params.slug });
    await Cloudinary.uploader.destroy(oldTemple.cloudinary_id);
    const temple = await Temple.findOneAndDelete({ slug: req.params.slug });
    res.redirect("/admin/temples");
  } catch (err) {
    console.log(err);
    res.status(404).render("./error/404");
  }
};

module.exports.temple_getAll = async (req, res) => {
  try {
    const Temples = await Temple.find({ status: "Save and Publish" }).sort({
      updatedAt: "desc",
    });
    res.render("./adminpages/allTemple", { Temples });
  } catch (err) {
    console.log(err);
    res.status(404).render("./error/404");
  }
};

module.exports.temple_getOne = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    const latestTemple = await Temple.find().limit(5);
    res.json({ temple, latestTemple });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};
