import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [SearchForm, setSearchForm] = useState("");
  const [Cocktails, setCockTails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${url}${SearchForm}`);
      const data = await resp.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strGlass, strDrinkThumb, strAlcoholic } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCockTails(newCocktails);
      } else {
        setCockTails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [SearchForm]);

  useEffect(() => {
    fetchDrinks();
  }, [SearchForm, fetchDrinks]);

  return (
    <AppContext.Provider
      value={{ loading, SearchForm, setSearchForm, Cocktails }}
    >
      {children}
    </AppContext.Provider>
  );
};
//Global context for app
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
