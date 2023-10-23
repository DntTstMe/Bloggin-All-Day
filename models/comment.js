const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comment_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    blogPost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogPost",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "comment",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = Comment;
