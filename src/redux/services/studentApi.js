import { api } from "../api";

export const studentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/v1/profile/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
      keepUnusedDataFor: 0,
    }),

    updateProfile: builder.mutation({
      query: (updatedData) => ({
        url: "/v1/profile/profile",
        method: "PUT",
        body: updatedData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Profile"],
    }),

    uploadProfilePicture: builder.mutation({
      query: (formData) => ({
        url: "/v1/profile/upload-profile-picture", // verify backend route
        method: "POST",
        body: formData,
        // Don't manually set Content-Type for FormData
        // browser sets multipart/form-data boundary automatically
      }),
      invalidatesTags: ["Profile"],
    }),

    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/v1/profile/change-password",
        method: "POST",
        body: passwordData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),

    // Add dashboard stats endpoint
    getDashboardStats: builder.query({
      query: () => ({
        url: "v1/profile/dashboard/stats",
        method: "GET",
      }),
    }),

    // Get student dashboard overview
    getDashboardOverview: builder.query({
      query: () => ({
        url: "/v1/student/dashboard/overview",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    //  Fetch Normal Test Questions (for student)
    getNormalTestQuestions: builder.query({
      query: () => ({
        url: `/v1/student/profile_test/questions`,
        method: "GET",
        params: { is_parent: false },
      }),
      providesTags: ["NormalTest"],
    }),

    // Fetch Parent Normal Test Questions
    getParentNormalTestQuestions: builder.query({
      query: () => ({
        url: `/v1/student/profile_test/questions`,
        method: "GET",
        params: { is_parent: true },
      }),
      providesTags: ["NormalTest"],
    }),

    //  Submit Normal Test
    submitNormalTest: builder.mutation({
      query: (payload) => ({
        url: `/v1/student/pre-assessment/submit`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["NormalTest"],
    }),
    // GET student/parent test responses (RENAMED from getNormalTestQuestions)
    getStudentTestResponses: builder.query({
      query: (studentId) => ({
        url: `/v1/admin/reports/profile-test-responses/${studentId}`,
        method: "GET",
      }),
      providesTags: ["NormalTest"],
    }),

    //  Get Normal Test Status
    getNormalTestStatus: builder.query({
      query: () => ({
        url: `/v1/student/profile-test/status`,
        method: "GET",
      }),
      providesTags: ["NormalTest"],
    }),
    finalizeCTestSection: builder.mutation({
      query: ({ session_id }) => ({
        url: `/v1/student/assessment/${session_id}/personality-test/finalize-section`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),

    getAvailableSlots: builder.query({
      query: ({ counsellor_id, start_date, end_date } = {}) => ({
        url: `/v1/student/slots/available`,
        method: "GET",
        params: {
          counsellor_id,
          start_date,
          end_date,
        },
      }),
      providesTags: ["Slots"],
    }),

    bookSlot: builder.mutation({
      query: ({ slot_id }) => ({
        url: `/v1/student/slots/book`,
        method: "POST",
        body: { slot_id },
      }),
      invalidatesTags: ["Slots", "Calendar"],
    }),

    getStudentCalendar: builder.query({
      query: (studentId) => ({
        url: `/v1/calendar/student/${studentId}`,
        method: "GET",
      }),
      providesTags: ["Calendar"],
    }),

    rescheduleBooking: builder.mutation({
      query: ({ booking_id, new_slot_id }) => ({
        url: `/v1/student/slots/${booking_id}/reschedule`,
        method: "POST",
        body: { new_slot_id },
      }),
      invalidatesTags: ["Slots", "Calendar"],
    }),

    cancelBooking: builder.mutation({
      query: (booking_id) => ({
        url: `/v1/student/slots/${booking_id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: ["Slots", "Calendar"],
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  uploadProfilePicture,
  useChangePasswordMutation,
  useGetDashboardStatsQuery,
  useGetDashboardOverviewQuery,
  useGetNormalTestQuestionsQuery,
  useGetParentNormalTestQuestionsQuery,
  useSubmitNormalTestMutation,
  useGetNormalTestStatusQuery,
  useFinalizeCTestSectionMutation,
  useGetStudentTestResponsesQuery,
  useGetAvailableSlotsQuery,
  useBookSlotMutation,
  useGetStudentCalendarQuery,
  useRescheduleBookingMutation,
  useCancelBookingMutation,
} = studentApi;
