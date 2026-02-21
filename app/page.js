"use client";

import { useState } from "react";

export default function Home() {
  const [trades, setTrades] = useState([]);
  const [pnl, setPnl] = useState("");
  const [symbol, setSymbol] = useState("");

  const addTrade = () => {
    if (!pnl) return;
    const newTrade = {
      pnl: parseFloat(pnl),
      symbol
    };
    setTrades([...trades, newTrade]);
    setPnl("");
    setSymbol("");
  };

  const totalPnL = trades.reduce((acc, t) => acc + t.pnl, 0);
  const wins = trades.filter(t => t.pnl > 0).length;
  const losses = trades.filter(t => t.pnl < 0).length;

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "32px" }}>Elite Trader Journal</h1>

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Futures Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <input
          placeholder="PnL"
          type="number"
          value={pnl}
          onChange={(e) => setPnl(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />
        <button
          onClick={addTrade}
          style={{
            padding: "10px 20px",
            backgroundColor: "#D4AF37",
            color: "black",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add Trade
        </button>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Total PnL: 
          <span style={{ color: totalPnL >= 0 ? "green" : "red" }}>
            ${totalPnL}
          </span>
        </h2>
        <p>Wins: <span style={{ color: "green" }}>{wins}</span></p>
        <p>Losses: <span style={{ color: "red" }}>{losses}</span></p>
      </div>
    </div>
  );
}
