const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.put("/:id", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = await User.findOne({ email: req.body.email });
        const userDataToUpdate = { ...req.body };

        // if (!userDataToUpdate.email) delete userDataToUpdate.email;
        // if (!userDataToUpdate.password) delete userDataToUpdate.password;
        // if (!userDataToUpdate.role) delete userDataToUpdate.role;
        // if (!userDataToUpdate.image) delete userDataToUpdate.image;
        // if (!userDataToUpdate.firstName) delete userDataToUpdate.firstName;
        // if (!userDataToUpdate.lastName) delete userDataToUpdate.lastName;
        // if (!userDataToUpdate.nameOrCompany) delete userDataToUpdate.nameOrCompany;
        // if (!userDataToUpdate.areasActivity) delete userDataToUpdate.areasActivity;
        // if (!userDataToUpdate.phone1) delete userDataToUpdate.phone1;
        // if (!userDataToUpdate.phone2) delete userDataToUpdate.phone2;
        // if (!userDataToUpdate.Facebook) delete userDataToUpdate.Facebook;
        // if (!userDataToUpdate.TikTok) delete userDataToUpdate.TikTok;
        // if (!userDataToUpdate.YouTube) delete userDataToUpdate.YouTube;
        // if (!userDataToUpdate.Instagram) delete userDataToUpdate.Instagram;
        // if (!userDataToUpdate.WhatsApp) delete userDataToUpdate.WhatsApp;
        // if (!userDataToUpdate.Telegram) delete userDataToUpdate.Telegram;
        // if (!userDataToUpdate.Viber) delete userDataToUpdate.Viber;
        // if (!userDataToUpdate.LinkedIn) delete userDataToUpdate.LinkedIn;
        // if (!userDataToUpdate.street) delete userDataToUpdate.street;
        // if (!userDataToUpdate.house) delete userDataToUpdate.house;
        // if (!userDataToUpdate.apartment) delete userDataToUpdate.apartment;
        // if (!userDataToUpdate.zip) delete userDataToUpdate.zip;
        // if (!userDataToUpdate.social) delete userDataToUpdate.social;
        // if (!userDataToUpdate.city) delete userDataToUpdate.city;
        // if (!userDataToUpdate.region) delete userDataToUpdate.region;
        // if (!userDataToUpdate.workLocation) delete userDataToUpdate.workLocation;
        // if (!userDataToUpdate.detailedAddress) delete userDataToUpdate.detailedAddress;
        // if (!userDataToUpdate.workingHoursMon) delete userDataToUpdate.workingHoursMon;
        // if (!userDataToUpdate.workingHoursTue) delete userDataToUpdate.workingHoursTue;
        // if (!userDataToUpdate.workingHoursWed) delete userDataToUpdate.workingHoursWed;
        // if (!userDataToUpdate.workingHoursThu) delete userDataToUpdate.workingHoursThu;
        // if (!userDataToUpdate.workingHoursFri) delete userDataToUpdate.workingHoursFri;
        // if (!userDataToUpdate.workingHoursSat) delete userDataToUpdate.workingHoursSat;
        // if (!userDataToUpdate.workingHoursSun) delete userDataToUpdate.workingHoursSun;
        // if (!userDataToUpdate.description) delete userDataToUpdate.description;
        // if (!userDataToUpdate.services) delete userDataToUpdate.services;
        // if (!userDataToUpdate.price) delete userDataToUpdate.price;
        // if (!userDataToUpdate.image) delete userDataToUpdate.image;
        // if (!userDataToUpdate.additionalImage1) delete userDataToUpdate.additionalImage1;
        // if (!userDataToUpdate.additionalImage2) delete userDataToUpdate.additionalImage2;
        // if (!userDataToUpdate.additionalImage3) delete userDataToUpdate.additionalImage3;
        // if (!userDataToUpdate.additionalImage4) delete userDataToUpdate.additionalImage4;
        // if (!userDataToUpdate.additionalImage5) delete userDataToUpdate.additionalImage5;
        // if (!userDataToUpdate.additionalImage6) delete userDataToUpdate.additionalImage6;
        // if (!userDataToUpdate.additionalImage7) delete userDataToUpdate.additionalImage7;
        // if (!userDataToUpdate.additionalImage8) delete userDataToUpdate.additionalImage8;
        // if (!userDataToUpdate.additionalImage9) delete userDataToUpdate.additionalImage9;
        // if (!userDataToUpdate.additionalImage10) delete userDataToUpdate.additionalImage10;
        if (user) {
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });
        }
        if (userDataToUpdate.password) {
            userDataToUpdate.password = hashPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            userDataToUpdate,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).json({ data: updatedUser });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;


