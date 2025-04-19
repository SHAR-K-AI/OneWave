'use client';

import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

import EditTrackModal from "@/components/modals/EditTrackModal";
import CreateTrackModal from "@/components/modals/CreateTrackModal";


const ModalManager = () => {
    const { modalType, modalProps, isOpen } = useSelector((state: RootState) => state.modal);

    if (!isOpen || !modalType) return null;

    switch (modalType) {
        case 'CREATE_TRACK':
            return <CreateTrackModal {...modalProps} />;
        case 'EDIT_TRACK':
            return <EditTrackModal {...modalProps} />;
        default:
            return null;
    }
};

export default ModalManager;
