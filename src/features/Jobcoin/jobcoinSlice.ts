import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobcoinApi = createApi({
  reducerPath: "jobcoinApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jobcoin.gemini.com/embezzle-blissful/api",
  }),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getAddress: builder.query({
      query: (address) => `addresses/${address}`,
      providesTags: ["Transaction"],
    }),
    sendTransaction: builder.mutation({
      query: (transaction) => ({
        url: `transactions`,
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const { useGetAddressQuery, useSendTransactionMutation } = jobcoinApi;
