import React from 'react';
import classNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    text?: string;
    label?: string;
    labelNote?: string;
    editButton?: React.ReactNode;
    errorClassName?: string;
    labelClassName?: string;
    groupClassName?: string;
    errors?: Record<string, { message?: string }>;
    controlClassName?: string;
    controlFieldClassName?: string;
}

const Input: React.FC<InputProps> = ({
                                         name,
                                         label,
                                         labelNote,
                                         errorClassName,
                                         labelClassName,
                                         groupClassName,
                                         errors = {},
                                         controlClassName,
                                         controlFieldClassName = 'w-full',
                                         ...rest
                                     }) => {
    const hasError = Boolean(errors[name]);

    return (
        <div className={classNames('flex flex-col gap-2', groupClassName)}>
            {label && (
                <label
                    htmlFor={name}
                    className={classNames(
                        labelClassName,
                        { 'text-red-500': hasError }
                    )}
                >
                    {label}
                    {labelNote && (
                        <span className="text-red-500 ps-2 text-xs font-normal">
                            {labelNote}
                        </span>
                    )}
                </label>
            )}
            <div className={classNames('flex flex-col', controlFieldClassName)}>
                <input
                    id={name}
                    name={name}
                    className={classNames(
                        "focus:outline-hidden",
                        controlClassName,
                        {
                            'border-red-500 focus:ring-red-500': hasError,
                            'border-gray-300': !hasError,
                        }
                    )}
                    {...rest}
                />
                {hasError && (
                    <span className={classNames('text-red-500 text-xs mt-1', errorClassName)}>
                        {errors[name]?.message}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Input;
