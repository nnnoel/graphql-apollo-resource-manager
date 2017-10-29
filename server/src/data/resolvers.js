import { GraphQLScalarType } from 'graphql';
import jwt from 'jsonwebtoken';
import Program from './models/Program';
import Admin from './models/Admin';

export default {
  Query: {
    test: () => 'Success',

    programs: async (_, { input, first, skip }) => {
      const searchText = input.searchText
        ? { $text: { $search: input.searchText } }
        : {};
      const filters = input.filters || {};
      const find = { ...filters, ...searchText };
      return await Program.find(find)
        .skip(skip)
        .limit(first)
        .exec();
    },
    program: async (_, { id }) => {
      return await Program.findById(id).exec();
    },
    _programsMeta: async (_, { input }) => {
      const searchText = input.searchText
        ? { $text: { $search: input.searchText } }
        : {};
      const filters = input.filters || {};
      const find = { ...filters, ...searchText };
      const totalCount = await Program.count(find).exec();
      return { totalCount };
    }
  },
  Mutation: {
    createProgram: async (_, { input }, { token }) => {
      let admin;
      try {
        const payload = jwt.verify(token, 'tokenSig');
        admin = payload.admin;
      } catch (e) {
        throw e;
      }
      let adminIsAuthorized;
      try {
        const { _id: id } = admin;
        adminIsAuthorized = await Admin.findById(id).exec();
      } catch (e) {
        adminIsAuthorized = null;
      }

      if (adminIsAuthorized) {
        try {
          const program = await Program.create(input);
          return program;
        } catch (e) {
          throw new Error('There was a problem creating Program');
        }
      } else {
        throw new Error('Unauthorized action.');
      }
    },
    updateProgram: async (_, { input }, { token }) => {
      let admin;
      try {
        const payload = jwt.verify(token, 'tokenSig');
        admin = payload.admin;
      } catch (e) {
        throw e;
      }
      let adminIsAuthorized;
      try {
        const { _id: id } = admin;
        adminIsAuthorized = await Admin.findById(id).exec();
      } catch (e) {
        adminIsAuthorized = null;
      }

      if (adminIsAuthorized) {
        const { id, ...rest } = input;
        try {
          const program = await Program.findByIdAndUpdate(id, rest, {
            new: true
          }).exec();
          return program;
        } catch (e) {
          throw new Error('There was a problem updating Program');
        }
      } else {
        throw new Error('Unauthorized action.');
      }
    },
    deleteProgram: async (_, { id }, { token }) => {
      let admin;
      try {
        const payload = jwt.verify(token, 'tokenSig');
        admin = payload.admin;
      } catch (e) {
        throw e;
      }
      let adminIsAuthorized;
      try {
        const { _id: id } = admin;
        adminIsAuthorized = await Admin.findById(id).exec();
      } catch (e) {
        adminIsAuthorized = null;
      }

      if (adminIsAuthorized) {
        const { id, ...rest } = input;
        try {
          const program = await Program.findByIdAndRemove(id).exec();
          return program;
        } catch (e) {
          throw new Error('There was a problem deleting Program');
        }
      } else {
        throw new Error('Unauthorized action.');
      }
    },
    signInAdmin: async (_, { username, password }) => {
      const admin = await Admin.findOne({ username }).exec();

      if (!admin) {
        return new Error('Admin not found');
      }

      if (admin.password === password) {
        const token = jwt.sign({ admin }, 'tokenSig', {
          expiresIn: 86400
        });
        return { token, isAuthenticated: true };
      } else {
        return new Error('Admin not found');
      }
    }
  },
  // Custom Scaler types
  Datetime: new GraphQLScalarType({
    name: 'Datetime',
    description: 'Datetime custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      return ast.value;
    }
  })
};
