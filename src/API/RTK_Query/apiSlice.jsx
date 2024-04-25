import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const smartHomeAPI = createApi({
  reducerPath: "smartHomeAPI",
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_QUI_URL,
    prepareHeaders: (headers, { getState }) => {
      // Thêm X-AIO-Key vào header
      headers.set("X-AIO-Key", process.env.REACT_APP_QUI_KEY);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getLivingroom: builder.query({
      // Định nghĩa hàm truy vấn API
      query: () => "/livingroom/data/last",
    }),
    getTemperature: builder.query({
        query: () => "/temp/data/last",
    }),
    getHumidity: builder.query({
      query: () => "/humi/data/last",
    }),
    getLux: builder.query({
      query: () => "/light/data/last",
    }),
    getChandeliers: builder.query({
      query: () => "/chandeliers/data/last",
    }),
    getAC: builder.query({
      query: () => "/control-fan/data/last",
    }),
    getTempAC: builder.query({
      query: () => "/ac/data/last",
    }),
    postLivingroom: builder.mutation({
      query: (body) => ({
        url: "/livingroom/data",
        method: 'POST',
        body,
        transformResponse: (response, meta, arg) => response.data,
      })
    }),
    postChandeliers: builder.mutation({
      query: (body) => ({
        url: "/chandeliers/data",
        method: 'POST',
        body,
        transformResponse: (response, meta, arg) => response.data,
      })
    }),
    postAC: builder.mutation({
      query: (body) => ({
        url: "/control-fan/data",
        method: 'POST',
        body,
        transformResponse: (response, meta, arg) => response.data,
      })
    }),
    postTempAC: builder.mutation({
      query: (body) => ({
        url: "/ac/data",
        method: 'POST',
        body,
        transformResponse: (response, meta, arg) => response.data,
      })
    }),
  })
});

export const { useGetLivingroomQuery, useGetTemperatureQuery, useGetHumidityQuery, useGetLuxQuery, 
  useGetChandeliersQuery, useGetACQuery, useGetTempACQuery,
  usePostLivingroomMutation, usePostChandeliersMutation,usePostACMutation, usePostTempACMutation } 
  = smartHomeAPI;