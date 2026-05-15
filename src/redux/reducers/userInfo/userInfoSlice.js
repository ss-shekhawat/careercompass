import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  role: null,
  permissions: [],
  loading: false,
  error: null,
  token: null,
  isLoggingOut: false,
  testId: null,
  promo_code: null,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // Login flow
    userLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = action.payload.access_token;
      
      // Set permissions: use provided permissions or default based on role
      const role = action.payload.role || action.payload.user?.role;
      const defaultPermissions = {
        admin: ["Dashboard", "Entity Management", "Promo Code", "Test Management", "Question Management", "Report Management", "Counsellor Management", "User Management", "Payment Management", "Product Management", "Support Ticket"],
        super_admin: ["Full Access", "Manage Billing", "Manage Integrations"],
      };
      state.permissions = action.payload.permissions || defaultPermissions[role] || [];
      
      // FIX: If no user object exists, create one from the payload
      if (action.payload.user) {
        state.user = action.payload.user;
      } else {
        // Create a user object from available data
        state.user = {
          username: action.payload.username || action.payload.email || null,
          role: action.payload.role || null,
          email: action.payload.email || null,
        };
      }
      
      state.role = action.payload.role || null;
      state.error = null;
    },
    userLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Register flow
    userRegisterSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user || null;
      state.role = action.payload.role || null;
      state.token = action.payload.access_token || null;
      state.error = null;
    },

    // Manual login flag
    userLoginTrue: (state) => {
      state.isLoggedIn = true;
    },

    // Start logout (optional flag for UI)
    startLogout: (state) => {
      state.isLoggingOut = true;
    },

    // ✅ Full logout – reset everything
    userLogout: (state) => {
      Object.assign(state, initialState);
      // ensure permissions cleared
      state.permissions = [];
    },

    // Profile update
    userUpdateProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userUpdateProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    userUpdateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Save auth token manually
    saveAuthToken: (state, action) => {
      state.token = action.payload;
    },

    // Save test ID
    saveTestId: (state, action) => {
      state.testId = action.payload;
    },
    // Save promo code
    savePromoCode: (state, action) => {
      state.promo_code = action.payload;
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  userRegisterSuccess,
  userLoginTrue,
  startLogout,
  userLogout,
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFailure,
  saveAuthToken,
  saveTestId,
  savePromoCode,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;