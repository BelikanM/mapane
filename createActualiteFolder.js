const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src/pages/actualite');

if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

const files = {
  'Serv.js': `import React from "react";
const Serv = () => <div>Contenus des utilisateurs et abonnements (à compléter)</div>;
export default Serv;`,
  'Pub.js': `import React from "react";
const Pub = () => <div>Section Publicités (à compléter)</div>;
export default Pub;`,
  'Clip.js': `import React from "react";
const Clip = () => <div>Clip de la semaine (à compléter)</div>;
export default Clip;`,
  'actualite.css': `/* CSS actualite, à compléter */`
};

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, file), content, { flag: 'wx' });
}

const actualiteJs = path.join(__dirname, 'src/pages/Actualite.js');
if (!fs.existsSync(actualiteJs)) {
  fs.writeFileSync(actualiteJs, 
`import React, { useState } from "react";
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
`);
}

console.log('Structure "actualite" créée avec fichiers de base !');
