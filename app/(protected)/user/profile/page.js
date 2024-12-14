import React, { useState } from 'react';

function ProfileForm() {
  const [username, setUsername] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [email, setEmail] = useState('user@example.com'); // Replace with actual user email

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add profile update logic here
  };

  return (
    <form onSubmit={handleSubmit} className="form bg-neutral text-neutral-content p-10">
      <h2 className="form-title">Profile</h2>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-group">
        <label>Photo URL</label>
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="input input-bordered"
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          className="input input-bordered"
          disabled
        />
      </div>
      <button type="submit" className="btn btn-primary">Update Profile</button>
    </form>
  );
}

export default ProfileForm;