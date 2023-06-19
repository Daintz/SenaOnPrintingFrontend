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

export const typeDocumentApi = commonEndpointsApi('TypeDocument', 'type_document')

export const userApi = commonEndpointsApi('User', 'user')

export const lineatureApi = commonEndpointsApi('Lineature', 'lineature')

export const impositionPlanchApi = commonEndpointsApi('ImpositionPlanch', 'impositionPlanch')

export const quotationClientApi = commonEndpointsApi('QuotationClient','quotationClient')

export const quotationclientDetailApi = commonEndpointsApi('QuotationClientDetail','quotationclientDetail')

export const clientApi = commonEndpointsApi('Client', 'client')

export const grammageCaliberApi = commonEndpointsApi('GrammageCaliber', 'grammageCaliber')

export const paperCutsApi = commonEndpointsApi('PaperCuts', 'paperCuts')

export const substratesApi = commonEndpointsApi('Substrates', 'substrates')

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
  useGetAllQuery: useGetAllUsersQuery,
  useGetByIdQuery: useGetUserByIdQuery,
  usePostMutation: usePostUserMutation,
  usePutByIdMutation: usePutUserByIdMutation,
  useDeleteByIdMutation: useDeleteUserByIdMutation
} = userApi

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

export const {
  useGetAllQuery: useGetAllClientsQuery,
  useGetByIdQuery: useGetClientByIdQuery,
  usePostMutation: usePostClientMutation,
  usePutByIdMutation: usePutClientByIdMutation,
  useDeleteByIdMutation: useDeleteClientByIdMutation
} = clientApi

export const {
  useGetAllQuery: useGetAllGrammageCalibersQuery,
  useGetByIdQuery: useGetGrammageCaliberByIdQuery,
  usePostMutation: usePostGrammageCaliberMutation,
  usePutByIdMutation: usePutGrammageCaliberByIdMutation,
  useDeleteByIdMutation: useDeleteGrammageCaliberByIdMutation
} = grammageCaliberApi

export const {
  useGetAllQuery: useGetAllPaperCutsQuery,
  useGetByIdQuery: useGetPaperCutsByIdQuery,
  usePostMutation: usePostPaperCutsMutation,
  usePutByIdMutation: usePutPaperCutsByIdMutation,
  useDeleteByIdMutation: useDeletePaperCutsByIdMutation
} = paperCutsApi

export const {
  useGetAllQuery: useGetAllSubstratesQuery,
  useGetByIdQuery: useGetSubstratesByIdQuery,
  usePostMutation: usePostSubstratesMutation,
  usePutByIdMutation: usePutSubstratesByIdMutation,
  useDeleteByIdMutation: useDeleteSubstratesByIdMutation
} = substratesApi
