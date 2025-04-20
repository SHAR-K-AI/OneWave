'use client';

import {useDispatch} from 'react-redux';
import React, {Fragment, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {closeModal} from '@/lib/store/slices/modalSlice';

import {ConfirmProps} from '@/lib/store/slices/modalSlice';

/**
 *
 * @param onConfirm
 * @param onCancel
 * @constructor
 */
const ConfirmationModal: React.FC<ConfirmProps> = ({onConfirm, onCancel}) => {
    const dispatch = useDispatch();
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef}
                    onClose={() => dispatch(closeModal())}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900 opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h2 className="text-xl mb-4">Are you sure you want to delete this item?</h2>
                                {/* TODO data-testid="confirm-dialog" - Confirmation dialog container*/}
                                <div className="flex justify-end space-x-4" data-testid="confirm-dialog">
                                    {/*TODO data-testid="cancel-delete" - Cancel delete button*/}
                                    <button
                                        data-testid="cancel-delete"
                                        ref={cancelButtonRef}
                                        onClick={() => {
                                            onCancel();
                                            dispatch(closeModal())
                                        }}
                                        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    {/*TODO data-testid="confirm-delete" - Delete confirmation button*/}
                                    <button
                                        data-testid="confirm-delete"
                                        onClick={() => {
                                            onConfirm();
                                            dispatch(closeModal())
                                        }}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ConfirmationModal;
