import { api } from "../api";

export const entityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get Schools with Search, Pagination (optional)
    getSchools: builder.query({
      query: ({ page = 1, size = 10, paginated = true } = {}) => {
        const url = paginated
          ? `/v1/admin/schools?page=${page}&size=${size}`
          : `/v1/admin/schools`;
        return {
          url,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        };
      },
      providesTags: ["Schools"],
    }),

    // ✅ Create New School
    createSchool: builder.mutation({
      query: (schoolData) => ({
        url: `/v1/admin/schools`,
        method: "POST",
        body: schoolData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Schools"],
    }),

    // ✅ Delete School by ID
    deleteSchool: builder.mutation({
      query: (school_id) => ({
        url: `/v1/admin/schools/${school_id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Schools"],
    }),

    // ✅ Update School by ID
    updateSchool: builder.mutation({
      query: ({ school_id, updatedData }) => ({
        url: `/v1/admin/schools/${school_id}`,
        method: "PUT",
        body: updatedData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Schools"],
    }),

    getDashboardSummary: builder.query({
  query: (params) => ({
    url: "/v1/admin/analytics/dashboard/summary",
    method: "GET",
    params, 
    headers: {
      Accept: "application/json",
    },
  }),
}),

    getCounsellors: builder.query({
      query: ({ page = 1, size = 100, active_only = false } = {}) => ({
        url: `/v1/counsellors?page=${page}&size=${size}&active_only=${active_only}`,
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    getProducts: builder.query({
      query: () => ({
        url: `/v1/admin/products`,
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }),
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation({
      query: (productData) => ({
        url: `/v1/admin/products`,
        method: "POST",
        body: productData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ product_id, data }) => ({
        url: `/v1/admin/products/${product_id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (product_id) => ({
        url: `/v1/admin/products/${product_id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),

    getTestimonials: builder.query({
      query: (product_id) => ({
        url: product_id
          ? `/v1/testimonials?product_id=${product_id}`
          : `/v1/testimonials`,
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }),
      providesTags: ["Testimonials"],
    }),

    createTestimonial: builder.mutation({
      query: (data) => ({
        url: "/v1/admin/testimonials",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Testimonials"],
    }),

    updateTestimonial: builder.mutation({
      query: ({ testimonial_id, data }) => ({
        url: `/v1/admin/testimonials/${testimonial_id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Testimonials"],
    }),

    deleteTestimonial: builder.mutation({
      query: (testimonial_id) => ({
        url: `/v1/admin/testimonials/${testimonial_id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Testimonials"],
    }),

    getPublicProducts: builder.query({
      query: () => ({
        url: `/v1/products`,
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }),
    }),

    getCounsellorSlots: builder.query({
    query: ({ counsellor_id, start_date, end_date, status = "available" }) => {
    const params = new URLSearchParams();

    if (start_date) params.append("start_date", start_date);
    if (end_date) params.append("end_date", end_date);
    if (status) params.append("status", status);

    return {
      url: `/v1/counsellors/${counsellor_id}/slots?${params.toString()}`,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
  },
    }),

    getCounsellorSessions: builder.query({
    query: ({
    counsellor_id,
    page = 1,
    size = 20,
    start_date,
    end_date,
    status,
    session_type,
    school,
    test_name,
    search,
  }) => {
    const params = new URLSearchParams({ page, size });

    if (start_date) params.append("start_date", start_date);
    if (end_date) params.append("end_date", end_date);
    if (status) params.append("status", status);
    if (session_type) params.append("session_type", session_type);
    if (school) params.append("school", school);
    if (test_name) params.append("test_name", test_name);
     if (search) params.append("search", search);

    return {
      url: `/v1/counsellors/${counsellor_id}/sessions?${params.toString()}`,
      method: "GET",
      headers: { Accept: "application/json" },
    };
    
  },

providesTags: ["CounsellorSessions"],
    }),

    cancelAdminBooking: builder.mutation({
  query: (booking_id) => ({
    url: `/v1/admin/slots/${booking_id}/cancel`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  }),
  invalidatesTags: ["CounsellorSessions"],
}),

rescheduleAdminBooking: builder.mutation({
  query: ({ booking_id, body }) => ({
    url: `/v1/admin/bookings/${booking_id}/reschedule`,
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }),
  invalidatesTags: ["CounsellorSessions"],
}),

reassignAdminBooking: builder.mutation({
  query: ({ booking_id, target_counsellor_id, target_start_datetime }) => ({
    url: `/v1/admin/bookings/reassign`,
    method: "POST",
    body: {
      booking_id,
      target_counsellor_id,
      target_start_datetime,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }),
  invalidatesTags: ["CounsellorSessions"],
}),

getAvailableCounsellors: builder.query({
  query: (datetime) => ({
    url: "/v1/admin/counsellors/available-at",
    method: "GET",
    params: {
      datetime_target: datetime,
    },
  }),
}),

  }),
});

export const {
  useGetSchoolsQuery,
  useCreateSchoolMutation,
  useDeleteSchoolMutation,
  useUpdateSchoolMutation,
  useGetDashboardSummaryQuery,
  useGetCounsellorsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetPublicProductsQuery,
  useGetCounsellorSlotsQuery,
  useGetCounsellorSessionsQuery,
  useCancelAdminBookingMutation,
  useRescheduleAdminBookingMutation,
  useReassignAdminBookingMutation,
  useGetAvailableCounsellorsQuery,
} = entityApi;
