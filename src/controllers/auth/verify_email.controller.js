class VerifyEmailController {
  constructor(repository) {
    this.repository = repository;
  }
  sendEmailVerificationCode = async (req, res) => {
    const email = req.body.email;
    console.log(email);
    try {
      
      const response = await this.repository.sendEmailVerificationCode(email);
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  checkEmailVerificationCode = async (req, res) => {
    const email = req.body.email;
      const code = req.body.verification_code;
    
    try {
      
      const response = await this.repository.checkEmailVerificationCode(
        email,
        code
      );
      return res.status(200).json({ data: response });
    } catch (error) {
      if (error.name === "ParamInvalidError") {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = VerifyEmailController;
