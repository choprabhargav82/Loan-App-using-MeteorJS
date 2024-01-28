import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Users = new Mongo.Collection('users');

Users.schema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  // Other user fields if needed
});

Users.attachSchema(Users.schema);
