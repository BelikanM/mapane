import React, { useState } from "react";
import Serv from "./actualite/Serv";
import Pub from "./actualite/Pub";
import Clip from "./actualite/Clip";
import "./actualite/actualite.css";

const tabs = [
  { label: "Flux abonnements", key: "serv" },
  { label: "Publicités", key: "pub" },
  { label: "Clip de la semaine", key: "clip" }
];

const Actualite = () => {
  const [activeTab, setActiveTab] = useState("serv");

  return (
    <div className="actualite-container">
      <h2>Actualité</h2>
      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "1rem",
              background: activeTab === tab.key ? "#3b82f6" : "#111827",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div>
        {activeTab === "serv" && <Serv />}
        {activeTab === "pub" && <Pub />}
        {activeTab === "clip" && <Clip />}
      </div>
    </div>
  );
};

export default Actualite;
