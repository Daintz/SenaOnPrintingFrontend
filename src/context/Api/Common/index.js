import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const commonEndpointsApi = (entityName, entityUrl) => {
  return createApi({
    reducerPath: 'commonApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`
    }),
    endpoints: builder => ({
      getAll: builder.query({
        query: () => `${entityUrl}`
      }),
      getById: builder.query({
        query: id => `${entityUrl}/${id}`
      }),
      post: builder.mutation({
        query: data => ({
          url: `${entityUrl}`,
          method: 'POST',
          body: data
        })
      }),
      putById: builder.mutation({
        query: data => ({
          url: `${entityUrl}/${data.id}`,
          method: 'PUT',
          body: data
        })
      }),
      deleteById: builder.mutation({
        query: id => ({
          url: `${entityUrl}/${id}`,
          method: 'DELETE'
        })
      })
    })
  })
}

export const supplyCategoryApi = commonEndpointsApi(
  'SupplyCategory',
  'supplyCategory'
)
export const productApi = commonEndpointsApi('Product', 'product')

export const roleApi = commonEndpointsApi('Role', 'role')

export const typeDocumentApi = commonEndpointsApi('TypeDocument', 'typeDocument')

export const WarehauseTypeApi = commonEndpointsApi('WarehauseType', 'warehauseType')
export const WarehauseApi = commonEndpointsApi('Warehause', 'warehause')
export const ProviderApi = commonEndpointsApi('Provider', 'provider')

export const {
  useGetAllQuery: useGetAllSupplyCategoryQuery,
  useGetByIdQuery: useGetSupplyCategoryByIdQuery,
  usePostMutation: usePostSupplyCategoryMutation,
  usePutByIdMutation: usePutSupplyCategoryByIdMutation,
  useDeleteByIdMutation: useDeleteSupplyCategoryByIdMutation
} = supplyCategoryApi

export const {
  useGetAllQuery: useGetAllProductsQuery,
  useGetByIdQuery: useGetProductByIdQuery,
  usePostMutation: usePostProductMutation,
  usePutByIdMutation: usePutProductByIdMutation,
  useDeleteByIdMutation: useDeleteProductByIdMutation
} = productApi

export const {
  useGetAllQuery: useGetAllRolesQuery,
  useGetByIdQuery: useGetRoleByIdQuery,
  usePostMutation: usePostRoleMutation,
  usePutByIdMutation: usePutRoleByIdMutation,
  useDeleteByIdMutation: useDeleteRoleByIdMutation
} = roleApi

export const {
  useGetAllQuery: useGetAllTypeDocumentsQuery,
  useGetByIdQuery: useGetTypeDocumentByIdQuery,
  usePostMutation: usePostTypeDocumentMutation,
  usePutByIdMutation: usePutTypeDocumentByIdMutation,
  useDeleteByIdMutation: useDeleteTypeDocumentByIdMutation
} = typeDocumentApi

export const {
  useGetAllQuery: useGetAllWarehauseTypesQuery,
  useGetByIdQuery: useGetWarehauseTypeByIdQuery,
  usePostMutation: usePostWarehauseTypeMutation,
  usePutByIdMutation: usePutWarehauseTypeByIdMutation,
  useDeleteByIdMutation: useDeleteWarehauseTypeByIdMutation
} = WarehauseTypeApi

export const {
  useGetAllQuery: useGetAllWarehausesQuery,
  useGetByIdQuery: useGetWarehauseByIdQuery,
  usePostMutation: usePostWarehauseMutation,
  usePutByIdMutation: usePutWarehauseByIdMutation,
  useDeleteByIdMutation: useDeleteWarehauseByIdMutation
} = WarehauseApi


export const {
  useGetAllQuery: useGetAllProvidersQuery,
  useGetByIdQuery: useGetProviderByIdQuery,
  usePostMutation: usePostProviderMutation,
  usePutByIdMutation: usePutProviderByIdMutation,
  useDeleteByIdMutation: useDeleteProviderByIdMutation
} = ProviderApi
