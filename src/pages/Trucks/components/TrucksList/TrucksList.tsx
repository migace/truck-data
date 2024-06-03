import { Button, Pagination, Table, Text } from "@mantine/core";
import { useMemo, useState } from "react";

import { Truck } from "../../../../types";

import { Th } from "./Th";

type TrucksListProps = {
  trucks: Truck[];
  total: number;
  page: number;
  onSort: (field: keyof Truck, reversed: boolean) => void;
  onPageChange: (page: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export const TrucksList = ({
  total,
  trucks,
  page,
  onSort,
  onDelete,
  onPageChange,
  onEdit,
}: TrucksListProps) => {
  const [sortBy, setSortBy] = useState<keyof Truck | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const rows = useMemo(
    () =>
      trucks.map((truck) => (
        <Table.Tr key={truck.id}>
          <Table.Td>{truck.id}</Table.Td>
          <Table.Td>{truck.name}</Table.Td>
          <Table.Td>{truck.code}</Table.Td>
          <Table.Td>{truck.status}</Table.Td>
          <Table.Td>
            {truck.description.length > 30
              ? `${truck.description.slice(0, 30)}...`
              : truck.description}
          </Table.Td>
          <Table.Td style={{ display: "flex", gap: "8px" }}>
            <Button color="orange" size="xs" onClick={() => onEdit(truck.id)}>
              Edit
            </Button>
            <Button color="red" size="xs" onClick={() => onDelete(truck.id)}>
              Delete
            </Button>
          </Table.Td>
        </Table.Tr>
      )),
    [onDelete, onEdit, trucks]
  );

  const setSorting = (field: keyof Truck) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);

    onSort(field, reversed);
  };

  return (
    <>
      <Table.ScrollContainer minWidth={500}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === "code"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("code")}
              >
                Code
              </Th>
              <Th
                sorted={sortBy === "status"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("status")}
              >
                Status
              </Th>
              <Th
                sorted={sortBy === "description"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("description")}
              >
                Description
              </Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Pagination value={page} total={total} onChange={onPageChange} />
    </>
  );
};
