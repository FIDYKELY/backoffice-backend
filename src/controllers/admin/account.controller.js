const { isValidObjectId } = require("mysql");

class ManageAccountController {
  constructor(repository) {
    this.repository = repository;
  }
  getAllUser = async (req, res) => {
    try {
      if (isValidObjectId(req.params.admin)) {
        const users = await this.repository.getAllUser();
        return res.status(200).json({ data: users });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  getAllAdmin = async (req, res) => {
    try {
      if (req.params.admin) {
        const admins = await this.repository.getAllAdmin();
        return res.status(200).json({ data: admins });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  deleteUser = async (req, res) => {
    try {
      const userId = req.body.user;
      const adminId = req.params.admin;
      if (isValidObjectId(userId) && isValidObjectId(adminId)) {
        const delete_user = await this.repository.deleteUser(userId, adminId);
        return delete_user;
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  deleteAccount = async (req, res) => {
    try {
      const accountId = req.body.account;
      const admin = req.params.admin;

      if (isValidObjectId(accountId) && isValidObjectId(admin)) {
        const delete_account = await this.repository.deleteAccount(
          accountId,
          admin
        );
        return res.status(200).json({ data: delete_account });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  getOneAccount = async (req, res) => {
    try {
      const adminId = req.params.admin;
      const account = req.params.account;

      if (isValidObjectId(adminId)) {
        const account_admin = await this.repository.getOneAccount(account);
        return res.status(200).json({ data: account_admin });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  updateAccount = async (req, res) => {
    try {
      const adminId = req.params.admin;
      const account = req.params.account;

      if (isValidObjectId(adminId)) {
        const update_account = await this.repository.updateAccount(
          {
            id: account,
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
          },
          adminId
        );
        return res.status(200).json({ data: update_account });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  updatePassword = async (req, res) => {
    try {
      const adminId = req.params.admin;
      const account = req.params.account;
      const passwd = req.body.password;

      if (isValidObjectId(adminId)) {
        const update_passwd = await this.repository.updatePassword(
          account,
          passwd,
          adminId
        );
        return res.status(200).json({ data: update_passwd });
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

module.exports = ManageAccountController;
