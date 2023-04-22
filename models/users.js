const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        console.log(error);
        if (error) return res.status(400).send({ message: error.details[0].message });
            const user = await User.findOne({ email: req.body.email });
            if (user) return res
                .status(409)
                .send({ message: "User with given email already Exist!" });
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            let data = await new User({ ...req.body, password: hashPassword }).save();
            return res.status(201).json({data});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
