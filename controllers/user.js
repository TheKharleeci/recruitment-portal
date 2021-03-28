const { addUser, getUserByEmail, addUserApplication, getAllUsers, getUserApplicationByEmail, updateUserPassword, getUserById } = require("../services");
const { hashPassword, comparePassword, addDataToToken, verifyToken } = require("../utils");
const nodemailer = require("nodemailer");
require('dotenv').config();
const addNewUser = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    const newUser = await addUser({ ...req.body, password: hashedPassword });
    res
      .status(201)
      .json({
        status: "success",
        message: "User registered successfully",
        data: newUser,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const addNewApplication = async (req, res) => {
  try {
    const userID = req.user.id;
    const newApplication= await addUserApplication({ ...req.body, userId: userID});
    res
      .status(201)
      .json({
        status: "success",
        message: "Application successful",
        data: newApplication,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};
// const addAdminUser = async (req, res) => {
//   try {
//     const hashedPassword = hashPassword(req.body.password);
//     const newUser = await addAdmin({ ...req.body, password: hashedPassword });
//     res
//       .status(201)
//       .json({
//         status: "success",
//         message: "Admin registered successfully",
//         data: newUser,
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ status: "fail", message: "Something went wrong." });
//   }
// };

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user && comparePassword(password, user.password)) {
      delete user.password;
      const token = addDataToToken({
        email,
        isAdmin: user.is_admin,
        id: user.id,
      });
      return res
        .status(200)
        .json({
          status: "success",
          message: "User logged in successfully",
          data: { token, user },
        });
    }
    return res
      .status(401)
      .json({ status: "fail", message: "Invalid login details" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    
    res.status(200).json({
      status: 'success',
      message: 'Users fetched successfully.',
      data: users,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong ',
    });
  }
};

const singleUser = async (req, res) => {
  try {
    const { email } = req.user;
    const singleUser = await getUserApplicationByEmail(email);
    res.status(200).json({
      status: 'success',
      message: 'Users fetched successfully.',
      data: singleUser ,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong ',
    });
  }
};

const resetPassword = async (req, res) => {
  const password = process.env.PASS_WORD;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mzdoopey10@gmail.com", // generated ethereal user
      pass: password, // generated ethereal password
    },
  });
  try {
    const { email } = req.body;
    const userer = await getUserByEmail(email);
    const userToken = addDataToToken({
      email,
      id: userer.id,
    });
    const mailOptions = await transporter.sendMail({
      from: '"modupe " <mzdoopey10@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      text: `<a href="http://localhost:8080/resetpassword/${userToken}">Reset password</a>`,
      html: `<a href="http://localhost:8080/resetpassword/${userToken}">Reset password</a>` // html body
    });
    res.status(200).json({
      status: 'success',
      message: 'password reset link sent successfully.',
    });
    console.log("Message sent: %s", mailOptions .messageId);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong ',
    });
  }
}

const updatePassword = async (req, res) => {
  // const { token } = req.params;
  try {
    const { err, data } = verifyToken(req.params.token);
    console.log(req.body)
    console.log(req.params.token)
    if (err) {
      console.log(err)
      return res
        .status(401)
        .json({ status: 'fail', message: 'Invalid token' });
    }
    const userss = data;
    console.log(userss)
    console.log(req.params.token)
    const hashedPassword = hashPassword(req.body.password)
    const updatedUser = await updateUserPassword({ ...req.body, password: hashedPassword}, userss.email);
    console.log(userss.email)
    res
      .status(201)
      .json({ status: 'success', message: 'Password updated successfully.', data: updatedUser });

} catch (error) {
    console.log(error)
    console.log(data)
    console.log(req.params)
  res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
}
};


module.exports = {
  addNewUser,
  loginUser,
  addNewApplication,
  allUsers,
  singleUser,
  resetPassword,
  updatePassword,
};
