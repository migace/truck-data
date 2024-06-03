import {
  Button,
  Group,
  Select,
  Textarea,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import * as changeCase from "change-case";
import { FormEvent, useEffect, useState } from "react";

import { Truck, TruckStatus } from "../../../types";
import { useGetTruckByIdQuery } from "../../../services/truckApi";

import { canChangeStatus } from "./utils";

type EditTruckProps = {
  truckId: number;
  onEdit: (editTruck: Partial<Truck>) => void;
};

export const EditTruck = ({ truckId, onEdit }: EditTruckProps) => {
  const [isPossibleToChangeStatus, setIsPossibleToChangeStatus] =
    useState(true);
  const { data: truckData, isSuccess } = useGetTruckByIdQuery(truckId);
  const form = useForm({
    mode: "controlled",
    initialValues: {
      code: "",
      name: "",
      description: "",
      status: "",
    },
    validate: {
      code: (value) => {
        if (!value) {
          return "Code is required!";
        }
      },
      name: (value) => {
        if (!value) {
          return "Name is required!";
        }
      },
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.isValid()) {
      form.validate();

      return;
    }

    const formValues = form.getValues();
    const editedTruckFormValues: Partial<Truck> = {
      ...formValues,
      status: changeCase.constantCase(formValues.status) as TruckStatus,
    };

    if (truckData?.status && isPossibleToChangeStatus) {
      onEdit(editedTruckFormValues);
    } else {
      setIsPossibleToChangeStatus(false);
    }
  };

  useEffect(() => {
    if (truckData) {
      form.initialize({
        ...truckData,
        status: changeCase.sentenceCase(truckData.status),
      });
    }
  }, [form, truckData, isSuccess]);

  useEffect(() => {
    if (truckData?.status) {
      if (form.isDirty("status")) {
        setIsPossibleToChangeStatus(
          canChangeStatus(truckData.status, form.values.status as TruckStatus)
        );
      }

      if (form.isDirty()) {
        form.validate();
      }
    }
  }, [form, form.values.status, truckData?.status]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {!isPossibleToChangeStatus && truckData?.status && (
          <Text size="md" c="red">
            Cannot change status, old status:{" "}
            {changeCase.sentenceCase(truckData.status)} to new status:{" "}
            {form.getValues().status}
          </Text>
        )}
        <div style={{ display: "flex", gap: "16px" }}>
          <TextInput
            style={{ flex: 1 }}
            label="Name"
            placeholder="Dump Truck"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            style={{ flex: 1 }}
            label="Code"
            placeholder="QOJ16DM"
            key={form.key("code")}
            {...form.getInputProps("code")}
          />
        </div>
        <Textarea
          label="Description"
          placeholder="capto carus texo averto cuius taceo"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        <Select
          label="Status"
          placeholder="Pick value"
          data={Object.values(TruckStatus).map((item) =>
            changeCase.sentenceCase(item)
          )}
          key={form.key("status")}
          {...form.getInputProps("status")}
        />
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            color="green"
            disabled={!isPossibleToChangeStatus}
          >
            Edit
          </Button>
        </Group>
      </form>
    </div>
  );
};
