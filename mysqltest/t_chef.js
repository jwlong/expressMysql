/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_chef', {
    chef_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 't_user',
        key: 'user_id'
      }
    },
    short_desc: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    detail_desc: {
      type: DataTypes.STRING(4000),
      allowNull: true
    },
    verified_chef_ind: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    food_safety_certified_ind: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    payment_protection_ind: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    verified_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    create_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    create_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    update_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    active_ind: {
      type: DataTypes.STRING(1),
      allowNull: false
    }
  }, {
    tableName: 't_chef'
  });
};
