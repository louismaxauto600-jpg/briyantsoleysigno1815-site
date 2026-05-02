// =======================================================
// FILE: src/components/modals/LeaderFormModal.tsx
// =======================================================
import { useState } from "react";

export default function LeaderFormModal({ open, onClose, onSubmit, initial }) {
  if (!open) return null;

  const [full_name, setFullName] = useState(initial?.full_name || "");
  const [role_title, setRoleTitle] = useState(initial?.role_title || "");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = () => {
    const data = new FormData();
    data.append("full_name", full_name);
    data.append("role_title", role_title);
    if (photo) data.append("photo", photo);
    onSubmit(data);
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>{initial ? "Edit Leader" : "Add Leader"}</h3>

        <input
          placeholder="Full Name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          placeholder="Role Title"
          value={role_title}
          onChange={(e) => setRoleTitle(e.target.value)}
        />

        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button className="secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}


// =======================================================
// FILE: src/components/modals/MediaUploadModal.tsx
// =======================================================
import { useState } from "react";

export default function MediaUploadModal({ open, onClose, onSubmit }) {
  if (!open) return null;

  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    const data = new FormData();
    data.append("file", file);
    data.append("category", category);
    onSubmit(data);
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Upload Media</h3>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Upload</button>
          <button className="secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}


// =======================================================
// FILE: src/components/modals/CategoryFormModal.tsx
// =======================================================
import { useState } from "react";

export default function CategoryFormModal({ open, onClose, onSubmit, initial }) {
  if (!open) return null;

  const [name, setName] = useState(initial?.name || "");

  const handleSubmit = () => {
    onSubmit({ name });
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>{initial ? "Edit Category" : "Add Category"}</h3>

        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button className="secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}


// =======================================================
// FILE: src/components/modals/RoleChangeModal.tsx
// =======================================================
import { useState } from "react";

export default function RoleChangeModal({ open, onClose, onSubmit, user }) {
  if (!open) return null;

  const [role, setRole] = useState(user?.role || "");

  const handleSubmit = () => {
    onSubmit({ role });
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Change Role for {user?.full_name}</h3>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="VIEWER">Viewer</option>
          <option value="EDITOR">Editor</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>

        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button className="secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
