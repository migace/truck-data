import { notifications } from "@mantine/notifications";

import { useEditTruckMutation } from "../../../services/truckApi";
import { Truck } from "../../../types";

export const useEditTruck = (onEditTruckCallback: () => void) => {
  const [editTruck] = useEditTruckMutation();

  const onEditTruck = (truck: Partial<Truck>) => {
    editTruck(truck)
      .unwrap()
      .then(() => {
        onEditTruckCallback();
        notifications.show({
          title: "Success",
          message: "The truck has been updated!",
          color: "green",
        });
      });
  };

  return {
    onEditTruck,
  };
};
