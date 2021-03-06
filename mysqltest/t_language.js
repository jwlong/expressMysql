/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_language', {
    language_code: {
      type: Sequelize.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    language_name: {
      type: Sequelize.STRING(50),
      allowNull: false
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
    tableName: 't_language'
  });
};
