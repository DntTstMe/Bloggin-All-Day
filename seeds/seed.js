// Imports
const sequelize = require("../config/connection");
const { User, BlogPost, Comment } = require("../models");
const userData = require("./userData.json");
const blogPostData = require("./blogPostData.json");
const commentData = require("./commentData.json");

// Function to seed database with user data
const seedUsers = async () => {
  await User.sync({ force: true });
  await User.bulkCreate(userData, { individualHooks: true, returning: true });
};

// Function to seed database with blog post data
const seedBlogPosts = async () => {
  await BlogPost.sync({ force: true });

  const users = await User.findAll();

  for (const blogPost of blogPostData) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await BlogPost.create({ ...blogPost, user_id: randomUser.id });
  }
};

// Function to seed database with comment data
const seedComments = async () => {
  await Comment.sync({ force: true });
  await Comment.bulkCreate(commentData);
};

// Seed the entire database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedBlogPosts();
  await seedComments();

  process.exit(0);
};

// Function call to seed the database
seedDatabase();
