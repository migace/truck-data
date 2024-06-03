import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Truck } from "../types";
import { API_BASE_URL } from "../config";

export const truckApi = createApi({
  reducerPath: "truckApi",
  tagTypes: ["Truck"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getTrucks: builder.query<
      { trucks: Truck[]; pages: number },
      {
        limit: number;
        page: number;
        sort?: keyof Truck | null;
        order?: boolean;
      }
    >({
      query: ({ limit, page, sort, order }) => {
        const url = `trucks?limit=${limit}&page=${page}`;

        if (sort) {
          return `${url}&sort=${sort}&order=${order ? "asc" : "desc"}`;
        }

        return url;
      },
      transformResponse(apiResponse, meta, arg) {
        return {
          trucks: apiResponse as Truck[],
          pages: Math.ceil(
            Number(meta?.response?.headers.get("X-Total-Count")) / arg.limit
          ),
        };
      },
      providesTags: ["Truck"],
    }),
    getTruckById: builder.query<Truck, number>({
      query: (id) => `trucks/${id}`,
      providesTags: ["Truck"],
    }),
    deleteTruck: builder.mutation<void, number>({
      query: (id) => ({
        url: `trucks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Truck"],
    }),
    editTruck: builder.mutation<Truck, Partial<Truck>>({
      query: ({ id, ...body }) => ({
        url: `trucks/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Truck"],
    }),
    createTruck: builder.mutation<Truck, Partial<Truck>>({
      query: (body) => ({
        url: `trucks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Truck"],
    }),
  }),
});

export const {
  useGetTrucksQuery,
  useGetTruckByIdQuery,
  useEditTruckMutation,
  useDeleteTruckMutation,
  useCreateTruckMutation,
} = truckApi;
