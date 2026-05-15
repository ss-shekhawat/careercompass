import { api } from '../api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: '/v1/auth/register',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/v1/auth/login',
        method: 'POST',
        body: new URLSearchParams({
          username: credentials.username,
          password: credentials.password,
        }).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: '/v1/auth/logout',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: '/v1/profile/profile/password',
        method: 'PUT',
        body,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    forgotPassword: builder.mutation({
      query: (emailData) => ({
        url: '/v1/auth/forgot-password',
        method: 'POST',
        body: emailData,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: '/v1/auth/reset-password',
        method: 'POST',
        body: resetData,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: '/v1/auth/verify-otp',
        method: 'POST',
        body: otpData,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/v1/auth/resend-otp',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} = authApi;

