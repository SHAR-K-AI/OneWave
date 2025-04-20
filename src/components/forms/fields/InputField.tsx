import {FieldError, UseFormRegisterReturn} from 'react-hook-form';

type Props = {
    label: string;
    type?: string;
    error?: FieldError;
    required?: boolean;
    placeholder?: string;
    dataTestId?: string;
    register: UseFormRegisterReturn;
};

export default function InputField(
    {
        label,
        placeholder = '',
        type = 'text',
        register,
        dataTestId,
        error,
    }: Props
) {
    const { name, ...rest } = register;

    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                {...rest}
                name={name}
                id={name}
                type={type}
                data-testid={dataTestId}
                placeholder={placeholder}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
            {/*TODO data-testid="error-title" - Title field error message
                All other validation errors should follow the pattern data-testid="error-{fieldname}"
                data-testid="error-artist" - Artist field error message */}
            {error && <p className="text-red-600 text-sm" data-testid={`error-${name}`}>{error.message}</p>}
        </div>
    );
}
