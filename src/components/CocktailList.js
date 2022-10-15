import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { Cocktails, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (Cocktails.length < 1) {
    return <h2 className="section-title">Sorry, No matches</h2>;
  }
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {Cocktails.map((cocktail) => {
        return  <Cocktail {...cocktail} />;
        })} 
      </div>
    </section>
  );
};

export default CocktailList;
