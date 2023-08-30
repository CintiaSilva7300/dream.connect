import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function Teste() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [total, setTotal] = useState(0);

  const somaNum1 = (event) => {
    const novoValor = parseFloat(event.target.value);
    setNum1(novoValor);
  };

  const somaNum2 = (event) => {
    const novoValor = parseFloat(event.target.value);
    setNum2(novoValor);
  };

  const somaNum3 = (event) => {
    const novoValor = parseFloat(event.target.value);
    setNum3(novoValor);
  };

  const somaNum4 = (event) => {
    const novoValor = parseFloat(event.target.value);
    setNum4(novoValor);
  };

  function calcular() {
    const result = num1 + num3 + num3 + num4;
    setTotal(result);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 20 }}>CALCULAR</h1>

        <TextField
          onChange={somaNum1}
          label="Telephone"
          autocomplete="off"
          style={{ width: "50%", margin: 10 }}
          type="number"
          value={num1}
        />

        <TextField
          onChange={somaNum2}
          label="Telephone"
          autocomplete="off"
          style={{ width: "50%", margin: 10 }}
          type="number"
          value={num2}
        />

        <TextField
          onChange={somaNum3}
          label="Telephone"
          autocomplete="off"
          style={{ width: "50%", margin: 10 }}
          type="number"
          value={num3}
        />

        <TextField
          onChange={somaNum4}
          label="Telephone"
          autocomplete="off"
          style={{ width: "50%", margin: 10 }}
          type="number"
          value={num4}
        />

        <h1 style={{ fontSize: 22 }}>Valor tatol da soma: {total}</h1>

        <Button
          onClick={calcular}
          variant="contained"
          style={{
            backgroundColor: "#037199",
            width: "50%",
            margin: 10,
            height: 50,
            borderRadius: 20,
          }}
        >
          Calcular
        </Button>
      </div>
    </>
  );
}
