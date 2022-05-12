const {Car} = require('../models')

module.exports = class {
   static async createCar (req, res, next) {
      try {
          const mobil = await Car.create({
              name: req.body.name,
              type: req.body.type,
              available:true,
              status:true,
              createdBy:req.userLogin.username
          })
          res.status(200).send({
              status: 200,
              message: 'Data mobil berhasil ditambah!',
              data: mobil
          })
      } catch (error) {
          console.log(error);
          res.status(500).send(error)
      }
  }
    static async getAllCar(req, res, next) {
       
        try {
         const mobil = await Car.findAll({
            where: {...req.query}
        })
         res.status(200).send({
             status: 200,
             message: 'Berhasil',
             data: mobil
         })
     } catch (error) {
         console.log(error);
         res.status(500).send(error)
     }
    }

    static async getCar(req, res, next) {
        try {
         const mobil = await Car.findAll({
            where: {available: true, status:true} 
        })
         res.status(200).send({
             status: 200,
             message: 'Berhasil',
             data: mobil
         })
     } catch (error) {
         console.log(error);
         res.status(500).send(error)
     }
    }

    static async getbyIdCar(req, res, next) {
      try {
       const mobil = await Car.findOne({
          where: {id: req.params.id, status:true, available:true} 
      })
       res.status(200).send({
           status: 200,
           message: 'Berhasil',
           data: mobil
       })
   } catch (error) {
       console.log(error);
       res.status(500).send(error)
   }
  }

    static async updateCar(req, res, next) {
       try {
         const mobil = await Car.update(
            {
               ...req.body,
               updatedBy:req.userLogin.username
            },{where: {id: req.params.id, status:true},returning: true})
         res.status(200).send({
            status: 200,
            message: 'Berhasil',
            data: mobil
         })
       } catch (error) {
         console.log(error);
         res.status(500).send(error)
      }
    }
    static async deleteCar(req, res, next) {
        try {
         const mobil = await Car.update({
            ...req.body,
            status:false,
            deletedBy:req.userLogin.username
         },
            {where: {id: req.params.id},returning: true})
         res.status(200).send({
            status: 200,
            message: 'Data Berhasil Di hapus',
            data: mobil
         })
       } catch (error) {
         console.log(error);
         res.status(500).send(error)
      }
        }

}