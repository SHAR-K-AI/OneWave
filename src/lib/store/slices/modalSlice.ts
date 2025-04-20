import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ModalType =
    | 'CREATE_TRACK'
    | 'EDIT_TRACK'
    | 'CONFIRM'
    | null;

export type CreateTrackProps = { defaultTitle?: string };
export type EditTrackProps = { trackSlug: string };
export type ConfirmProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

type ModalProps =
    | CreateTrackProps
    | EditTrackProps
    | ConfirmProps
    | Record<string, never>;

interface ModalState {
    modalType: ModalType;
    modalProps: ModalProps;
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
            state: ModalState,
            action: PayloadAction<{ modalType: ModalType; modalProps?: ModalProps }>
        ) => {
            state.modalType = action.payload.modalType;
            state.modalProps = action.payload.modalProps || {};
            state.isOpen = true;
        },
        closeModal: (state: ModalState) => {
            state.modalType = null;
            state.modalProps = {};
            state.isOpen = false;
        },
    },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;
