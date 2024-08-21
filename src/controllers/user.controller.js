const mongoose = require("mysql");

function isValidId(id) {
  const regex = /^[0-9a-fA-F]+$/;
    return regex.test(id);
}

class UserController {
  constructor(repository) {
    this.repository = repository;
  }
  getAllUser = async (req, res) => {
    try {
      const response = await this.repository.getAllUser();
      return res.status(200).json({ data: response });
    } catch (error) {
      console.log(error);
    }
  };
  searchUser = async (req, res) => {
    try {
      const specialityOrDomain = req.body.speciality_or_domain;
      const quarterOrCity = req.body.quarter_or_city;
      const country = req.body.country;
      const response = await this.repository.searchUser({
        speciality_or_domain: specialityOrDomain,
        quarter_or_city: quarterOrCity,
        country: country,
      });
      return res.status(200).json({ data: response });
    } catch (error) {
      console.log(error);
    }
  };
  getAllUserOrderByNote = async (req, res) => {
    try {
      const userId = req.params.id;
      const response = await this.repository.getAllUserOrderByNote(userId);
      return res.status(200).json({ data: response });
    } catch (error) {
      console.log(error);
    }
  };
  getOneUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      if (isValidId(userId)) {
        try {
          const response = await this.repository.getOneUserById(userId);
        return res.status(200).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  updateOneUser = async (req, res) => {
    try {
      const email = req.body.email;
      const userId = req.params.id;

      const fullname = req.body.fullname;
      const gender = req.body.gender;
      const date_of_birth = req.body.date_of_birth;
      const speciality = req.body.speciality;
      const domain = req.body.domain;
      const phone = req.body.phone;
      const quarter = req.body.quarter;
      const city = req.body.city;
      const country = req.body.country;

      if (isValidId(userId)) {
        try {
          const response = await this.repository.updateOneUser({
            user_id: userId,
            fullname: fullname,
            email: email,
            phone: phone,
            gender: gender,
            speciality: speciality,
            domain: domain,
            quarter: quarter,
            date_of_birth: date_of_birth,
            city: city,
            country: country,
          });
          return res.status(200).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };
  setAvatar = async (req, res) => {
    try {
      const userId = req.params.id;
      const file = req.files;
      if (isValidId(userId)) {
        try {
          const response = await this.repository.setAvatar({userId : userId, file : file});
          return res.status(200).json({ data: response });    
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  getAvatar = async (req, res) => {
    try {
      const userId = req.params.id;
      if (userId) {
        try {
          const response = await this.repository.getAvatar(userId);
          return res.status(200).json({ data: response });
        } catch (error) {
          console.log(error);
        }
       
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  getAllUserPublication = async (req, res) => {
    try {
      const userId = req.params.id;
      if (userId) {
        try {
          const response = await this.repository.getAllUserPublication(userId);
        return res.status(200).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  getAllPublication = async (req, res) => {
    try {
      const response = await this.repository.getAllPublication();
      return res.status(200).json({ data: response });
    } catch (error) {
      console.log(error);
    }
  };
  getAllPublicationPaginate = async (req, res) => {
    try {
      const response = await this.repository.getAllPublicationPaginate(
        req.params.number_page,
        req.params.number_size
      );
      return res.status(200).json({ data: response });
    } catch (error) {
      console.log(error);
    }
  };
  deleteUser = async (req, res) => {
    try {
      const userId = req.params.user;
      if (isValidId(userId)) {
        try {
          const response = await this.repository.deleteUser(userId);
        return res.status(200).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  editUserAbout = async (req, res) => {
    try {
      const userId = req.params.user;
      const about = req.body.about;
      if (isValidId(userId)) {
        try {
          const response = await this.repository.editUserAbout(userId, about);
        return res.status(200).json({ data: response });
        } catch (error) {
         console.log(error); 
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  editUserSkill = async (req, res) => {
    try {
      const userId = req.params.user;
      const skills = req.body.skills;
      if (isValidId(userId)) {
        try {
          const response = await this.repository.editUserSkill(userId, skills);
        return res.status(200).json({ data: response });
        } catch (error) {
          console.log(error);
        }
        
      } else {
        return res.status(401).json({ error: "Not authorized" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getStatisticUser = async (req, res) => {
    try {
      const etat = req.params.etat;
      if (isValidId(etat)) {
        const response = await this.repository.statistic(etat);
        return res.status(200).json({ data: response });
      } else {
        return res.status(401).json({
          error: "Not authorized getStatisticUser",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  getUserPagination = async(req,res) => {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
      const pub = await this.repository.getAllUser();

      // Calculer le nombre total de pages
      const totalPages = Math.ceil(pub.length / pageSize);

      if(pub.length < pageSize){
        res.json({
          data: pub,
          nextPage: 0,
          numberpage: 0,
          prevPage: 0,
          totalPages: totalPages // Ajouter le nombre total de pages ici
        });
      }
      else{
        const page = new PublicationRepository();
        const paginatedData = await page.paginateData(pub , pageNumber, pageSize);
        const nextPage = pageNumber * pageSize < pub.length ? pageNumber + 1 : null;
        const prevPage = pageNumber > 1 ? pageNumber - 1 : null;

        res.json({
          data: paginatedData,
          nextPage: nextPage,
          prevPage: prevPage,
          totalPages: totalPages // Ajouter le nombre total de pages ici
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  getAllDemographicData = async (req, res) => {
    try {
      const response = await this.repository.getDemographicData();
      return res.status(200).json({ data: response });
    } catch (error) {
      console.log(error);
    }
  };

}

module.exports = UserController;
