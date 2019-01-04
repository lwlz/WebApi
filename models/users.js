let mongoose = require('mongoose');

let Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({

      name: {
            type: String,
            required: 'nom obligatoire'
      },
      firstname: {

            type: String, required: 'firstname oblig'
      },
      email: { type: String, required: 'firstname oblig' },
      admin : { type : Boolean},
      created :{ type : Date , default : Date.now},
      // status :{ 
      //       type :  
      //       type : string ,
      //        enum :['firstname oblig']}






}));