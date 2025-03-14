import React, { useState, useEffect } from "react";
import "./input.css";
import oval2 from "../../assets/Oval2.png";

const Input = ({
  name,
  cardNumber,
  expMonth,
  expYear,
  cvc,
  setName,
  setCardNumber,
  setExpMonth,
  setExpYear,
  setCvc,
  isSubmitted,
  setIsSubmitted,
}) => {
  const [errors, setErrors] = useState({
    name: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  });

  const [focus, setFocus] = useState({
    name: false,
    cardNumber: false,
    expMonth: false,
    expYear: false,
    cvc: false,
  });
  const [formInteracted, setFormInteracted] = useState(false);

  const isFieldEmpty = (field) => {
    return field === "" || field === undefined || field === null;
  };

  useEffect(() => {
    if (formInteracted) {
      const newErrors = { ...errors };

      if (isFieldEmpty(name)) newErrors.name = "Cardholder name required";
      if (isFieldEmpty(cardNumber))
        newErrors.cardNumber = "Card number required";
      if (isFieldEmpty(expMonth)) newErrors.expMonth = "Required";
      if (isFieldEmpty(expYear)) newErrors.expYear = "Required";
      if (isFieldEmpty(cvc)) newErrors.cvc = "Required";

      setErrors(newErrors);
    }
  }, [formInteracted, name, cardNumber, expMonth, expYear, cvc]);

  const handleNameChange = (e) => {
    setFormInteracted(true);
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setName(value);

    if (value) {
      setErrors({ ...errors, name: "" });
    } else {
      setErrors({ ...errors, name: "Cardholder name required" });
    }

    if (value && !/^[A-Za-z\s]+$/.test(value)) {
      setErrors({ ...errors, name: "Letters only" });
    }
  };

  const handleCardNumberChange = (e) => {
    setFormInteracted(true);
    let value = e.target.value;
    value = value.replace(/[^\d]/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    value = value.substring(0, 19);
    setCardNumber(value);

    if (value) {
      setErrors({ ...errors, cardNumber: "" });
    } else {
      setErrors({ ...errors, cardNumber: "Card number required" });
    }

    const digits = value.replace(/\s/g, "");
    if (value && (digits.length !== 16 || !/^\d+$/.test(digits))) {
      setErrors({ ...errors, cardNumber: "Must be 16 digits" });
    }
  };

  const handleMonthChange = (e) => {
    setFormInteracted(true);
    let value = e.target.value;
    value = value.replace(/[^\d]/g, "");

    if (value.length === 2) {
      const monthNum = parseInt(value);
      if (monthNum > 12) {
        value = "12";
      } else if (monthNum < 1) {
        value = "01";
      } else if (monthNum < 10 && value[0] !== "0") {
        value = "0" + monthNum;
      }
    }
    value = value.substring(0, 2);
    setExpMonth(value);

    if (value) {
      setErrors({ ...errors, expMonth: "" });
    } else {
      setErrors({ ...errors, expMonth: "Required" });
    }

    if (value && !/^(0[1-9]|1[0-2])$/.test(value)) {
      setErrors({ ...errors, expMonth: "01-12 only" });
    }
  };

  const handleYearChange = (e) => {
    setFormInteracted(true);
    let value = e.target.value;
    value = value.replace(/[^\d]/g, "");
    value = value.substring(0, 2);
    setExpYear(value);

    if (value) {
      setErrors({ ...errors, expYear: "" });
    } else {
      setErrors({ ...errors, expYear: "Required" });
    }

    if (value && !/^\d{2}$/.test(value)) {
      setErrors({ ...errors, expYear: "2 digits" });
    }
  };

  const handleCvcChange = (e) => {
    setFormInteracted(true);
    let value = e.target.value;
    value = value.replace(/[^\d]/g, "");
    value = value.substring(0, 4);
    setCvc(value);

    if (value) {
      setErrors({ ...errors, cvc: "" });
    } else {
      setErrors({ ...errors, cvc: "Required" });
    }

    if (value && !/^\d{3,4}$/.test(value)) {
      setErrors({ ...errors, cvc: "3-4 digits" });
    }
  };

  const validateAllFields = () => {
    setFormInteracted(true);

    const newErrors = {
      name: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvc: "",
    };

    let hasErrors = false;

    if (!name) {
      newErrors.name = "Cardholder name required";
      hasErrors = true;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Letters only";
      hasErrors = true;
    }

    const digits = cardNumber ? cardNumber.replace(/\s/g, "") : "";
    if (!cardNumber) {
      newErrors.cardNumber = "Card number required";
      hasErrors = true;
    } else if (digits.length !== 16 || !/^\d+$/.test(digits)) {
      newErrors.cardNumber = "Must be 16 digits";
      hasErrors = true;
    }

    if (!expMonth) {
      newErrors.expMonth = "Required";
      hasErrors = true;
    } else if (!/^(0[1-9]|1[0-2])$/.test(expMonth)) {
      newErrors.expMonth = "01-12 only";
      hasErrors = true;
    }

    if (!expYear) {
      newErrors.expYear = "Required";
      hasErrors = true;
    } else if (!/^\d{2}$/.test(expYear)) {
      newErrors.expYear = "2 digits";
      hasErrors = true;
    }

    if (!cvc) {
      newErrors.cvc = "Required";
      hasErrors = true;
    } else if (!/^\d{3,4}$/.test(cvc)) {
      newErrors.cvc = "3-4 digits";
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateAllFields()) {
      setIsSubmitted(true);
    }
  };

  return (
    <>
      <form>
        {!isSubmitted ? (
          <>
            <label htmlFor="name">CARDHOLDER NAME</label>
            <input
              onChange={handleNameChange}
              onFocus={() => setFocus({ ...focus, name: true })}
              onBlur={() => setFocus({ ...focus, name: false })}
              type="text"
              name="name"
              value={name || ""}
              placeholder="e.g John Doe"
              className={
                errors.name ? "error-input" : focus.name ? "focus-input" : ""
              }
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <label htmlFor="name1">CARD NUMBER</label>
            <input
              type="text"
              name="name1"
              onChange={handleCardNumberChange}
              onFocus={() => setFocus({ ...focus, cardNumber: true })}
              onBlur={() => setFocus({ ...focus, cardNumber: false })}
              value={cardNumber || ""}
              placeholder="e.g 0000 0000 0000 0000"
              maxLength={19}
              className={
                errors.cardNumber
                  ? "error-input"
                  : focus.cardNumber
                  ? "focus-input"
                  : ""
              }
            />
            {errors.cardNumber && (
              <p className="error-text">{errors.cardNumber}</p>
            )}

            <div className="input-line">
              <div className="in">
                <label htmlFor="mm">Exp. Date (MM/YY) CVC</label>
                <div className="in-mm">
                  <div className="gap">
                    <div className="exp-container">
                      <input
                        id="MM"
                        name="mm"
                        type="text"
                        placeholder="MM"
                        onChange={handleMonthChange}
                        onFocus={() => setFocus({ ...focus, expMonth: true })}
                        onBlur={() => setFocus({ ...focus, expMonth: false })}
                        value={expMonth || ""}
                        maxLength={2}
                        className={
                          errors.expMonth
                            ? "error-input"
                            : focus.expMonth
                            ? "focus-input"
                            : ""
                        }
                      />
                      {errors.expMonth && (
                        <p className="error-text">{errors.expMonth}</p>
                      )}
                    </div>

                    <div className="exp-container">
                      <input
                        id="YY"
                        type="text"
                        placeholder="YY"
                        onChange={handleYearChange}
                        onFocus={() => setFocus({ ...focus, expYear: true })}
                        onBlur={() => setFocus({ ...focus, expYear: false })}
                        value={expYear || ""}
                        maxLength={2}
                        className={
                          errors.expYear
                            ? "error-input"
                            : focus.expYear
                            ? "focus-input"
                            : ""
                        }
                      />
                      {errors.expYear && (
                        <p className="error-text">{errors.expYear}</p>
                      )}
                    </div>
                  </div>

                  <div className="cvc-container">
                    <input
                      id="cvc"
                      type="text"
                      name="cvv"
                      onChange={handleCvcChange}
                      onFocus={() => setFocus({ ...focus, cvc: true })}
                      onBlur={() => setFocus({ ...focus, cvc: false })}
                      value={cvc || ""}
                      placeholder="e.g 123"
                      maxLength={4}
                      className={
                        errors.cvc
                          ? "error-input"
                          : focus.cvc
                          ? "focus-input"
                          : ""
                      }
                    />
                    {errors.cvc && <p className="error-text">{errors.cvc}</p>}
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} type="submit">
              Confirm
            </button>
          </>
        ) : (
          <div className="thank-you">
            <img src={oval2} alt="" />
            <h1>THANK YOU!</h1>
            <span>We've added your card details</span>
            <button onClick={() => setIsSubmitted(false)}>Continue</button>
          </div>
        )}
      </form>
    </>
  );
};

export default Input;
