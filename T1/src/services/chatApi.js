import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    connectWebSocket: builder.query({
      queryFn: () => {
        const socket = new WebSocket('wss://ws.ifelse.io');
        return { data: socket };
      },
    }),
  }),
});

export const { useConnectWebSocketQuery } = chatApi;