const {
  addUser,
  getUserApplicationByEmail,
  getUserById,
  getUserByEmail,
  updateUserPassword,
  addUserApplication,
  getApplicationByUser,
  getAllUsers,
  cloudinaryConfig,
  updateUserByApplication,
  getTimer,
  inputTestScore
  } = require("./user");

const { addAdmin,
  getAdminByEmail, updateAdminDetails, updateUserbyAdmin, fetchAllApplicants, addTimer, fetchAllthatApplied } = require("./admin")

const { addQuestion, getQuestionByTitle, getQuestions, getQuestionsByID } = require("./question");

module.exports = {
  addUser,
  getUserApplicationByEmail,
  getUserById,
  updateUserPassword,
  getUserByEmail,
  addQuestion,
  getQuestionByTitle,
  addUserApplication,
  getApplicationByUser,
  getAllUsers,
  addAdmin,
  getAdminByEmail,
  getQuestions,
  cloudinaryConfig,
  updateAdminDetails,
  updateUserByApplication,
  updateUserbyAdmin,
  fetchAllApplicants,
  addTimer,
  getTimer,
  getQuestionsByID,
  inputTestScore,
  fetchAllthatApplied,
};
