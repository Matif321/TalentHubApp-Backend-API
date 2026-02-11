// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";
// import { verifyEmail } from "../emailVerify/verifyEmail.js";

// /* =====================================
//    SIGN UP
// ===================================== */
// export const signUp = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     // 1️⃣ Validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     // 2️⃣ Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }

//     // 3️⃣ Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 4️⃣ Generate verification token (valid for 10 minutes)
//     const verificationToken = jwt.sign(
//       { email },
//       process.env.JWT_SECRET,
//       { expiresIn: "10m" }
//     );

//     // 5️⃣ Create user
//     const user = await User.create({
//       email,
//       password: hashedPassword,
//       role: role || "model",
//       verificationToken,
//       isVerified: false,
//     });

//     // 6️⃣ Send verification email
//     await verifyEmail(verificationToken, email);

//     // 7️⃣ Response
//     return res.status(201).json({
//       success: true,
//       message: "Signup successful. Please verify your email.",
//       // verificationToken // optional for testing only
//     });

//   } catch (error) {
//     console.error("Signup Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


// /* =====================================
//    EMAIL VERIFICATION
// ===================================== */
// export const verifyUserEmail = async (req, res) => {
//   try {
//     const { token } = req.params;

//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid token",
//       });
//     }

//     // 1️⃣ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 2️⃣ Find user using email + verificationToken
//     const user = await User.findOne({
//       email: decoded.email,
//       verificationToken: token,
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired token",
//       });
//     }

//     // 3️⃣ Update user
//     user.isVerified = true;
//     user.verificationToken = null;
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Email verified successfully",
//     });

//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: "Token expired or invalid",
//     });
//   }
// };


// /* =====================================
//    LOGIN
// ===================================== */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1️⃣ Validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // 2️⃣ Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // 3️⃣ Check email verified
//     if (!user.isVerified) {
//       return res.status(401).json({
//         success: false,
//         message: "Please verify your email first",
//       });
//     }

//     // 4️⃣ Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // 5️⃣ Generate login JWT (valid for 7 days)
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//     });

//   } catch (error) {
//     console.error("Login Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


// export const verify = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer")) {
//       return res.status(400).json({
//         success: false,
//         message: "Authorization token is missing or invalid"
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       if (error.name === "TokenExpiredError") {
//         return res.status(400).json({
//           success: false,
//           message: "Registration token has expired"
//         });
//       }
//       return res.status(400).json({
//         success: false,
//         message: "Token verification failed"
//       });
//     }

//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     user.token = null;
//     user.verified = true;
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Email verified successfully"
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };





import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { verifyEmail } from "../emailVerify/verifyEmail.js";

/* =====================================
   SIGN UP
===================================== */
export const signUp = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Generate verification token (valid for 10 minutes)
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // 5️⃣ Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      role: role || "model",
      verificationToken,
      isVerified: false,
    });

    // 6️⃣ Send verification email
    await verifyEmail(verificationToken, email);

    // 7️⃣ Response
    return res.status(201).json({
      success: true,
      message: "Signup successful. Please verify your email.",
      // verificationToken // optional for testing only
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/* =====================================
   EMAIL VERIFICATION
===================================== */
export const verify = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    // 1️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2️⃣ Find user using email + verificationToken
    const user = await User.findOne({
      email: decoded.email,
      verificationToken: token,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 3️⃣ Update user
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Token expired or invalid",
    });
  }
};


/* =====================================
   LOGIN
===================================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Check email verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // 4️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 5️⃣ Generate login JWT (valid for 7 days)
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};