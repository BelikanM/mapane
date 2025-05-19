const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src/pages/chat');
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

const files = {
  'Discussions.js': `import React from "react";
const Discussions = () => <div>Liste des discussions (à compléter)</div>;
export default Discussions;`,
  'Contacts.js': `import React from "react";
const Contacts = () => <div>Gestion des contacts (à compléter)</div>;
export default Contacts;`,
  'Groupes.js': `import React from "react";
const Groupes = () => <div>Groupes de discussion (à compléter)</div>;
export default Groupes;`,
  'chat.css': `/* CSS chat, à compléter */`
};

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, file), content, { flag: 'wx' });
}

const chatJs = path.join(__dirname, 'src/pages/Chat.js');
if (!fs.existsSync(chatJs)) {
  fs.writeFileSync(chatJs, 
`import React, { useState } from "react";
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
`);
}

console.log('Structure "chat" créée avec fichiers de base !');
