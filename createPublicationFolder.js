const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src/pages/publication');

if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

const files = {
  'PublicationForm.js': `import React from "react";
const PublicationForm = () => <div>Formulaire publication</div>;
export default PublicationForm;`,
  'PublicationList.js': `import React from "react";
const PublicationList = () => <div>Liste des publications</div>;
export default PublicationList;`,
  'PublicationCard.js': `import React from "react";
const PublicationCard = () => <div>Carte publication</div>;
export default PublicationCard;`,
  'publication.css': `/* CSS publication, à compléter */`
};

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, file), content, { flag: 'wx' });
}

const publicationJs = path.join(__dirname, 'src/pages/Publication.js');
if (!fs.existsSync(publicationJs)) {
  fs.writeFileSync(publicationJs, 
`import React, { useState } from "react";
import PublicationForm from "./publication/PublicationForm";
import PublicationList from "./publication/PublicationList";
import PublicationCard from "./publication/PublicationCard";
import "./publication/publication.css";

const tabs = [
  { label: "Publier", key: "form" },
  { label: "Liste", key: "list" },
  { label: "Carte", key: "card" }
];

const Publication = () => {
  const [activeTab, setActiveTab] = useState("form");
  return (
    <div className="publication-container">
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
        {activeTab === "form" && <PublicationForm />}
        {activeTab === "list" && <PublicationList />}
        {activeTab === "card" && <PublicationCard />}
      </div>
    </div>
  );
};

export default Publication;
`);
}

console.log('Structure "publication" créée avec fichiers de base !');
