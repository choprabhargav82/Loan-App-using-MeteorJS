import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  createRoles() {
    // Create roles if not exist
    ['admin', 'borrower', 'lender'].forEach((role) => {
      if (!Roles.roleExists(role)) {
        Roles.createRole(role);
      }
    });

    // Create an admin user if none exists
    if (!Meteor.users.findOne({ roles: 'admin' })) {
      const adminUserId = Accounts.createUser({
        email: 'admin@example.com',
        password: 'adminpassword',
      });
      Roles.addUsersToRoles(adminUserId, 'admin');
    }
  },
});

Meteor.startup(() => {
  // Call the method on startup to create roles
  Meteor.call('createRoles');
});
