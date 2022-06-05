module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      url: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING(2048),
      },
      title: {
        type: DataTypes.STRING(102),
      },
      desc: {
        type: DataTypes.STRING(202),
      },
      author: {
        type: DataTypes.STRING(102),
      },
      favorite: {
        type: DataTypes.BOOLEAN,
        default: 0,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsTo(db.Directory);
  };
  return Post;
};
