const UserModel = require("../models/userModel");

class AuthController {
  static async signup({ phoneNumber }) {
    const otp = await UserModel.createUser(phoneNumber);
    return {
      message: `OTP has been sent to ${phoneNumber}`,
      otp,
    };
  }

  static async verifyOTP({ phoneNumber, otp }) {
    return await UserModel.verifyUser(phoneNumber, otp);
  }
}

module.exports = AuthController;
