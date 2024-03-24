import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const smartHomeAPI = createApi({
  reducerPath: "smartHomeAPI",
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Thêm X-AIO-Key vào header
      headers.set("X-AIO-Key", process.env.REACT_APP_HEADER_X_AIO_KEY);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getLivingroom: builder.query({
      // Định nghĩa hàm truy vấn API
      query: () => "/livingroom/data/last",
    }),
    getTemperature: builder.query({
        query: () => "/temperature/data/last",
    }),
    getHumidity: builder.query({
      query: () => "/humidity/data/last",
    }),
    getLux: builder.query({
      query: () => "/lux/data/last",
    }),
    postLivingroom: builder.mutation({
      query: (body) => ({
        url: "/livingroom/data",
        method: 'POST',
        body,
        transformResponse: (response, meta, arg) => response.data,
      })
    }),
  })
});

export const { useGetLivingroomQuery, useGetTemperatureQuery, useGetHumidityQuery, useGetLuxQuery, usePostLivingroomMutation } = smartHomeAPI;