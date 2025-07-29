import "./EditProfileForm.css";

function EditProfileForm({ firstName, lastName, userName, setUserName, onSave, onCancel }) {
  return (
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
        <button className="edit-button" onClick={onSave}>
          Save
        </button>
        <button className="edit-button cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditProfileForm;
