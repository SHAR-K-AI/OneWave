'use client';

import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

import {CONFIRM, CREATE_TRACK, EDIT_TRACK} from "@/constants";

import EditTrackModal from "@/components/modals/EditTrackModal";
import CreateTrackModal from "@/components/modals/CreateTrackModal";
import ConfirmationModal from "@/components/modals/ConfirmationModal";

import {ConfirmProps, EditTrackProps} from "@/lib/store/slices/modalSlice";

const ModalManager = () => {
    const { modalType, modalProps, isOpen } = useSelector((state: RootState) => state.modal);

    if (!isOpen || !modalType) return null;

    switch (modalType) {
        case CREATE_TRACK:
            return <CreateTrackModal />;
        case EDIT_TRACK:
            return <EditTrackModal {...(modalProps as EditTrackProps)} />;
        case CONFIRM:
            return <ConfirmationModal  {...(modalProps as ConfirmProps)}/>;
        default:
            return null;
    }
};

export default ModalManager;
