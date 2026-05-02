// =======================================================
// FILE: src/lib/api.ts
// =======================================================
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Leaders
export const fetchLeaders = () => api.get("/leaders/uploads");
export const createLeader = (data) => api.post("/leaders/uploads", data);
export const updateLeader = (id, data) => api.put(`/leaders/uploads/${id}`, data);
export const deleteLeader = (id) => api.delete(`/leaders/uploads/${id}`);

// Media
export const fetchMedia = () => api.get("/products/media");
export const uploadMedia = (data) => api.post("/products/media", data);
export const updateMedia = (id, data) => api.put(`/products/media/${id}`, data);
export const deleteMedia = (id) => api.delete(`/products/media/${id}`);

// Categories
export const fetchCategories = () => api.get("/categories");
export const createCategory = (data) => api.post("/categories", data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Permissions
export const fetchUsers = () => api.get("/users");
export const changeUserRole = (id, role) => api.put(`/users/${id}/role`, { role });
export const revokeUserAccess = (id) => api.delete(`/users/${id}`);

// Logs
export const fetchLogs = () => api.get("/system/logs");


// =======================================================
// FILE: src/styles/theme.css
// =======================================================
:root {
  --primary: #FF7A00;
  --bg-main: #050505;
  --bg-card: #151515;
  --text: #FFFFFF;
  --border: #262626;
}
body {
  background: var(--bg-main);
  color: var(--text);
  margin: 0;
  font-family: 'Inter', sans-serif;
}
.layout { display: flex; min-height: 100vh; }
.sidebar { width: 240px; background: #0A0A0A; padding: 20px; }
.main { flex: 1; display: flex; flex-direction: column; }
.topbar { height: 60px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; padding: 0 20px; }
.content { padding: 24px; }


// =======================================================
// FILE: src/components/navigation/Sidebar.tsx
// =======================================================
import Link from "next/link";
import { useRouter } from "next/router";

const menu = [
  { label: "Dashboard", path: "/leaders-panel/dashboard" },
  { label: "Leaders", path: "/leaders-panel/leaders" },
  { label: "Media", path: "/leaders-panel/media" },
  { label: "Categories", path: "/leaders-panel/categories" },
  { label: "Permissions", path: "/leaders-panel/permissions" },
  { label: "Logs", path: "/leaders-panel/logs" }
];

export default function Sidebar() {
  const router = useRouter();
  return (
    <aside className="sidebar">
      <div className="logo">BSS 1815</div>
      {menu.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          style={{
            display: "block",
            padding: "8px 0",
            opacity: router.pathname === item.path ? 1 : 0.6,
            fontWeight: router.pathname === item.path ? 700 : 400
          }}
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
}


// =======================================================
// FILE: src/components/navigation/Topbar.tsx
// =======================================================
export default function Topbar({ title }) {
  return (
    <header className="topbar">
      <div>{title}</div>
      <div style={{ display: "flex", gap: 12 }}>
        <input placeholder="Search..." style={{ padding: 6 }} />
        <div>🔔</div>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "#FF7A00", display: "flex",
          alignItems: "center", justifyContent: "center"
        }}>SA</div>
      </div>
    </header>
