// Imports
const User = require("./user");
const BlogPost = require("./blogPost");
const Comment = require("./comment");

// Define associations in an array
const associations = [
  { source: User, target: BlogPost, foreignKey: "user_id" },
  { source: User, target: Comment, foreignKey: "user_id" },
  { source: Comment, target: BlogPost, foreignKey: "blogPost_id" },
];

// Set up associations using a loop
associations.forEach(({ source, target, foreignKey, onDelete }) => {
  source.hasMany(target, { foreignKey, onDelete: "CASCADE" });
  target.belongsTo(source, { foreignKey });
});

// Export
module.exports = { User, BlogPost, Comment };

