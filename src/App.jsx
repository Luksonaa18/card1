import "./App.css";
import span from "../src/assets/span.png";
import oval from "../src/assets/Oval.png";
import oval1 from "../src/assets/Oval1.png";
import Input from "./components/inpuy/Input";
import { useState, useEffect } from "react";

function App() {
  // Use state variables to track the values of inputs
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cardsAnimated, setCardsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="full">
      <div className="gradient">
        <div className="cards">
          <div className={`card1 ${cardsAnimated ? "card-animated" : ""}`}>
            <div className="black"></div>
            <div className="gray">
              <p>{cvc || "000"}</p>
            </div>
            <img src={span} alt="" />
          </div>
          <div className={`card2 ${cardsAnimated ? "card-animated" : ""}`}>
            <div className="images">
              <img src={oval} alt="" />
              <img src={oval1} alt="" />
            </div>
            <div className="info-line">
              <p>{cardNumber || "0000 0000 0000 0000"}</p>
              <div className="info">
                <span>{name}</span>
                <h5>
                  {expMonth || "00"}/{expYear || "00"}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Input
        name={name}
        cardNumber={cardNumber}
        expMonth={expMonth}
        expYear={expYear}
        cvc={cvc}
        setName={setName}
        setCardNumber={setCardNumber}
        setExpMonth={setExpMonth}
        setExpYear={setExpYear}
        setCvc={setCvc}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
    </div>
  );
}

export default App;
