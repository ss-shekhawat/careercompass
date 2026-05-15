import { api } from '../api';

export const assessmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Start Assessment
    startAssessment: builder.mutation({
      query: ({ test_id, resume_type } = {}) => ({
        url: '/v1/student/assessment/start',
        method: 'POST',
        body: {
          ...(test_id !== undefined && test_id !== null ? { test_id } : {}),
          ...(resume_type ? { resume_type } : {}),
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    // Submit Answers
    submitCTestAnswer: builder.mutation({
      query: ({ session_id, question_id, answer_value, is_final_answer_for_section }) => ({
        url: `/v1/student/assessment/${session_id}/personality-test/answer`,
        method: 'POST',
        body: {
          question_id,
          answer_value,
          ...(is_final_answer_for_section !== undefined && {
            is_final_answer_for_section,
          }),
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    submitITestAnswer: builder.mutation({
      query: ({ session_id, question_id, answer_value, is_final_answer_for_section }) => ({
        url: `/v1/student/assessment/${session_id}/interest-test/answer`,
        method: 'POST',
        body: {
          question_id,
          answer_value,
          ...(is_final_answer_for_section !== undefined && {
            is_final_answer_for_section,
          }),
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    submitATestAnswer: builder.mutation({
      query: ({ session_id, question_id, answer_value, is_final_answer_for_section }) => ({
        url: `/v1/student/assessment/${session_id}/aptitude-test/answer`,
        method: 'POST',
        body: {
          question_id,
          answer_value,
          ...(is_final_answer_for_section !== undefined && {
            is_final_answer_for_section,
          }),
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    // Fetch Assessment Status
    fetchAssessmentStatus: builder.query({
      query: () => ({
        url: `/v1/student/assessment/current-status`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    // Report Issue
    reportAssessmentIssue: builder.mutation({
      query: ({ session_id, issue_type, description, question_id }) => ({
        url: `/v1/student/assessment/${session_id}/report-issue`,
        method: 'POST',
        body: {
          issue_type,
          description,
          question_id,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    // Submit Assessment
    submitAssessment: builder.mutation({
      query: ({ session_id }) => ({
        url: `/v1/student/assessment/${session_id}/submit`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    //  Submit All Section Times
    submitAllSectionTimes: builder.mutation({
      query: ({ session_id, timetaken }) => ({
        url: `/v1/student/assessment/all-times`,
        method: 'POST',
        body: {
          session_id,
          timetaken,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    // Fetch C-Test Details
    fetchCTestDetails: builder.query({
      query: ({ sessionId }) => ({
        url: `/v1/student/assessment/${sessionId}/personality-test`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    // Fetch I-Test Details
    fetchITestDetails: builder.query({
      query: ({ sessionId }) => ({
        url: `/v1/student/assessment/${sessionId}/interest-test`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    // Fetch A-Test Details
    fetchATestDetails: builder.query({
      query: ({ sessionId }) => ({
        url: `/v1/student/assessment/${sessionId}/aptitude-test`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),
    getCareerRecommendations: builder.query({
        query: (sessionId) => ({
          url: `/v1/student/career-recommendations/${sessionId}/recommendations`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['CareerRecommendations'],
      }),
  
      submitCareerFeedback: builder.mutation({
        query: ({ session_id, career_id, feedback }) => ({
          url: `/v1/student/career-recommendations/career/feedback`,
          method: 'POST',
          body: { session_id, career_id, feedback },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }),
        invalidatesTags: ['CareerRecommendations'],
      }),
  
      getCustomStrengths: builder.mutation({
        query: ({ reportId, ...body }) => ({
          url: `/v1/student/reports/${reportId}/custom-strengths`,
          method: 'POST',
          body,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }),
      }),
  
      getStudentReportDownloadUrl: builder.query({
        query: ( sessionId ) => ({
          url: `/v1/student/reports/${sessionId}/download-url`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['CareerRecommendations'],
      }),
      getIssues: builder.query({
        query: ({ page = 1, size = 10 } = {}) => ({
          url: `/v1/student/assessment/issues?page=${page}&size=${size}`,
          method: 'GET',
        }),
        providesTags: ['Issues'],
      }),
      getStudentStrengthsWeaknesses: builder.query({
        query: (session_id) => ({
          url: `/v1/student/reports/${session_id}/strengths-weaknesses`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['Reports'],
      }),
  
      getStudentReports: builder.query({
        query: ({ status } = {}) => {
          let url = `/v1/student/reports`;
          if (status) {
            url += `?status=${encodeURIComponent(status)}`;
          }
          return {
            url,
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          };
        },
        providesTags: ['Reports'],
      }),
  
      getStudentResultsSummary: builder.query({
        query: ({ session_id }) => ({
          url: `/v1/student/reports/${session_id}/results-summary`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['Reports'],
      }),
  
      // ✅ New API: Student Report Download URL
      getStudentReportDownloadUrl: builder.query({
        query: (report_id) => ({
          url: `/v1/student/reports/${report_id}/download-url`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['Reports'],
      }),
  
      getAllAdminReports: builder.query({
        query: ({ page = 1, size = 10, status, start_date, end_date, student_name, school, test_id } = {}) => {
          const params = new URLSearchParams({ page: String(page), size: String(size) });
          if (status) params.append('status', status);
          if (start_date) params.append('start_date', start_date);
          if (end_date) params.append('end_date', end_date);
          if (student_name) params.append('student_name', student_name);
          if (school) params.append('school', school);
          if (test_id !== undefined && test_id !== null) params.append('test_id', String(test_id));

          const url = `/v1/admin/reports?${params.toString()}`;
          return {
            url,
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          };
        },
        providesTags: ['Reports'],
      }),
  
      getAdminReportById: builder.query({
        query: (report_id) => ({
          url: `/v1/admin/reports/${report_id}`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['Reports'],
      }),

      // Report Versions endpoint (returns list of versions for a session/report)
      getReportVersions: builder.query({
        query: (session_id) => ({
          url: `/v1/reports/${session_id}/versions`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['Reports'],
      }),
      // Get specific report version detail
      getReportVersionById: builder.query({
        query: ({ session_id, version_id } = {}) => ({
          url: `/v1/reports/${session_id}/versions/${version_id}`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['Reports'],
      }),
  
      getAdminSectionTimes: builder.query({
        query: ({ session_id, student_id }) => ({
          url: `/v1/admin/analytics/section-times?session_id=${encodeURIComponent(
            session_id
          )}&student_id=${encodeURIComponent(student_id)}`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['Reports'],
      }),
  
      getAdminRecommendations: builder.query({
        query: (session_id) => ({
          url: `/v1/admin/${session_id}/recommendations`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['Reports'],
      }),
  

      getAdminStrengthsWeaknesses: builder.query({
        query: ({ session_id }) => ({
          url: `/v1/admin/${encodeURIComponent(session_id)}/strengths-weaknesses`,
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }),
        providesTags: ['Reports'],
      }),

      resendAdminReport: builder.mutation({
        query: (report_id) => ({
          url: `/v1/admin/reports/${report_id}/resend`,
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
        }),
        invalidatesTags: ['Reports'],
      }),
  
      updateStudentReportStatus: builder.mutation({
        query: ({ reportId, payload }) => ({
          url: `/v1/student/reports/reports/${reportId}/status`,
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: payload,
        }),
        invalidatesTags: ['Reports'],
      }),
  }),
});

export const {
  useStartAssessmentMutation,
  useSubmitCTestAnswerMutation,
  useSubmitITestAnswerMutation,
  useSubmitATestAnswerMutation,
  useFetchAssessmentStatusQuery,
  useReportAssessmentIssueMutation,
  useSubmitAssessmentMutation,
  useSubmitAllSectionTimesMutation,
  useFetchCTestDetailsQuery,
  useFetchITestDetailsQuery,
  useFetchATestDetailsQuery,
  useGetCareerRecommendationsQuery,
  useSubmitCareerFeedbackMutation,
  useGetCustomStrengthsMutation,
  useGetStudentReportDownloadUrlQuery,
  useGetIssuesQuery,
  useGetStudentStrengthsWeaknessesQuery,
  useGetStudentReportsQuery,
  useGetStudentResultsSummaryQuery,
  useGetAllAdminReportsQuery,
  useGetAdminReportByIdQuery,
  useGetReportVersionsQuery,
  useGetReportVersionByIdQuery,
  useGetAdminSectionTimesQuery,
  useGetAdminRecommendationsQuery,
  useGetAdminStrengthsWeaknessesQuery,
  useResendAdminReportMutation,
  useUpdateStudentReportStatusMutation,
} = assessmentApi;
