import { api } from '../api';

export const testApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCTest: builder.mutation({
      query: (body) => ({
        url: '/v1/admin/questions/personality-test',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    addITest: builder.mutation({
      query: (body) => ({
        url: '/v1/admin/questions/interest-test',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    addATest: builder.mutation({
      query: (body) => ({
        url: '/v1/admin/questions/aptitude-test',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getTests: builder.query({
      query: (params) => {
        const { skip = 0, limit = 50 } = params || {};
        return {
          url: `/v1/admin/tests`,
          method: 'GET',
          params: { skip, limit },
        };
      },
      providesTags: ['Tests'],
    }),

    // POST create test
    createTest: builder.mutation({
      query: (newTestData) => ({
        url: `/v1/admin/tests`,
        method: 'POST',
        body: newTestData,
      }),
      invalidatesTags: ['Tests'],
    }),

    // PUT update test by ID
    updateTest: builder.mutation({
      query: ({ test_id, updatedTestData }) => ({
        url: `/v1/admin/tests/${test_id}`,
        method: 'PUT',
        body: updatedTestData,
      }),
      invalidatesTags: ['Tests'],
    }),

    // DELETE test by ID
    deleteTest: builder.mutation({
      query: ({ test_id }) => ({
        url: `/v1/admin/tests/${test_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tests'],
    }),

    // GET test types
    getTestTypes: builder.query({
      query: () => ({
        url: `/v1/admin/tests/types`,
        method: 'GET',
      }),
    }),

    // GET section counts for a test by ID
    getTestSectionCounts: builder.query({
      query: (test_id) => ({
        url: `/v1/admin/tests/${test_id}/section-counts`,
        method: 'GET',
      }),
    }),
    deleteCTestQuestion: builder.mutation({
      query: (test_id) => ({
        url: `/v1/admin/questions/personality-test/${test_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CTest'],
    }),
    deleteITestQuestion: builder.mutation({
      query: (test_id) => ({
        url: `/v1/admin/questions/interest-test/${test_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ITest'],
    }),
    deleteATestQuestion: builder.mutation({
      query: (test_id) => ({
        url: `/v1/admin/questions/aptitude-test/${test_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ATest'],
    }),

    // GET endpoints
    // GET endpoints with page and size support
    getCTestQuestions: builder.query({
      query: ({ page = 1, size = 10, search = '' }) => {
        let url = `/v1/admin/questions/personality-test?page=${page}&size=${size}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        return url;
      },
      providesTags: ['CTest'],
    }),
    getITestQuestions: builder.query({
      query: ({ page = 1, size = 10, search = '' }) => {
        let url = `/v1/admin/questions/interest-test?page=${page}&size=${size}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        return url;
      },
      providesTags: ['ITest'],
    }),
    getATestQuestions: builder.query({
      query: ({ page = 1, size = 10, search = '' }) => {
        let url = `/v1/admin/questions/aptitude-test?page=${page}&size=${size}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        return url;
      },
      providesTags: ['ATest'],
    }),
    getNormalTestQuestions: builder.query({
      query: ({ page = 1, size = 10 }) =>
        `/v1/admin/normal-test/questions?page=${page}&size=${size}`,
      providesTags: ['NormalTest'],
    }),

    // PUT endpoints
    updateCTestQuestion: builder.mutation({
      query: ({ test_id, data }) => ({
        url: `/v1/admin/questions/personality-test/${test_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CTest'],
    }),
    updateITestQuestion: builder.mutation({
      query: ({ test_id, data }) => ({
        url: `/v1/admin/questions/intersest-test/${test_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ITest'],
    }),
    updateATestQuestion: builder.mutation({
      query: ({ test_id, data }) => ({
        url: `/v1/admin/questions/aptitude-test/${test_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ATest'],
    }),
    fetchCTestQuestions: builder.query({
      query: ({ sessionId }) =>
        `/v1/student/assessment/${sessionId}/personality-test/questions`,
    }),

    fetchITestQuestions: builder.query({
      query: ({ sessionId }) =>
        `/v1/student/assessment/${sessionId}/interest-test/questions`,
    }),

    fetchATestQuestions: builder.query({
      query: ({ sessionId }) =>
        `/v1/student/assessment/${sessionId}/aptitude-test/questions`,
    }),

    submitAssessmentTimes: builder.mutation({
      query: (payload) => ({
        url: `/v1/student/assessment/all-times`,
        method: 'POST',
        body: payload,
      }),
    }),

    fetchCTieBreakerQuestions: builder.mutation({
      query: ({ sessionId, payload }) => ({
        url: `/v1/student/assessment/${sessionId}/personality-test/tie-breaker`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { 
    useAddCTestMutation, 
    useAddITestMutation, 
    useAddATestMutation,
    useGetTestsQuery,
    useCreateTestMutation,
    useUpdateTestMutation,
    useDeleteTestMutation,
    useGetTestTypesQuery,
    useGetTestSectionCountsQuery,
    useDeleteCTestQuestionMutation,
    useDeleteITestQuestionMutation,
    useDeleteATestQuestionMutation,
    useGetCTestQuestionsQuery,
    useGetITestQuestionsQuery,
    useGetATestQuestionsQuery,
    useUpdateCTestQuestionMutation,
    useUpdateITestQuestionMutation,
    useUpdateATestQuestionMutation,
    useGetNormalTestQuestionsQuery,
    useFetchCTestQuestionsQuery,
    useFetchITestQuestionsQuery,
    useFetchATestQuestionsQuery,
    useSubmitAssessmentTimesMutation,
    useFetchCTieBreakerQuestionsMutation,
 } = testApi;
