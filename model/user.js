const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."],
        trim: true,
        maxLength: 32
    },
    lastName: {
        type: String,
        required: [true, "Last name is required."],
        trim: true,
        maxLength: 32
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        unique: [true, "Email already exist"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Provide a valid email address."]
    },
    password: {
        type: String,
        required: [true, "Password if required."],
        minLength: [8, "Password must be at least 8 characters."]
    },

    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true})


// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

module.exports = mongoose.model("Users", userSchema);