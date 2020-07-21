import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";
import Nav from "./Nav";
import About from "./About";
import Shop from "./Shop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserDetail from "./UserDetail";

const App = () => {
  const APP_ID = "3a54cf52";
  const APP_KEY = "6a553b284fb73fd0de710cb0fe9687af	";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/shop/:id" component={UserDetail} />
          <Route path="/" exact component={Recipe}>
            <form className="search-form" onSubmit={getSearch}>
              <input
                className="search-bar"
                type="text"
                value={search}
                onChange={updateSearch}
              />
              <button className="search-button" type="submit">
                Search
              </button>
            </form>
            <div className="recipes">
              {recipes.map((recipe) => (
                <Recipe
                  key={recipe.recipe.label}
                  title={recipe.recipe.label}
                  calories={recipe.recipe.calories}
                  image={recipe.recipe.image}
                  ingredients={recipe.recipe.ingredients}
                />
              ))}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
