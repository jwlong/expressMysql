/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_district', {
    district_code: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    district_name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    city_code: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 't_city',
        key: 'city_code'
      }
    },
    province_code: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    country_code: {
      type: DataTypes.STRING(3),
      allowNull: true
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
    tableName: 't_district'
  });
};
