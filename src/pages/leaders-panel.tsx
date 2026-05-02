import LeadersPanelLayout from "@/layouts/LeadersPanelLayout";
import CategoryList from "@/components/categories/CategoryList";
import CategoryFormModal from "@/components/modals/CategoryFormModal";

import { useEffect, useState } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "@/lib/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await fetchCategories();
    setCategories(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = () => {
    setEditing(null);
    setOpenModal(true);
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setOpenModal(true);
  };

  const handleSubmit = async (data) => {
    if (editing) {
      await updateCategory(editing.id, data);
    } else {
      await createCategory(data);
    }
    setOpenModal(false);
    load();
  };

  return (
    <LeadersPanelLayout title="Categories">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>Categories</h2>
        <button onClick={handleAdd}>Add Category</button>
      </div>

      <CategoryList
        categories={categories}
        onSelect={handleEdit}
      />

      <CategoryFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        initial={editing}
      />
    </LeadersPanelLayout>
  );
}
