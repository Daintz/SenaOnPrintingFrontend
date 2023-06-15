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


export const lineatureApi = commonEndpointsApi('Lineature', 'lineature')

export const impositionPlanchApi = commonEndpointsApi('ImpositionPlanch', 'impositionPlanch')

export const quotationClientApi = commonEndpointsApi('QuotationClient','quotationClient')
export const quotationclientDetailApi = commonEndpointsApi('QuotationClientDetail','quotationclientDetail')


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

  useGetAllQuery: useGetAllLineaturesQuery,
  useGetByIdQuery: useGetLineatureByIdQuery,
  usePostMutation: usePostLineatureMutation,
  usePutByIdMutation: usePutLineatureByIdMutation,
  useDeleteByIdMutation: useDeleteLineatureByIdMutation
} = lineatureApi

export const {
  useGetAllQuery: useGetAllImpositionPlanchsQuery,
  useGetByIdQuery: useGetImpositionPlanchByIdQuery,
  usePostMutation: usePostImpositionPlanchMutation,
  usePutByIdMutation: usePutImpositionPlanchByIdMutation,
  useDeleteByIdMutation: useDeleteImpositionPlanchByIdMutation
} = impositionPlanchApi
export const {
  useGetAllQuery: useGetAllQuotationClientsQuery,
  useGetByIdQuery: useGetQuotationClientByIdQuery,
  usePostMutation: usePostQuotationClientMutation,
  usePutByIdMutation: usePutQuotationClientByIdMutation,
  useDeleteByIdMutation: useDeleteQuotationClientByIdMutation
} = quotationClientApi
export const {
  useGetAllQuery: useGetAllQuotationClientDetailsQuery,
  useGetByIdQuery: useGetQuotationClientDetailByIdQuery,
  usePostMutation: usePostQuotationClientDetailMutation,
  usePutByIdMutation: usePutQuotationClientDetailByIdMutation,
  useDeleteByIdMutation: useDeleteQuotationClientDetailByIdMutation
} = quotationclientDetailApi


