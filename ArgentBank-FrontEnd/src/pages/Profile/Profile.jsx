import { useEffect, useState } from "react";
import Account from "../../components/Account/Account";
import "./Profile.css";
import accounts from "../../data/accountsData.jsx";


function User() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
        } else {
          console.error("Erreur:", data.message);
        }
      } catch (error) {
        console.error("Erreur réseau:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstName} {lastName} !
        </h1>
        <button className="edit-button">Edit Name</button>
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
