import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const commonEndpointsApi = (entityName, entityUrl) => {
  return createApi({
    reducerPath: 'commonApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('session_token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getAll: builder.query({
        query: () => `${entityUrl}`
      }),
      getById: builder.query({
        query: (id) => `${entityUrl}/${id}`
      }),
      getAllApproved: builder.query({
        query: () => `${entityUrl}/Approved`
      }),
      post: builder.mutation({
        query: (data) => ({
          url: `${entityUrl}`,
          method: 'POST',
          body: data
        })
      }),
      putById: builder.mutation({
        query: (data) => ({
          url: `${entityUrl}/${data.id}`,
          method: 'PUT',
          body: data
        })
      }),
      deleteById: builder.mutation({
        query: (id) => ({
          url: `${entityUrl}/${id}`,
          method: 'DELETE'
        })
      }),
      deleteStatus: builder.mutation({
        query: (id) => ({
          url: `${entityUrl}/ChangeStatus/${id}`,
          method: 'DELETE'
        })
      })
    })
  })
}

export const supplyCategoryApi = commonEndpointsApi('SupplyCategory', 'supplyCategory')
export const productApi = commonEndpointsApi('Product', 'product')
export const roleApi = commonEndpointsApi('Role', 'role')
export const typeDocumentApi = commonEndpointsApi('TypeDocument', 'type_document')
export const userApi = commonEndpointsApi('User', 'user')
export const lineatureApi = commonEndpointsApi('Lineature', 'lineature')
export const impositionPlanchApi = commonEndpointsApi('ImpositionPlanch', 'impositionPlanch')
export const quotationClientApi = commonEndpointsApi('QuotationClient', 'quotationClient')
export const quotationclientDetailApi = commonEndpointsApi('QuotationClientDetail', 'quotationclientDetail')
export const clientApi = commonEndpointsApi('Client', 'client')
export const grammageCaliberApi = commonEndpointsApi('GrammageCaliber', 'grammageCaliber')
export const paperCutsApi = commonEndpointsApi('PaperCuts', 'paperCuts')
export const substratesApi = commonEndpointsApi('Substrates', 'substrates')
export const orderProductionApi = commonEndpointsApi('OrderProduction', 'orderProduction')
export const typeServices = commonEndpointsApi('TypeServices', 'typeServices')
export const quotationProviders = commonEndpointsApi('QuotationProviders', 'quotationProviders')
export const SupplyPictogrmas = commonEndpointsApi('SupplyPictogrmas', 'supplyPictogrmas')
export const finishApi = commonEndpointsApi('Finish', 'finish')
export const MachineApi = commonEndpointsApi('Machine', 'machine')
export const UnitMesureApi = commonEndpointsApi('UnitMesure', 'unitmesure')
export const WarehauseTypeApi = commonEndpointsApi('WarehauseType', 'warehauseType')
export const WarehauseApi = commonEndpointsApi('Warehause', 'warehause')
export const ProviderApi = commonEndpointsApi('Provider', 'provider')
export const SupplyApi = commonEndpointsApi('Supply', 'supply')
export const SupplyDetailsApi = commonEndpointsApi('SupplyDetails', 'supplyDetails')

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
  useGetAllQuery: useGetAllTypeServicesQuery,
  useGetByIdQuery: useGetTypeServicesByIdQuery,
  usePostMutation: usePostTypeServicesMutation,
  usePutByIdMutation: usePutTypeServicesByIdMutation,
  useDeleteByIdMutation: useDeleteTypeServicesByIdMutation
} = typeServices

export const {
  useGetAllQuery: useGetAllQuotationProvidersQuery,
  useGetByIdQuery: useGetQuotationProvidersByIdQuery,
  usePostMutation: usePostQuotationProvidersMutation,
  usePutByIdMutation: usePutQuotationProvidersByIdMutation,
  useDeleteByIdMutation: useDeleteQuotationProvidersByIdMutation
} = quotationProviders

export const {

  useGetAllQuery: useGetAllSupplyPictogramsQuery,
  useGetByIdQuery: useGetSupplyPictogramsByIdQuery,
  usePostMutation: usePostSupplyPictogramsMutation,
  usePutByIdMutation: usePutSupplyPictogramsByIdMutation,
  useDeleteByIdMutation: useDeleteSupplyPictogramsByIdMutation
} = SupplyPictogrmas

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
  useDeleteByIdMutation: useDeleteQuotationClientByIdMutation,
  useDeleteStatusMutation: useDeleteQuotationStatusMutation
} = quotationClientApi

export const {
  useGetAllQuery: useGetAllQuotationClientDetailsQuery,
  useGetByIdQuery: useGetQuotationClientDetailByIdQuery,
  useGetAllApprovedQuery: useGetAllQuotationClientDetailApprovedQuery,
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

export const {
  useGetAllQuery: useGetAllOrderProductionsQuery,
  useGetByIdQuery: useGetOrderProductionByIdQuery,
  usePostMutation: usePostOrderProductionMutation,
  usePutByIdMutation: usePutOrderProductionByIdMutation,
  useDeleteByIdMutation: useDeleteOrderProductionByIdMutation,
  useDeleteStatusMutation: useDeleteOrderProductionStatusMutation
} = orderProductionApi

export const {
  useGetAllQuery: useGetAllFinishQuery,
  useGetByIdQuery: useGetFinishByIdQuery,
  usePostMutation: usePostFinishMutation,
  usePutByIdMutation: usePutFinishByIdMutation,
  useDeleteByIdMutation: useDeleteFinishByIdMutation
} = finishApi

export const {
  useGetAllQuery: useGetAllMachineQuery,
  useGetByIdQuery: useGetMachineByIdQuery,
  usePostMutation: usePostMachineMutation,
  usePutByIdMutation: usePutMachineByIdMutation,
  useDeleteByIdMutation: useDeleteMachineByIdMutation
} = MachineApi

export const {
  useGetAllQuery: useGetAllUnitUnitMesureQuery,
  useGetByIdQuery: useGetUnitUnitMesureByIdQuery,
  usePostMutation: usePostUnitUnitMesureMutation,
  usePutByIdMutation: usePutUnitMesureByIdMutation,
  useDeleteByIdMutation: useDeleteUnitMesureByIdMutation
} = UnitMesureApi

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

export const {
  useGetAllQuery: useGetAllSupplyQuery,
  useGetByIdQuery: useGetSupplyByIdQuery,
  usePostMutation: usePostSupplyMutation,
  usePutByIdMutation: usePutSupplyByIdMutation,
  useDeleteByIdMutation: useDeleteSupplyByIdMutation
} = SupplyApi

export const {
  useGetAllQuery: useGetAllSupplyDetailsQuery,
  useGetByIdQuery: useGetSupplyDetailsByIdQuery,
  usePostMutation: usePostSupplyDetailsMutation,
  usePutByIdMutation: usePutSupplyDetailsByIdMutation,
  useDeleteByIdMutation: useDeleteSupplyDetailsByIdMutation
} = SupplyDetailsApi
