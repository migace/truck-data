export enum TruckStatus {
  OutOfService = "OUT_OF_SERVICE",
  Loading = "LOADING",
  ToJob = "TO_JOB",
  AtJob = "AT_JOB",
  Returning = "RETURNING",
}

export type Truck = {
  id: number;
  code: string;
  name: string;
  status: TruckStatus;
  description: string;
};
