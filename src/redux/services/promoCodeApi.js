import { api } from '../api';

export const promoCodeApi = api.injectEndpoints({
	endpoints: (builder) => ({
		// Create a promo (admin)
		createPromo: builder.mutation({
			query: (promoData) => ({
				url: '/v1/admin/promos',
				method: 'POST',
				body: promoData,
			}),
			invalidatesTags: [{ type: 'Promos', id: 'LIST' }],
		}),

		// Get admin promos (paginated, optionally filtered by entity/school)
		getAdminPromos: builder.query({
			query: ({ page = 1, size = 10, entity } = {}) => {
				const params = new URLSearchParams({ page, size });
				if (entity) params.append('entity', entity);
				return `/v1/admin/promos?${params.toString()}`;
			},
			providesTags: (result) =>
				result?.data
					? [
						...result.data.map((p) => ({ type: 'Promos', id: p.id })),
						{ type: 'Promos', id: 'LIST' },
					]
					: [{ type: 'Promos', id: 'LIST' }],
		}),

		// Get single promo by id (admin)
		getAdminPromo: builder.query({
			query: (promoId) => `/v1/admin/promos/${promoId}`,
			providesTags: (result, error, promoId) => [{ type: 'Promos', id: promoId }],
		}),

		// Update promo by id (admin)
		updateAdminPromo: builder.mutation({
			query: ({ promoId, ...body }) => ({
				url: `/v1/admin/promos/${promoId}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: (result, error, { promoId }) => [
				{ type: 'Promos', id: promoId },
				{ type: 'Promos', id: 'LIST' },
			],
		}),

		// Delete promo by id (admin)
		deleteAdminPromo: builder.mutation({
			query: (promoId) => ({
				url: `/v1/admin/promos/${promoId}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, promoId) => [
				{ type: 'Promos', id: promoId },
				{ type: 'Promos', id: 'LIST' },
			],
		}),

		// Verify promo code
		verifyPromoCode: builder.query({
			query: (code) => `/v1/verify/${code}`,
			providesTags: (result, error, code) => [{ type: 'Promos', id: code }],
		}),

		// Get promo usage history (admin)
		getPromoUsageHistory: builder.query({
			query: ({ promoId, page = 1, size = 10 }) =>
				`/v1/admin/promos/${promoId}/usage?page=${page}&size=${size}`,
		}),
	}),
});

export const {
	useCreatePromoMutation,
	useGetAdminPromosQuery,
	useGetAdminPromoQuery,
	useUpdateAdminPromoMutation,
	useDeleteAdminPromoMutation,
	useVerifyPromoCodeQuery,
	useGetPromoUsageHistoryQuery,
} = promoCodeApi;