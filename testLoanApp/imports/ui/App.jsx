import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const userId = useTracker(() => Meteor.userId());

  const handleRegistration = (event) => {
    event.preventDefault();

    Accounts.createUser({ email, password }, (error) => {
      if (error) {
        console.error(error.reason);
      } else {
        Roles.addUsersToRoles(Meteor.userId(), role);
      }
    });
  };

  return (
    <div>
      {userId ? (
        <div>
          <h1>Welcome!</h1>
          {Roles.userIsInRole(userId, "admin") && (
            <p>Admin Dashboard Content</p>
          )}
          {Roles.userIsInRole(userId, "borrower") && (
            <p>Borrower Dashboard Content</p>
          )}
          {Roles.userIsInRole(userId, "lender") && (
            <p>Lender Dashboard Content</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleRegistration}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="borrower">Borrower</option>
            <option value="lender">Lender</option>
          </select>
          <br />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default App;
