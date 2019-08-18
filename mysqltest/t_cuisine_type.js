/* jshint indent: 2 */

module.exports = function(sequelize, Sequelize) {
  return sequelize.define('t_cuisine_type', {
    cuisine_type_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    cuisine_type_name: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(4000),
      allowNull: false
    },
    orgin_country: {
      type: Sequelize.STRING(3),
      allowNull: true
    },
    create_on: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    create_by: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    update_on: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_by: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    active_ind: {
      type: Sequelize.STRING(1),
      allowNull: false
    }
  }, {
    tableName: 't_cuisine_type'
  });
};