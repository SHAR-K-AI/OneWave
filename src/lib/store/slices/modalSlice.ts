import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalType =
    | 'CREATE_TRACK'
    | 'EDIT_TRACK'
    | 'DELETE_TRACK'
    | 'UPLOAD_FILE'
    | null;

interface ModalState {
    modalType: ModalType;
    modalProps: Record<string, any>;
    isOpen: boolean;
}

const initialState: ModalState = {
    modalType: null,
    modalProps: {},
    isOpen: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (
            state,
            action: PayloadAction<{ modalType: ModalType; modalProps?: Record<string, any> }>
        ) => {
            state.modalType = action.payload.modalType;
            state.modalProps = action.payload.modalProps || {};
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.modalType = null;
            state.modalProps = {};
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
