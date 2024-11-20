import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import handleError from "../middlewares/errors/handleError.js";

// Function for user signup
const signup = async (req, res) => {
  try {
    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return handleError(res, null, "User with this email already exists", 409); // 409 Conflict
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create the new user
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();
    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email, isAdmin:newUser.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "100h", // Token expires after 1 hour
    });

    // Set the token in the cookies
    res.cookie('token', token, {
      httpOnly: true,   // Token is not accessible via JavaScript
      secure: true,     // Token is sent only over HTTPS
      sameSite: 'Strict', // Helps prevent CSRF attacks
      expires: new Date(Date.now() + 3600000) // Token expires in 1 hour
  });
    return res.status(201).json({ token, payload: newUser });
  } catch (error) {
    handleError(res, error, "Error in registering user", 500); // 500 Internal Server Error
  }
};

// Function for user login
const login = async (req, res) => {
  try {
    // Check if the user exists with the provided email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return handleError(res, null, "Invalid email or password", 401); // 401 Unauthorized
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return handleError(res, null, "Invalid email or password", 401); // 401 Unauthorized
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email, isAdmin:user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "100h", // Token expires after 1 hour
    });

    // Set the token in the cookies
    res.cookie('token', token, {
      httpOnly: true,   // Token is not accessible via JavaScript
      secure: true,     // Token is sent only over HTTPS
      sameSite: 'Strict', // Helps prevent CSRF attacks
      expires: new Date(Date.now() + 3600000) // Token expires in 1 hour
  });

    return res.status(200).json({
      token,
      payload :{
        user
      }
    });
  } catch (error) {
    handleError(res, error, "Error in logging in user", 500); // 500 Internal Server Error
  }
};

// Function for user logout
const logout = (req, res) => {
  // Logout usually happens on the client side by removing the token from storage
  // On the server side, we simply respond with a success message
  return res.status(200).json({ message: "Logout successful" });
};


const authController = {
  signup,
  login,
  logout
};

export default authController;


