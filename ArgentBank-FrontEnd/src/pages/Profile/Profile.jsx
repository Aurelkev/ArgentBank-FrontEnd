import { useEffect, useState } from "react";
import Account from "../../components/Account/Account";
import accounts from "../../data/accountsData";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import "./Profile.css";

function User() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName }),
        }
      );

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
          <EditProfileForm
            firstName={firstName}
            lastName={lastName}
            userName={userName}
            setUserName={setUserName}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <h2>
              Welcome back
              <br />
              {firstName} {lastName}!
            </h2>
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
