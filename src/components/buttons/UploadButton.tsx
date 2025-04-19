'use client';

import React, {useRef} from 'react';

type Props = {
    onFileSelect: (file: File) => void;
};

/**
 *
 * @param onFileSelect
 * @constructor
 */
const UploadComponent = ({onFileSelect}: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                ref={inputRef}
                className="hidden"
            />
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Select audio file
            </button>
        </div>
    );
};

export default UploadComponent;
