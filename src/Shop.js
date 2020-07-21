import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Shop() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");

    const items = await data.json();
    console.log(items);
    setItems(items);
    console.log(items[0].name);
  };

  return (
    <div>
      {items.map((user) => {
        return (
          <h2 key={user.id}>
            <Link to={`/shop/${user.id}`}>{user.name}</Link>
          </h2>
        );
      })}
    </div>
  );
}

export default Shop;
