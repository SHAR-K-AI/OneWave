'use client';

import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

import EditTrackModal from "@/components/modals/EditTrackModal";
import CreateTrackModal from "@/components/modals/CreateTrackModal";
import {ConfirmProps, EditTrackProps} from "@/lib/store/slices/modalSlice";
import ConfirmationModal from "@/components/modals/ConfirmationModal";  // Import your new component

const ModalManager = () => {
    const { modalType, modalProps, isOpen } = useSelector((state: RootState) => state.modal);

    if (!isOpen || !modalType) return null;

    switch (modalType) {
        case 'CREATE_TRACK':
            return <CreateTrackModal />;
        case 'EDIT_TRACK':
            return <EditTrackModal {...(modalProps as EditTrackProps)} />;
        case 'CONFIRM':
            return <ConfirmationModal  {...(modalProps as ConfirmProps)}/>;
        default:
            return null;
    }
};

export default ModalManager;
