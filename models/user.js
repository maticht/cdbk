const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: false},
    password: {type: String, required: false},
    role: {type: String, default: "Subscriber"},
    image: [{type: String, required: false}],
    additionalImage: [{type: String, required: false}],
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    nameOrCompany: { type: String, required: false },
    areasActivity: { type: String, required: false },
    workLocation: { type: String, required: false },
    street: { type: String, required: false },
    house: { type: String, required: false },
    apartment: { type: String, required: false },
    zip: { type: String, required: false },
    phone1: { type: String, required: false },
    phone2: { type: String, required: false },
    Facebook: { type: String, required: false },
    TikTok: { type: String, required: false },
    YouTube: { type: String, required: false },
    Instagram: { type: String, required: false },
    WhatsApp: { type: String, required: false },
    Telegram: { type: String, required: false },
    Viber: { type: String, required: false },
    LinkedIn: { type: String, required: false },
    savedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
    likes: { type: String, required: false },
    rating: { type: String, required: false },
    workingHoursMon: { type: String, required: false },
    workingHoursTue: { type: String, required: false },
    workingHoursWed: { type: String, required: false },
    workingHoursThu: { type: String, required: false },
    workingHoursFri: { type: String, required: false },
    workingHoursSat: { type: String, required: false },
    workingHoursSun: { type: String, required: false },
    city: { type: String, required: false },
    region: { type: String, required: false },
    description: { type: String, required: false },
    services: { type: String, required: false },
    price: { type: String, required: false },

}, { toJSON: { virtuals: true } });

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, "key", {
        expiresIn: "21d",
    });
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name").options({ allowUnknown: true }),
        lastName: Joi.string().required().label("Last Name").options({ allowUnknown: true }),
        email: Joi.string().email().required().label("Email").options({ allowUnknown: true }),
        password: passwordComplexity().required().label("Password").options({ allowUnknown: true }),
        nameOrCompany:  Joi.string().required().label("Name Or Company").options({ allowUnknown: true }),
        areasActivity:  Joi.string().required().label("Areas Activity").options({ allowUnknown: true }),
        city: Joi.string().required().label("City").options({ allowUnknown: true }),
        region: Joi.string().required().label("Region").options({ allowUnknown: true }),
        street: Joi.string().required().label("street").options({ allowUnknown: true }),
        house: Joi.string().required().label("House").options({ allowUnknown: true }),
        apartment: Joi.string().required().label("Apartment").options({ allowUnknown: true }),
        zip: Joi.string().required().label("zip").options({ allowUnknown: true }),
        phone1: Joi.string().required().label("phone1").options({ allowUnknown: true }),
        phone2: Joi.string().required().label("phone2").options({ allowUnknown: true }),
        workingHoursMon: Joi.string().required().label("workingHoursMon").options({ allowUnknown: true }),
        workingHoursTue: Joi.string().required().label("workingHoursTue").options({ allowUnknown: true }),
        workingHoursWed: Joi.string().required().label("workingHoursWed").options({ allowUnknown: true }),
        workingHoursThu: Joi.string().required().label("workingHoursThu").options({ allowUnknown: true }),
        workingHoursFri: Joi.string().required().label("workingHoursFri").options({ allowUnknown: true }),
        workingHoursSat: Joi.string().required().label("workingHoursSat").options({ allowUnknown: true }),
        workingHoursSun: Joi.string().required().label("workingHoursSun").options({ allowUnknown: true }),
        Facebook: Joi.string().required().label("Facebook").options({ allowUnknown: true }),
        TikTok: Joi.string().required().label("TikTok").options({ allowUnknown: true }),
        YouTube: Joi.string().required().label("YouTube").options({ allowUnknown: true }),
        Instagram: Joi.string().required().label("Instagram").options({ allowUnknown: true }),
        WhatsApp: Joi.string().required().label("WhatsApp").options({ allowUnknown: true }),
        Telegram: Joi.string().required().label("Telegram").options({ allowUnknown: true }),
        Viber: Joi.string().required().label("Viber").options({ allowUnknown: true }),
        LinkedIn: Joi.string().required().label("LinkedIn").options({ allowUnknown: true }),
        workLocation: Joi.string().required().label("workLocation").options({ allowUnknown: true }),
        description: Joi.string().required().label("Description").options({ allowUnknown: true }),
        services: Joi.string().required().label("Services").options({ allowUnknown: true }),
        price: Joi.string().required().label("Price").options({ allowUnknown: true }),
        image: Joi.array().items(Joi.string().uri().label('ImageURL').options({ allowUnknown: true })).max(6).label('Images').options({ allowUnknown: true }),
        savedUsers: Joi.array().items(Joi.string()).label("savedUsers").options({ allowUnknown: true }),
        likes: Joi.string().required().label("likes").options({ allowUnknown: true }),
        rating: Joi.string().required().label("rating").options({ allowUnknown: true }),
        additionalImage: Joi.array().items(Joi.string().uri().label('addImageURL').options({ allowUnknown: true })).max(6).label('Additional Images').options({ allowUnknown: true })
    });
    return schema.validate(data);
};

module.exports = { User, validate };
