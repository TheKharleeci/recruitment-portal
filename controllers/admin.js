const { addAdmin,
    getAdminByEmail, updateAdminDetails, updateUserbyAdmin, getUserByEmail, fetchAllApplicants, addTimer, fetchAllthatApplied, fetchAllApproved } = require("../services");
const { hashPassword, comparePassword, addDataToToken, verifyToken } = require("../utils");
const addNewAdmin = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    const newAdmin = await addAdmin({ ...req.body, password: hashedPassword });
    res
      .status(201)
      .json({
        status: "success",
        message: "Admin registered successfully",
        data: newAdmin,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await getAdminByEmail(email);
    if (admin && comparePassword(password, admin.password)) {
      delete admin.password;
      const token = addDataToToken({
        email,
        isAdmin: admin.is_admin,
        id: admin.id,
      });
      return res
        .status(200)
        .json({
          status: "success",
          message: "Admin logged in successfully",
          data: { token, admin },
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

const updateExistingAdmin = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const { err, data } = verifyToken(token);
    console.log(req.headers)
    if (err) {
      console.log(err);
      return res.status(401).json({ status: "fail", message: "Invalid token" });
    }
    const admin = data;
    const updatedAdmin = await updateAdminDetails (req.body, admin.email);
    res
      .status(201)
      .json({ status: 'success', message: 'Admin updated successfully.', data: updatedAdmin });
} catch (error) {
    console.log(error)
  res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
}
};

const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const userToBeUpdated = await getUserByEmail(email)
    const userToBeUpdated = await updateUserbyAdmin (req.body, id );
    res
      .status(201)
      .json({ status: 'success', message: 'User updated successfully.', data: userToBeUpdated });
    next();
} catch (error) {
    console.log(error)
  res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
}
};

const getAllApplicants = async (req, res) => {
  try {
    
    const applicants = await fetchAllApplicants();
    res.status(200).json({ status: 'success', message: 'applicants fetched successfully', data: applicants });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const getAllThatApplied = async (req, res) => {
  try {
    
    const allApplicants = await fetchAllthatApplied();
    res.status(200).json({ status: 'success', message: 'applicants fetched successfully', data: allApplicants });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};

const getAllApproved = async (req, res) => {
  try {
    
    const allApplicants = await fetchAllApproved();
    res.status(200).json({ status: 'success', message: 'approved applicants fetched successfully', data: allApplicants });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 'fail', message: 'Something went wrong.' });
  }
};
const addAssessmentTimer = async (req, res) => {
  console.log(req.body.time)
  const { time } = req.body
  try {
    const timer = await addTimer(time);
    res
      .status(201)
      .json({
        status: "success",
        message: "Assessment Timer added successfully ",
        data: timer,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err){throw err};
    res.clearCookie("token");
    return res.status(200).json({
      status: "success",
      message: "Admin logged out in successfully",
    })
  });
};


module.exports = {
    loginAdmin,
    addNewAdmin,
    updateExistingAdmin,
    updateUserStatus,
    getAllApplicants,
    addAssessmentTimer,
    logoutAdmin,
    getAllThatApplied,
    getAllApproved
}