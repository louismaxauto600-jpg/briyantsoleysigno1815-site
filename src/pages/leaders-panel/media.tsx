// =======================================================
// FILE: src/pages/leaders-panel/media.tsx
// =======================================================
import LeadersPanelLayout from "@/layouts/LeadersPanelLayout";
import MediaGrid from "@/components/media/MediaGrid";
import { useEffect, useState } from "react";
import { fetchMedia, deleteMedia } from "@/lib/api";

export default function MediaPage() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await fetchMedia();
    setItems(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <LeadersPanelLayout title="Media Library">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>Media Library</h2>
        <button>Upload Media</button>
      </div>

      <MediaGrid
        items={items}
        onClickItem={(m) => console.log("Preview", m)}
      />
    </LeadersPanelLayout>
  );
}


// =======================================================
// FILE: src/components/media/MediaGrid.tsx
// =======================================================
export default function MediaGrid({ items, onClickItem }) {
  return (
    <div className="media-grid">
      {items.map((m) => (
        <div
          key={m.id}
          className="media-card"
          onClick={() => onClickItem && onClickItem(m)}
        >
          <img src={m.file_url} />
          <div className="meta">
            <span>{m.category}</span>
            <span>{m.upload_date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}


// =======================================================
// FILE: src/pages/leaders-panel/categories.tsx
// =======================================================
import LeadersPanelLayout from "@/layouts/LeadersPanelLayout";
import CategoryList from "@/components/categories/CategoryList";
import { useEffect, useState } from "react";
import { fetchCategories, deleteCategory } from "@/lib/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const load = async () => {
    const res = await fetchCategories();
    setCategories(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <LeadersPanelLayout title="Categories">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>Categories</h2>
        <button>Add Category</button>
      </div>

      <CategoryList
        categories={categories}
        onSelect={(c) => console.log("SELECT CATEGORY", c)}
      />
    </LeadersPanelLayout>
  );
}


// =======================================================
// FILE: src/components/categories/CategoryList.tsx
// =======================================================
export default function CategoryList({ categories, onSelect }) {
  return (
    <ul className="category-list">
      {categories.map((c) => (
        <li key={c.id} onClick={() => onSelect && onSelect(c)}>
          {c.name}
        </li>
      ))}
    </ul>
  );
}


// =======================================================
// FILE: src/pages/leaders-panel/permissions.tsx
// =======================================================
import LeadersPanelLayout from "@/layouts/LeadersPanelLayout";
import UserPermissionsTable from "@/components/permissions/UserPermissionsTable";
import { useEffect, useState } from "react";
import { fetchUsers, changeUserRole } from "@/lib/api";

export default function PermissionsPage() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await fetchUsers();
    setUsers(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <LeadersPanelLayout title="Permissions">
      <h2 style={{ marginBottom: 20 }}>User Permissions</h2>

      <UserPermissionsTable
        users={users}
        onChangeRole={(u) => console.log("CHANGE ROLE", u)}
      />
    </LeadersPanelLayout>
  );
}


// =======================================================
// FILE: src/components/permissions/UserPermissionsTable.tsx
// =======================================================
export default function UserPermissionsTable({ users, onChangeRole }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>User</th><th>Role</th><th>Email</th><th>Last Login</th><th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.full_name}</td>
            <td>{u.role}</td>
            <td>{u.email}</td>
            <td>{u.last_login}</td>
            <td>
              <button onClick={() => onChangeRole(u)}>Change Role</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


// =======================================================
// FILE: src/pages/leaders-panel/logs.tsx
// =======================================================
import LeadersPanelLayout from "@/layouts/LeadersPanelLayout";
import { useEffect, useState } from "react";
import { fetchLogs } from "@/lib/api";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  const load = async () => {
    const res = await fetchLogs();
    setLogs(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <LeadersPanelLayout title="System Logs">
      <h2 style={{ marginBottom: 20 }}>System Logs</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Admin</th><th>Action</th><th>Date</th><th>Details</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.admin}</td>
              <td>{log.action_type}</td>
              <td>{log.createdAt}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LeadersPanelLayout>
  );
}
