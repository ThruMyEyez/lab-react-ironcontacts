import { useState } from "react";
import contacts from "./contacts.json";

const App = () => {
  const [ironContacts, setIronContacts] = useState(contacts.slice(0, 5));
  const [reversed, setReversed] = useState(false);

  const deleteContact = contactId => {
    setIronContacts(() => ironContacts.filter(contact => contact.id !== contactId));
  };

  const addRandomContact = () => {
    //const randomElement = contacts[Math.floor(Math.random() * contacts.slice(5, -1).length)];
    setIronContacts(ironContacts => [contacts[Math.floor(Math.random() * contacts.slice(5, -1).length)], ...ironContacts]);
    // TODO setIronContacts(ironContacts => [ironContacts.includes(randomElement) && randomElement || getAnotherRndElemnt ), ...ironContacts]);
  };

  const sortNames = () => {
    //console.log("sort by names from A to Z", reversed);
    // A to Z if reversed = false, else Z to A
    const wSorted = ironContacts.sort((a, b) => a.name.localeCompare(b.name)),
      sorted = (reversed && wSorted.reverse()) || wSorted;
    setIronContacts(() => [...sorted]);
  };

  const sortPopularities = () => {
    // Highest first if reversed = false, else lowest first
    const pSorted = ironContacts.sort((a, b) => b.popularity - a.popularity),
      sorted = (reversed && pSorted.reverse()) || pSorted;
    setIronContacts(() => [...sorted]);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div>
        <button onClick={addRandomContact}>Add Random Contact</button>
        <button onClick={sortNames}>Sort by Name</button>
        <button onClick={sortPopularities}>Sort by Popularity</button>
        <button
          onClick={() => {
            setReversed(!reversed);
          }}
          style={{ fontWeight: "bold", color: (reversed && "green") || "black" }}
        >
          {(reversed && "⬆️ ascending") || "⬇️ descending"}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th style={{ width: "3.5rem" }}>Won Oscar</th>
            <th style={{ width: "3.5rem" }}>Won Emmy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ironContacts.map(contact => {
            const { name, pictureUrl, popularity, id, wonOscar, wonEmmy } = contact;
            return (
              <tr key={id} style={{ textAlign: "center" }}>
                <td>
                  <img style={{ height: "4.5rem" }} src={pictureUrl} alt={name} />
                </td>
                <td>{name}</td>
                <td>{popularity.toFixed(2)}</td>
                <td>{(wonOscar && "🏆") || "😥"}</td>
                <td>{(wonEmmy && "🏆") || "😥"}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteContact(id);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
