module.exports.validateRegisterInput = (
  userName,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (userName.trim() === "") errors.userName = "Username must not be empty";

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    regex.test(email) ? null : (errors.email = "Email format not supported");
  }

  if (password.trim() === "") {
    errors.password = "Password must be defined";
  } else if (password !== confirmPassword) {
    errors.password = "Passwords must match";
  }

  if (confirmPassword.trim() === "") {
    errors.confirmPassword = "Password must be defined";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (userName, password) => {
  const errors = {};
  if (userName.trim() === "") errors.userName = "Username must not be empty";

  if (userName.trim() === "") errors.password = "Password must not be empty";

  return {
    valid: Object.keys(errors).length < 1,
    errors,
  };
};
