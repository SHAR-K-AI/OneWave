'use client';

import { Fragment, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import { closeModal } from '@/lib/store/slices/modalSlice';
import CreateTrackFormContent from '@/components/forms/CreateTrackFormContent';

/**
 *
 * @constructor
 */
export default function CreateTrackModal() {
    const dispatch = useDispatch();
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={() => dispatch(closeModal())}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900 opacity-75 transition-opacity" />
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
                            <Dialog.Panel className="relative w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <button
                                    onClick={() => dispatch(closeModal())}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                                    aria-label="Close"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                                <CreateTrackFormContent closeAfterSubmit onSuccess={() => dispatch(closeModal())} />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
