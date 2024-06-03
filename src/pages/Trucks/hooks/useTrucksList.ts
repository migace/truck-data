import { useEffect, useState } from "react";
import { useGetTrucksQuery } from "../../../services/truckApi";
import { TRUCKS_LIMIT } from "../../../config";
import { Truck } from "../../../types";

export const useTrucksList = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [sortTrucksBy, setSortTrucksBy] = useState<keyof Truck | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: trucksList,
    isSuccess: isTrucksListSuccess,
    refetch: refetchTrucksList,
  } = useGetTrucksQuery({
    limit: TRUCKS_LIMIT,
    page: currentPage,
    sort: sortTrucksBy,
    order: reverseSortDirection,
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onTrucksListSort = (field: keyof Truck, reversed: boolean) => {
    setReverseSortDirection(reversed);
    setSortTrucksBy(field);
  };

  useEffect(() => {
    if (trucksList) {
      setTrucks(trucksList.trucks);
    }
  }, [trucksList]);

  return {
    trucks,
    pages: trucksList?.pages ?? 1,
    isTrucksListSuccess,
    currentPage,
    onPageChange,
    onTrucksListSort,
    refetchTrucksList,
  };
};
