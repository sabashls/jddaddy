// const User = require("../models/user");
import User from "../models/user.js";

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
  },

  Mutation: {
    addUser: async (_, { name, email }) => {
      const user = new User({ name, email });
      await user.save();
      return user;
    },
    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return "User Deleted";
    },
  },
};

export default resolvers;
