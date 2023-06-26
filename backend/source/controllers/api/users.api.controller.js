const db = require('../../database/models');
const User = db.user;

const usersAPIController = {

    'list': (req,res) => {
        User.findAll({

            attributres:{
                exclude: ['password', 'perfil', 'birthDay']
            }
        }).then(users => {
            
            let respuesta = {

                meta:{
                    status:200,
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            };
            res.json(respuesta);
        });
    },
            
    'detail': (req,res) => {

        User.findByPk(req.params.id).then(User => {

            let respuesta = {

                meta:{
                    status:200,
                    detail: req.url
                },
              
                data:{
                    id:user.id,
                    fullname:user.fullName,
                    user:user.user,
                    email:user.email,
                    detail:`/images/avatars/${user.image}`
                }
            };
            res.json(respuesta);    
        });
    },
        
    'last': (req,res) => {

        User.findOne({ order:[['id', 'DESC']]}).then(User => {

            let respuesta = {

                meta:{
                    status:200,
                    url: 'api/users/last'
                },
                data: User
            };
            res.json(respuesta);    
        });
    },  
};
module.exports = usersAPIController;