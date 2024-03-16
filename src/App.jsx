import React, { useEffect, useState } from 'react';
import './App.css'; // Make sure you have an App.css file for custom styles
import AddPeople from './components/AddPeople';
import AddExpense from './components/AddExpense';
import SplitMoney from './components/SplitMoney';
import Navigation from './components/Navigation'; // Assuming you have a Navigation component
import { Button, ButtonGroup, Container } from 'react-bootstrap';

export default function App() {
  const [currentState, setCurrentState] = useState("AddPeople");

  useEffect(() => {
    // Attempt to restore the current state from localStorage
    const savedState = localStorage.getItem("currentState");
    if (savedState) {
      setCurrentState(savedState);
    }
  }, []);

  const handleChangeState = (newState) => () => {
    // Conditional logic before changing state
    if (currentState === "AddPeople" && localStorage.getItem("people") === "[]") {
      console.log("No people added. Cannot change state.");
      return;
    }
    setCurrentState(newState);
    // localStorage.setItem("currentState", newState);
  };

  const getButtonClass = (state) => {
    return currentState === state ? "active-button" : "";
  };

  return (
    <>
      <Navigation />

      <Container className="my-3">
      <ButtonGroup className="mb-2">
        <Button 
          variant={currentState === "AddPeople" ? "primary" : "secondary"} 
          className={getButtonClass("AddPeople")}
          onClick={handleChangeState("AddPeople")}>
          Add People
        </Button>
        <Button 
          variant={currentState === "AddExpense" ? "primary" : "secondary"} 
          className={getButtonClass("AddExpense")}
          onClick={handleChangeState("AddExpense")}>
          Add Expense
        </Button>
        <Button 
          variant={currentState === "SplitMoney" ? "primary" : "secondary"} 
          className={getButtonClass("SplitMoney")}
          onClick={handleChangeState("SplitMoney")}>
          Transaction
        </Button>
      </ButtonGroup>
    </Container>


      <div className="App-content">
        {currentState === "AddPeople" && <AddPeople />}
        {currentState === "AddExpense" && <AddExpense />}
        {currentState === "SplitMoney" && <SplitMoney />}
      </div>
    </>
  );
}
