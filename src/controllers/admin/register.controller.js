// const { isValidObjectId } = require("mysql");

class AdminRegisterController {
  constructor(repository) {
    this.repository = repository;
  }
  register = async (req, res) => {
    try {
      const fullname = req.body.fullname;
      const email = req.body.email;
      const phone = req.body.phone;
      const password = req.body.password;
      const userId = req.body.user;

        if (fullname.length > 0 && email.length > 0 && password.length > 0) {
          const register = await this.repository.register(
            {
              fullname: fullname,
              email: email,
              phone: phone,
              password: password,
            },
            userId
          );
          return res.status(201).json(register);
        } else {
          return res
            .status(400)
            .json({ error: "Field format invalid", code: 400 });
        }
      
    } catch (error) {
      if (error.name === "AlreadyInUseError") {
        return res.json({ error: "Email already in use", code: 409 });
      } else {
        return res.status(500).json(console.log(error), { error: "Internal server error", code: 500 });;
        
      }
    }
  };
}

module.exports = AdminRegisterController;
