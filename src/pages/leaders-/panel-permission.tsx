import LeadersPanelLayout from "@/layouts/LeadersPanelLayout";
import UserPermissionsTable from "@/components/permissions/UserPermissionsTable";
import RoleChangeModal from "@/components/modals/RoleChangeModal";

import { useEffect, useState } from "react";
import { fetchUsers, changeUserRole } from "@/lib/api";

export default function PermissionsPage() {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    const res = await fetchUsers();
    setUsers(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleChangeRole = (user) => {
    setSelected(user);
    setOpenModal(true);
  };

  const handleSubmit = async ({ role }) => {
    await changeUserRole(selected.id, role);
    setOpenModal(false);
    load();
  };

  return (
    <LeadersPanelLayout title="Permissions">
      <h2 style={{ marginBottom: 20 }}>User Permissions</h2>

      <UserPermissionsTable
        users={users}
        onChangeRole={handleChangeRole}
      />

      <RoleChangeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        user={selected}
      />
    </LeadersPanelLayout>
  );
}
