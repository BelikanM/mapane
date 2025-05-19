import React, { useState } from "react";
import Discussions from "./chat/Discussions";
import Contacts from "./chat/Contacts";
import Groupes from "./chat/Groupes";
import "./chat/chat.css";

const tabs = [
  { label: "Discussions", key: "discussions" },
  { label: "Contacts", key: "contacts" },
  { label: "Groupes", key: "groupes" }
];

const Chat = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  return (
    <div className="chat-container">
      <h2>Chat</h2>
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
        {activeTab === "discussions" && <Discussions />}
        {activeTab === "contacts" && <Contacts />}
        {activeTab === "groupes" && <Groupes />}
      </div>
    </div>
  );
};

export default Chat;
