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

  const [touched, setTouched] = useState({
    name: false,
    cardNumber: false,
    expMonth: false,
    expYear: false,
    cvc: false,
  });

  const [focus, setFocus] = useState({
    name: false,
    cardNumber: false,
    expMonth: false,
    expYear: false,
    cvc: false,
  });

  const isFieldEmpty = (field) => {
    return field === "" || field === undefined || field === null;
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setName(value);
    setTouched({ ...touched, name: true });

    let error = "";
    if (!value) {
      error = "Cardholder name required";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      error = "Letters only";
    }

    setErrors({ ...errors, name: error });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d]/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    value = value.substring(0, 19);
    setCardNumber(value);
    setTouched({ ...touched, cardNumber: true });

    let error = "";
    const digits = value.replace(/\s/g, "");
    if (!value) {
      error = "Card number required";
    } else if (digits.length !== 16 || !/^\d+$/.test(digits)) {
      error = "Must be 16 digits";
    }

    setErrors({ ...errors, cardNumber: error });
  };

  const handleMonthChange = (e) => {
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
    setTouched({ ...touched, expMonth: true });

    let error = "";
    if (!value) {
      error = "Required";
    } else if (!/^(0[1-9]|1[0-2])$/.test(value)) {
      error = "01-12 only";
    }

    setErrors({ ...errors, expMonth: error });
  };

  const handleYearChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d]/g, "");
    value = value.substring(0, 2);
    setExpYear(value);
    setTouched({ ...touched, expYear: true });

    let error = "";
    if (!value) {
      error = "Required";
    } else if (!/^\d{2}$/.test(value)) {
      error = "2 digits";
    }

    setErrors({ ...errors, expYear: error });
  };

  const handleCvcChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d]/g, "");
    value = value.substring(0, 4);
    setCvc(value);
    setTouched({ ...touched, cvc: true });

    let error = "";
    if (!value) {
      error = "Required";
    } else if (!/^\d{3,4}$/.test(value)) {
      error = "3-4 digits";
    }

    setErrors({ ...errors, cvc: error });
  };

  const validateAllFields = () => {
    setTouched({
      name: true,
      cardNumber: true,
      expMonth: true,
      expYear: true,
      cvc: true,
    });

    const newErrors = {
      name: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvc: "",
    };

    if (!name) {
      newErrors.name = "Cardholder name required";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Letters only";
    }

    const digits = cardNumber ? cardNumber.replace(/\s/g, "") : "";
    if (!cardNumber) {
      newErrors.cardNumber = "Card number required";
    } else if (digits.length !== 16 || !/^\d+$/.test(digits)) {
      newErrors.cardNumber = "Must be 16 digits";
    }

    if (!expMonth) {
      newErrors.expMonth = "Required";
    } else if (!/^(0[1-9]|1[0-2])$/.test(expMonth)) {
      newErrors.expMonth = "01-12 only";
    }

    if (!expYear) {
      newErrors.expYear = "Required";
    } else if (!/^\d{2}$/.test(expYear)) {
      newErrors.expYear = "2 digits";
    }

    if (!cvc) {
      newErrors.cvc = "Required";
    } else if (!/^\d{3,4}$/.test(cvc)) {
      newErrors.cvc = "3-4 digits";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
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
              onBlur={() => {
                setFocus({ ...focus, name: false });
                if (!touched.name) setTouched({ ...touched, name: true });
              }}
              type="text"
              name="name"
              value={name || ""}
              placeholder="e.g John Doe"
              className={
                touched.name && errors.name
                  ? "error-input"
                  : focus.name
                  ? "focus-input"
                  : ""
              }
            />
            {touched.name && errors.name && (
              <p className="error-text">{errors.name}</p>
            )}

            <label htmlFor="cardNumber">CARD NUMBER</label>
            <input
              type="text"
              name="cardNumber"
              onChange={handleCardNumberChange}
              onFocus={() => setFocus({ ...focus, cardNumber: true })}
              onBlur={() => {
                setFocus({ ...focus, cardNumber: false });
                if (!touched.cardNumber)
                  setTouched({ ...touched, cardNumber: true });
              }}
              value={cardNumber || ""}
              placeholder="e.g 0000 0000 0000 0000"
              maxLength={19}
              className={
                touched.cardNumber && errors.cardNumber
                  ? "error-input"
                  : focus.cardNumber
                  ? "focus-input"
                  : ""
              }
            />
            {touched.cardNumber && errors.cardNumber && (
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
                        onBlur={() => {
                          setFocus({ ...focus, expMonth: false });
                          if (!touched.expMonth)
                            setTouched({ ...touched, expMonth: true });
                        }}
                        value={expMonth || ""}
                        maxLength={2}
                        className={
                          touched.expMonth && errors.expMonth
                            ? "error-input"
                            : focus.expMonth
                            ? "focus-input"
                            : ""
                        }
                      />
                      {touched.expMonth && errors.expMonth && (
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
                        onBlur={() => {
                          setFocus({ ...focus, expYear: false });
                          if (!touched.expYear)
                            setTouched({ ...touched, expYear: true });
                        }}
                        value={expYear || ""}
                        maxLength={2}
                        className={
                          touched.expYear && errors.expYear
                            ? "error-input"
                            : focus.expYear
                            ? "focus-input"
                            : ""
                        }
                      />
                      {touched.expYear && errors.expYear && (
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
                      onBlur={() => {
                        setFocus({ ...focus, cvc: false });
                        if (!touched.cvc) setTouched({ ...touched, cvc: true });
                      }}
                      value={cvc || ""}
                      placeholder="e.g 123"
                      maxLength={4}
                      className={
                        touched.cvc && errors.cvc
                          ? "error-input"
                          : focus.cvc
                          ? "focus-input"
                          : ""
                      }
                    />
                    {touched.cvc && errors.cvc && (
                      <p className="error-text">{errors.cvc}</p>
                    )}
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
