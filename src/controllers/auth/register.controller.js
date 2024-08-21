class RegisterController {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Ajouter un nouveau utilisateur
   *
   * @param {Request} req
   * @param {Response} res
   *
   * @return Object le nouveau utilisateur ou une erreur et donnee vide
   */
  register = async (req, res) => {
    const { first_name, last_name, email, phone, password, city, country, gender, date_of_birth, address } = req.body;

    try {
      if (
        first_name &&
        last_name &&
        email &&
        phone &&
        password &&
        city &&
        country &&
        gender &&
        date_of_birth
      ) {
        const register_response = await this.repository.register({
          first_name,
          last_name,
          fullname: `${first_name} ${last_name}`,
          email,
          phone,
          password,
          city,
          country,
          gender,
          date_of_birth,
          address,
        });
        return res.status(201).json(register_response);
      } else {
        return res.status(400).json({ error: "Field format invalid" });
      }
    } catch (error) {
      if (error.name === "AlreadyInUseError") {
        return res.status(409).json({ error: error.message });
      } else {
        console.error(error);
        return res.status(500).json({ error: "Internal server error", code: 500 });
      }
    }
  };
}

module.exports = RegisterController;
