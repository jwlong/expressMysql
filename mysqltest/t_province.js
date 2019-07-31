/* jshint indent: 2 */

module.exports = function(sequelize, Sequelize) {
  return sequelize.define('t_province', {
    Province_Code: {
      type: Sequelize.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    Province_Name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    Country_Code: {
      type: Sequelize.STRING(3),
      allowNull: false,
      references: {
        model: 't_country',
        key: 'Country_Code'
      }
    },
    Create_On: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    Create_By: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    Update_On: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    Update_By: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    Active_Ind: {
      type: Sequelize.STRING(1),
      allowNull: false
    }
  }, {
    tableName: 't_province'
  });
};