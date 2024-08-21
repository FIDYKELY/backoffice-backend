function isValidId(id) {
  const regex = /^[0-9a-fA-F]+$/;
    return regex.test(id);
}

class CareerController {
  constructor(repository) {
    this.repository = repository;
  }
  getAllLevel = async (req, res) => {
    try {
      const user_id = req.params.id;

      if (isValidId(user_id)) {
        try {
          const response = await this.repository.getAllLevel(user_id);
        return res.status(200).json({ data: response });  
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  addLevel = async (req, res) => {
    try {
      const user_id = req.params.id;
      const start_date = req.body.start_date;
      const end_date = req.body.end_date;
      const post = req.body.post;
      const descriptions = req.body.descriptions;
      const company = req.body.company;

      if (isValidId(user_id)) {
        try {
          const response = await this.repository.addLevel({
            user_id: user_id,
            start_date: start_date,
            end_date: end_date,
            post: post,
            descriptions: descriptions,
            company: company,
          });
  
          return res.status(201).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  updateLevel = async (req, res) => {
    try {
      const user_id = req.params.id;
      const career_id = req.params.career;
      const start_date = req.body.start_date;
      const end_date = req.body.end_date;
      const post = req.body.post;
      const descriptions = req.body.descriptions;
      const company = req.body.company;
      
      if (isValidId(user_id) && isValidId(career_id)) {
        try {
          const response = await this.repository.updateLevel({
            career_id: career_id,
            start_date: start_date,
            end_date: end_date,
            post: post,
            descriptions: descriptions,
            company: company,
          });
          return res.status(200).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  deleteLevel = async (req, res) => {
    try {
      const user_id = req.params.id;
      const career_id = req.params.career;
      if (isValidId(user_id) && isValidId(career_id)) {
        try {
          const response = await this.repository.deleteLevel(career_id);
          return res.status(200).json({ data: response });
        } catch (error) {
          console.log(error); 
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
}

module.exports = CareerController;
