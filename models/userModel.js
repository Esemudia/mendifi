const mongoose = require("mongoose");
const crypto = require("crypto");

// User Schema
const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true, required: true },
  otp: { type: String, required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, index: { expires: '5m' } }, // OTP expires in 5 minutes
});

// Generate a 6-digit OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// User Model
const User = mongoose.model("User", UserSchema);

class UserModel {
  static async createUser(phoneNumber) {
    const otp = generateOTP();
    let user = await User.findOne({ phoneNumber });
    if (!user) {
      user = new User({ phoneNumber, otp });
    } else {
      user.otp = otp;
      user.verified = false;
    }
    await user.save();
    console.log(`Generated OTP for ${phoneNumber}: ${otp}`);
    return otp;
  }

  static async verifyUser(phoneNumber, otp) {
    const user = await User.findOne({ phoneNumber });
    if (!user) return "User not found!";
    if (user.otp !== otp) return "Invalid OTP!";
    user.verified = true;
    await user.save();
    return `Phone number ${phoneNumber} successfully verified!`;
  }
}

module.exports = UserModel;
