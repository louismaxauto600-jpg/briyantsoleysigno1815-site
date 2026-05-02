import LeadersPanelLayout from "@/layouts/LeadersPanelLayout";
import MediaGrid from "@/components/media/MediaGrid";
import MediaUploadModal from "@/components/modals/MediaUploadModal";

import { useEffect, useState } from "react";
import { fetchMedia, uploadMedia, deleteMedia } from "@/lib/api";

export default function MediaPage() {
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const load = async () => {
    const res = await fetchMedia();
    setItems(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (formData) => {
    await uploadMedia(formData);
    setOpenModal(false);
    load();
  };

  return (
    <LeadersPanelLayout title="Media Library">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>Media Library</h2>
        <button onClick={() => setOpenModal(true)}>Upload Media</button>
      </div>

      <MediaGrid items={items} />

      <MediaUploadModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />
    </LeadersPanelLayout>
  );
}
