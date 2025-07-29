import { useEffect, useState } from "react";
import Account from "../../components/Account/Account";
import "./Profile.css";
import accounts from "../../data/accountsData";

function User() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setFirstName(data.body.firstName);
          setLastName(data.body.lastName);
          setUserName(data.body.userName);
        } else {
          console.error("Erreur API:", data.message);
        }
      } catch (error) {
        console.error("Erreur réseau:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Nom d’utilisateur mis à jour !");
        setEditMode(false);
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (error) {
      alert("Erreur réseau");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <div className="main bg-dark">
      <div className="header">
        {editMode ? (
          <div className="edit-form">
            <h2>Edit user info</h2>

            <div className="input-wrapper">
              <label>User name:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <label>First name:</label>
              <input type="text" value={firstName} disabled />
            </div>

            <div className="input-wrapper">
              <label>Last name:</label>
              <input type="text" value={lastName} disabled />
            </div>

            <div className="button-group">
              <button className="edit-button" onClick={handleSave}>
                Save
              </button>
              <button className="edit-button cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {firstName} {lastName}!
            </h1>
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {accounts.map((account) => (
        <Account
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </div>
  );
}

export default User;
