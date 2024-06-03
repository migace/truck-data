import * as changeCase from "change-case";

import { TruckStatus } from "../../../types";

export const canChangeStatus = (
  currentStatus: TruckStatus,
  newStatus: TruckStatus
): boolean => {
  const formattedCurrentStatus = changeCase.sentenceCase(currentStatus);
  const formattedNewStatus = changeCase.sentenceCase(newStatus);

  if (formattedNewStatus === changeCase.sentenceCase(TruckStatus.OutOfService))
    return true;
  if (
    formattedCurrentStatus === changeCase.sentenceCase(TruckStatus.OutOfService)
  )
    return true;

  const order = [
    changeCase.sentenceCase(TruckStatus.Loading),
    changeCase.sentenceCase(TruckStatus.ToJob),
    changeCase.sentenceCase(TruckStatus.AtJob),
    changeCase.sentenceCase(TruckStatus.Returning),
  ];
  const currentIndex = order.indexOf(formattedCurrentStatus);
  const newIndex = order.indexOf(formattedNewStatus);

  return (
    newIndex === currentIndex + 1 ||
    (formattedCurrentStatus ===
      changeCase.sentenceCase(TruckStatus.Returning) &&
      changeCase.sentenceCase(formattedNewStatus) ===
        changeCase.sentenceCase(TruckStatus.Loading))
  );
};
