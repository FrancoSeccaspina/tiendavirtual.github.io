const model = function(sequelize, DataTypes){

    let alias = 'user'
    let cols = {

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        fullName:{
            type: DataTypes.STRING
        },
        
        user:{
            type: DataTypes.STRING
        },

        email:{
            type: DataTypes.STRING
        },
        
        password:{
            type: DataTypes.STRING
        },
        
        perfil:{
            type: DataTypes.STRING,
            defaultValue: 0
        },
        
        birthDay:{
            type: DataTypes.DATEONLY
        },
        
        image:{
            type: DataTypes.STRING,
            defaultValue: 'default.png'
        },
    }
        
    let config = {
        tableName:'users',
        timestamps: false
    }
        
    const user = sequelize.define(alias, cols, config);
        
    return user    
}
module.exports = model