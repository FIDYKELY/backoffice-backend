const { isValidObjectId } = require("mysql");

class ResetPassword {
  constructor(repository) {
    this.repository = repository;
  }
  sendResetPasswordCode = async (req, res) => {
    try {
      const email = req.body.email;
      const response = await this.repository.sendResetPasswordCode(email);
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  checkResetPasswordCode = async (req, res) => {
    try {
      const email = req.body.email;
      const code = req.body.reset_code;
      const check = await this.repository.checkResetPasswordCode(email, code);
      return res.status(200).json({ data: check });
    } catch (error) {
      if (error.name === "ParamInvalidError") {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: error.message });
      }
    }
  };
  resetPassword = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const response = await this.repository.resetPassword(email, password);
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  changePassword = async (req, res) => {
    

    try {
      const user_id = req.params.id;
      const email = req.body.email;
      const old_password = req.body.password;
      const new_password = req.body.new_password;

      if (isValidObjectId(user_id)) {
        const response = await this.repository.changePassword({
          email: email,
          password: old_password,
          new_password: new_password,
        });
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      if (error.name === "ParamInvalidError") {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: error.message });
      }
    }
  };
}

module.exports = ResetPassword;
