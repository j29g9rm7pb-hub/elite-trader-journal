"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [trades, setTrades] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [pnl, setPnl] = useState("");

  useEffect(() => {
    fetchTrades();
  }, []);

  async function fetchTrades() {
    const { data, error } = await supabase
      .from("trades")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTrades(data);
  }

  async function addTrade() {
    if (!pnl) return;

    const { error } = await supabase.from("trades").insert([
      {
        symbol,
        pnl: parseFloat(pnl),
        user_id: (await supabase.auth.getUser()).data.user?.id
      }
    ]);

    if (!error) {
      setSymbol("");
      setPnl("");
      fetchTrades();
    }
  }

  const totalPnL = trades.reduce((acc, t) => acc + Number(t.pnl), 0);

  return (
    <div style={{ padding: "40px", backgroundColor: "#0a0a0a", color: "#D4AF37", minHeight: "100vh" }}>
      <h1>Elite Trader Journal</h1>

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          placeholder="PnL"
          type="number"
          value={pnl}
          onChange={(e) => setPnl(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={addTrade} style={{ background: "#D4AF37", color: "black" }}>
          Add Trade
        </button>
      </div>

      <h2 style={{ marginTop: "30px" }}>
        Total PnL:{" "}
        <span style={{ color: totalPnL >= 0 ? "green" : "red" }}>
          ${totalPnL}
        </span>
      </h2>

      <ul>
        {trades.map((trade) => (
          <li key={trade.id}>
            {trade.symbol} — ${trade.pnl}
          </li>
        ))}
      </ul>
    </div>
  );
}
