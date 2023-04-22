const router = require("express").Router();
const { User, validate } = require("../models/user");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: 'maticht12345',
    api_key: '296937641242215',
    api_secret: '1Pz4aF1QxcosM4hU6fwRS2bwlWY'
})
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {allowed_formats: ['jpg', 'jpeg', 'png', 'webp']}
});

const upload = multer({ storage: storage });
router.put("/:id", upload.single('image'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {return res.status(404).json({ message: 'Пользователь не найден' });}
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'my-folder' });
        user.image = result.secure_url;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;

