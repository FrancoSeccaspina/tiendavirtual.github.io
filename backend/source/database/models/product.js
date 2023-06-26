let model = function(sequelize, DataTypes){

    let alias = 'product'
    let cols = {

        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },   
        
        name:{
            type:DataTypes.STRING
        },
        
        description:{
            type:DataTypes.STRING
        },
        
        price:{
            type:DataTypes.INTEGER
        },
        
        categoryId:{
            type:DataTypes.INTEGER
        },
        
        inOffer:{
            type:DataTypes.BOOLEAN,
            defaultValue:0
        },

        image:{
            type:DataTypes.STRING,
            defaultValue: 'default.png'
        },
    }
     
    let config = {
        tableName: 'products',
        timestamps: false
    }
        
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){

        Product.belongsTo(models.category,{

            as:'category',
            foreingKey: 'categoryId'
        })
    }    
    return Product
}
module.exports = model