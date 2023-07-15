const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nbduy4606:w20ZPN7I3sbs0MCl@quanlyduan.rvi6loa.mongodb.net/GoCoffee?retryWrites=true&w=majority')
        .catch((err) =>{
            console.log("Loi ket noi CSDL");
            console.log(err);
        });

module.exports= {mongoose}