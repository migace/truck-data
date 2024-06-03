import { notifications } from "@mantine/notifications";

import { useDeleteTruckMutation } from "../../../services/truckApi";

export const useDeleteTruck = (onDeleteCallback: () => void) => {
  const [deleteTruck] = useDeleteTruckMutation();

  const onDelete = (id: number) =>
    deleteTruck(id)
      .unwrap()
      .then(() => {
        notifications.show({
          title: "Success",
          message: "The truck has been deleted!",
          color: "green",
        });

        onDeleteCallback();
      });

  return {
    onDelete,
  };
};
