import { useState } from "react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { EditTruck, TrucksList, CreateTruck } from "./components";
import {
  useTrucksList,
  useDeleteTruck,
  useEditTruck,
  useCreateTruck,
} from "./hooks";

export const Trucks = () => {
  const {
    trucks,
    pages,
    currentPage,
    isTrucksListSuccess,
    onPageChange,
    onTrucksListSort,
    refetchTrucksList,
  } = useTrucksList();
  const { onEditTruck } = useEditTruck(() => {
    closeEditTruckModal();
    refetchTrucksList();
  });
  const { onDelete } = useDeleteTruck(() => {
    refetchTrucksList();
  });
  const { onCreateTruck } = useCreateTruck(() => {
    closeCreateTruckModal();
    refetchTrucksList();
  });

  const [selectedEditTruckId, setSelectedEditTruckId] = useState<number | null>(
    null
  );
  const [
    createTruckModalOpened,
    { open: openCreateTruckModal, close: closeCreateTruckModal },
  ] = useDisclosure(false);
  const [
    editTruckModalOpened,
    { open: openEditTruckModal, close: closeEditTruckModal },
  ] = useDisclosure(false);

  return (
    <>
      <h1 style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        Trucks!
        <Button color="green" size="xs" onClick={openCreateTruckModal}>
          Create
        </Button>
      </h1>
      {isTrucksListSuccess && (
        <TrucksList
          total={pages}
          page={currentPage}
          onPageChange={onPageChange}
          onSort={onTrucksListSort}
          trucks={trucks}
          onDelete={onDelete}
          onEdit={(id: number) => {
            setSelectedEditTruckId(id);
            openEditTruckModal();
          }}
        />
      )}
      <Modal
        opened={createTruckModalOpened}
        onClose={closeCreateTruckModal}
        title="Create a new truck"
        size="xl"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <CreateTruck onAdd={onCreateTruck} />
      </Modal>
      {selectedEditTruckId && (
        <Modal
          opened={editTruckModalOpened}
          onClose={closeEditTruckModal}
          title="Edit a truck"
          size="xl"
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          <EditTruck truckId={selectedEditTruckId} onEdit={onEditTruck} />
        </Modal>
      )}
    </>
  );
};
