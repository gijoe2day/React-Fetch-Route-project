import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function User({ match }) {
  useEffect(() => {
    fetchUser();
    console.log(match);
  }, []);

  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const data = await fetch(`https://jsonplaceholder.typicode.com/users`);
    console.log(data);

    const items = await data.json();
    console.log(items);
    setUser(items);
  };

  return (
    <div>
      <h1>{user.id}</h1>
    </div>
  );
}

export default User;
