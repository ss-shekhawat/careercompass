import { api } from '../api';

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPaymentHistory: builder.query({
      query: ({ page = 1, size = 20, search, status, school, test_name, start_date, end_date }) => ({
        url: '/v1/payments/admin/history',
        params: {
          page,
          size,
          search: search || undefined,
          status_filter: status || undefined,
          school: school || undefined,           // ← Add this
          test_name: test_name || undefined,     // ← Add this
          start_date: start_date || undefined,
          end_date: end_date || undefined,
        },
      }),
      providesTags: ['Payments'],
    }),
    exportPaymentHistoryCsv: builder.query({
      query: ({ search, status, school, test_name, start_date, end_date }) => ({
        url: '/v1/payments/admin/export-csv',
        params: {
          search: search || undefined,
          status_filter: status || undefined,
          school: school || undefined,
          test_name: test_name || undefined,
          start_date: start_date || undefined,
          end_date: end_date || undefined,
        },
        // Request CSV and handle response as text
        headers: { Accept: 'text/csv' },
        responseHandler: (response) => response.text(),
      }),
    }),
    initiatePayment: builder.mutation({
      query: (payload) => ({
        url: '/v1/payments/initiate',
        method: 'POST',
        body: payload,
      }),
      // initiating a payment may lead to a subscription change on verify,
      // invalidate subscription and plans so UI can refetch when mutated.
      invalidatesTags: ['StudentSubscription', 'Plans'],
    }),
    verifyPayment: builder.mutation({
      query: (payload) => ({
        url: '/v1/payments/verify',
        method: 'POST',
        body: payload,
      }),
      // after verifying payment, subscription and available plans likely changed
      // invalidate to trigger refetch of subscription and plans data
      invalidatesTags: ['StudentSubscription', 'Plans'],
    }),
    getStudentPaymentHistory: builder.query({
      query: ({ page = 1, size = 10 } = {}) => ({
        url: '/v1/payments/student/history',
        params: {
          page,
          size,
        },
      }),
      providesTags: ['StudentPayments'],
    }),
    getStudentCurrentSubscription: builder.query({
      query: () => ({
        url: '/v1/payments/student/subscription',
        method: 'GET',
      }),
      providesTags: ['StudentSubscription'],
    }),
    downloadInvoice: builder.query({
      query: (invoiceId) => ({
        url: `/v1/payments/student/invoice/${invoiceId}`,
        method: 'GET',
        responseHandler: (response) => response.blob(),
      }),
    }),
    // Get available plans for profile (public endpoint)
    getProfilePlans: builder.query({
      query: () => ({
        url: '/v1/profile/plans',
        method: 'GET',
      }),
      providesTags: ['Plans'],
    }),
    // Verify a code (e.g., promo or test verification)
    verifyCode: builder.query({
      query: (code) => ({
        url: `/v1/verify/${code}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAdminPaymentHistoryQuery,
  useLazyExportPaymentHistoryCsvQuery,
  useInitiatePaymentMutation,
  useVerifyPaymentMutation,
  useGetStudentPaymentHistoryQuery,
  useGetStudentCurrentSubscriptionQuery,
  useLazyDownloadInvoiceQuery,
  useGetProfilePlansQuery,
  useVerifyCodeQuery,
  useLazyVerifyCodeQuery,
} = paymentApi;
