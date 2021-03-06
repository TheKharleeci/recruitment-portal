const { authenticate, adminAccessValidator, isAuth } = require("./auth");
const { validateSignup, validateLogin, checkIfUserExists, validateApplication, authenticateEmail, checkForUserProfile, validatePasswordUpdate } = require("./user");
const { validateQuestions, checkIfQuestionExists } = require("./question");
const { checkIfAdminExists,
  validateAdminLogin,
  validateAdminSignup, validateAdminUpdate, checkIfApplicantExists, checkTimerIsSet } = require("./admin");
const { cloudinaryUpload, cloudinaryAdminUpload } = require('./upload');

module.exports = {
  authenticate,
  validateSignup,
  validateLogin,
  checkIfUserExists,
  validateQuestions,
  adminAccessValidator,
  checkIfQuestionExists,
  validateApplication,
  authenticateEmail,
  checkForUserProfile,
  checkIfAdminExists,
  validateAdminLogin,
  validateAdminSignup,
  isAuth,
  cloudinaryUpload,
  validateAdminUpdate,
  checkIfApplicantExists,
  validatePasswordUpdate,
  checkTimerIsSet,
  cloudinaryAdminUpload,
};
