const router = require("express").Router();
const { User} = require("../models/user");
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        if (!user.rating) {
            user.rating = [];
        }
        const { userId, value } = req.body;
        const existingRating = user.rating.find(rating => rating.user.toString() === userId);
        if (existingRating) {
            return res.status(409).send({ message: "Rating already exists for the user" });
        }
        user.rating.push({ user: userId, value });
        const updatedUser = await user.save();
        return res.status(200).json({ data: updatedUser });
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


module.exports = router;
