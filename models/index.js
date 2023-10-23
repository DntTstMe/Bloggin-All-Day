// Imports
const { User, BlogPost, Comment } = require("./models");

const associations = [
  { source: User, target: BlogPost, foreignKey: "user_id" },
  { source: User, target: Comment, foreignKey: "user_id" },
  { source: Comment, target: BlogPost, foreignKey: "blogPost_id" },
];

associations.forEach(({ source, target, foreignKey, onDelete }) => {
  source.hasMany(target, { foreignKey, onDelete: "CASCADE" });
  target.belongsTo(source, { foreignKey });
});

// Export
module.exports = { User, BlogPost, Comment };
