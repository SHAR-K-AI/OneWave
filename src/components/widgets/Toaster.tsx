"use client";

import React from 'react';
import classNames from "classnames";
import {Toaster, resolveValue} from 'react-hot-toast';

const _Toaster = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 2000,
            }}
        >
            {(t) => (
                /*TODO data-testid="toast-container" - Toast notification container*/
                <div
                    data-testid="toast-container"
                    className="bg-white p-4 shadow-md rounded-lg"
                >
                    {/* TODO data-testid="toast-{type}" - Specific toast message (where {type} is success, error, etc.)*/}
                    <div
                        data-testid={`toast-${t.type}`}
                        className={classNames("flex items-center space-x-3 font-medium text-blue-600",
                            {'text-green-600': t.type === 'success'},
                            {'text-red-600': t.type === 'error'},
                        )}
                    >
                        {resolveValue(t.message, t)}
                    </div>
                </div>
            )}
        </Toaster>
    );
};

export default _Toaster;
