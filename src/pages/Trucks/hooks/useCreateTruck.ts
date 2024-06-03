import { notifications } from "@mantine/notifications";

import { useCreateTruckMutation } from "../../../services/truckApi";
import { Truck } from "../../../types";

export const useCreateTruck = (onCreateTruckCallback: () => void) => {
  const [createTruck] = useCreateTruckMutation();

  const onCreateTruck = (truck: Omit<Truck, "id">) => {
    createTruck(truck)
      .unwrap()
      .then(() => {
        onCreateTruckCallback();
        notifications.show({
          title: "Success",
          message: "The truck has been created!",
          color: "green",
        });
      })
      .catch((err) => {
        console.log(err);
        notifications.show({
          title: "An error occurred while creating the truck!",
          message: err?.data?.code || "Server not responding!",
          color: "red",
        });
      });
  };

  return {
    onCreateTruck,
  };
};
