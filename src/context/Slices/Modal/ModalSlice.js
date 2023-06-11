import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  isEditing: false,
  isAction: false,
  editingData: {},
  title: '',
  action: ''
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.title = action.payload.title
    },
    closeModal: state => {
      state.isOpen = false
      state.title = ''
      state.editingData = {}
    },
    openEditing: (state, action) => {
      state.isEditing = true
      state.editingData = action.payload.editingData
    },
    closeEditing: state => {
      state.isEditing = false
    },
    changeAction: state => {
      state.isAction = !state.isAction
    },
    setAction: (state, action) => {
      state.action = action.payload.action
    }
  }
})

export const {
  openModal,
  closeModal,
  openEditing,
  closeEditing,
  changeAction,
  setAction
} = modalSlice.actions
export default modalSlice.reducer
