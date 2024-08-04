import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState("");
  function handleSetAmount(e) {
    setAmount(e.target.value);
  }

  function handleSetToCurrency(e) {
    setToCurrency(e.target.value);
  }

  function handleFromCurrency(e) {
    setFromCurrency(e.target.value);
  }
  // useEffect(
  //   function () {
  //     async function currencyConverter() {
  //       const res = await fetch(
  //         `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
  //       );
  //       const data = res.json();
  //       setConvertedAmount(data.rates.toCurrency);
  //     }
  //     currencyConverter();
  //   },
  //   [amount, fromCurrency, toCurrency]
  // );

  useEffect(() => {
    async function currencyConverter() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency]);
    }
    currencyConverter();
  }, [amount, fromCurrency, toCurrency]);
  return (
    <div className="App">
      <Input
        onSetAmount={handleSetAmount}
        onSetFromCurrency={handleFromCurrency}
        onSetToCurrency={handleSetToCurrency}
        convertedAmount={convertedAmount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
      />
    </div>
  );
}

export default App;

function Input({
  onSetAmount,
  onSetFromCurrency,
  onSetToCurrency,
  convertedAmount,
  toCurrency,
  fromCurrency,
  amount,
}) {
  const [showPassword, setShowPassword] = useState(false);
  function handleShowPassword() {
    // setShowPassword((password) => !password);
    setShowPassword(!showPassword);
  }
  return (
    <div>
      <input
        placeholder="Enter amount"
        onChange={onSetAmount}
        value={amount}
      ></input>
      <select value={fromCurrency} onChange={(e) => onSetFromCurrency(e)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={(e) => onSetToCurrency(e)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>convertedAmount is : {convertedAmount}</p>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="type password"
      ></input>
      <button
        onMouseEnter={handleShowPassword}
        onMouseLeave={handleShowPassword}
      >
        Show password
      </button>
    </div>
  );
}
