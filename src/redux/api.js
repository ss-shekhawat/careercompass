import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogout } from "./reducers/userInfo/userInfoSlice";

function getBaseUrl() {
  const config = window.RUNTIME_CONFIG;
  if (!config || !config.API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined in config");
  }
  const base = config.API_BASE_URL;
  return base.endsWith("/api") ? base : `${base}/api`;
}

const dynamicBaseQuery = async (args, api, extraOptions) => {
  const baseUrl = getBaseUrl();
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state.userInfo?.token || localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Skip logout and redirect for login endpoint, as 401 is expected for invalid credentials
    if (!args.url.includes('/auth/login')) {
      api.dispatch(userLogout());
      window.location.href = "/";
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: dynamicBaseQuery,
  tagTypes: [
    "Tests",
    "CareerRecommendations",
    "CTest",
    "ITest",
    "ATest",
    "NormalTest",
    "Schools",
    "Issues",
    "Reports",
    "Profile",
    "Payments",
    "CounsellorDashboard",
    "CounsellorReports",
    "StudentProfile",
    "StudentProfileQuestions",
    "CounsellorReportView",
    "PublicNotes",
    "PrivateNotes",
    "CounsellorCalendar",
    "Products",
    "Testimonials",
    "Slots",
    "calender",
    "CounsellorSessions",
  ],
  endpoints: () => ({}),
});
