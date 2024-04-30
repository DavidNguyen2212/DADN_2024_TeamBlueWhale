import { createApi, fetchBaseQuery, useQueries } from '@reduxjs/toolkit/query/react';

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
    getAllAttributes: builder.query({
      // query: () => "/temp/data/last",
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
          // Fetch tất cả bằng Promise.all
          const [temp, humi, lux, chandeliers, AC, tempAC] = await Promise.all([
            fetchWithBQ("/temp/data/last"),
            fetchWithBQ("/humi/data/last"),
            fetchWithBQ("/light/data/last"),
            fetchWithBQ("/chandeliers/data/last"),
            fetchWithBQ("/control-fan/data/last"),
            fetchWithBQ("/ac/data/last")
          ]);

          // Kiểm tra lỗi của mỗi truy vấn
          if (temp.error || humi.error || lux.error || chandeliers.error || AC.error || tempAC.error) {
            return { error: 'One or more queries failed' };
          }

          // Trả về dữ liệu từ tất cả các truy vấn
          return {data: [temp.data.value, humi.data.value, lux.data.value, chandeliers.data.value, AC.data.value, tempAC.data.value]}
      },
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

export const { useGetAllAttributesQuery, useGetTemperatureQuery, useGetHumidityQuery, useGetLuxQuery, 
  useGetChandeliersQuery, useGetACQuery, useGetTempACQuery,
  usePostLivingroomMutation, usePostChandeliersMutation,usePostACMutation, usePostTempACMutation } 
  = smartHomeAPI;