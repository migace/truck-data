import { SyntheticEvent, useEffect } from "react";
import { Button, Group, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import * as changeCase from "change-case";

import { Truck, TruckStatus } from "../../../types";

type CreateTruckProps = {
  onAdd: (truck: Omit<Truck, "id">) => void;
};

export const CreateTruck = ({ onAdd }: CreateTruckProps) => {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      code: "",
      name: "",
      description: "",
      status: TruckStatus.ToJob,
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

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.isValid()) {
      form.validate();

      return;
    }

    const formValues = form.getValues();
    formValues.status = changeCase.constantCase(
      formValues.status
    ) as TruckStatus;

    onAdd(formValues);
  };

  useEffect(() => {
    if (form.isDirty()) {
      form.validate();
    }
  }, [form, form.values]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
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
          <Button type="submit" color="green">
            Create!
          </Button>
        </Group>
      </form>
    </div>
  );
};
