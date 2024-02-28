// App.js
import React from "react";
import "./App.css";
import PizzaForm from "./components/PizzaForm";
import PizzaStages from "./components/PizzaStages";
import MainDisplay from "./components/MainDisplay";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-start">Pizza Shop</h1>
      <PizzaForm />
      <PizzaStages />
      <MainDisplay/>
     
    </>
  );
}

export default App;
