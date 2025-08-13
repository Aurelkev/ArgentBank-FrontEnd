import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName, setUser } from "../../redux/userSlice";

import Account from "../../components/Account/Account";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import accounts from "../../data/accountsData";

import "./Profile.css";

function User() {
  const dispatch = useDispatch();
  const { firstName, lastName, userName: storedUserName, token } = useSelector(
    (state) => state.user
  );

  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(storedUserName || "");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          dispatch(setUser({ ...data.body, token }));
          setUserName(data.body.userName);
        } else {
          console.error("Erreur API:", data.message);
        }
      } catch (error) {
        console.error("Erreur réseau:", error);
      }
    };

    if (!firstName) {
      fetchUserProfile();
    }
  }, [dispatch, token, firstName]);

  const handleSave = async () => {
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
        dispatch(updateUserName(userName));
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
    setUserName(storedUserName);
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
