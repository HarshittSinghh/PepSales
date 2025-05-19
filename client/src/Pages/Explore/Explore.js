import React, { useState } from "react";
import "./explore.css";

const dummyPeople = [
  { id: 1, name: "Harshit Kumar Singh" },
  { id: 2, name: "Amit Verma" },
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPeople = dummyPeople.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitial = (name) => {
    if (!name) return "?";
    return name.trim()[0].toUpperCase();
  };

  return (
    <div className="explore-page">
      <h2 className="explore-title">Explore People</h2>
      <center>
        <input
          type="text"
          placeholder="Search by name..."
          className="explore-input"
          aria-label="Search people by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </center>
      <div className="explore-grid">
        {filteredPeople.length > 0 ? (
          filteredPeople.map((person) => (
            <div key={person.id} className="explore-card">
              <div className="explore-avatar">{getInitial(person.name)}</div>
              <p className="explore-name">{person.name}</p>
            </div>
          ))
        ) : (
          <p className="explore-no-result">No people found.</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
