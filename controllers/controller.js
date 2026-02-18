const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

exports.getImages = async (req, res) => {
    try {
        const images = await prisma.image.findMany();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch images" });
    }
};

exports.uploadImage = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const image = await prisma.image.create({
        data: {
          title,
          description,
          url: req.file.path,
        },
      });
      res.json(image);
    } catch (error) {
      res.status(500).json({ error: "Failed to upload image" });
    }
  },
];

exports.updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const image = await prisma.image.update({
            where: { id },
            data: {
                title,
                description
            }
        });
        res.json(image);
    } catch (error) {
        res.status(500).json({ error: "Failed to update image" });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.image.delete({
            where: { id }
        });
        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete image" });
    }
};