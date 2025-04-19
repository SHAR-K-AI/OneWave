'use client';

import React from 'react';
import {
    Path,
    Control,
    Controller,
    FieldValues,
    RegisterOptions,
} from 'react-hook-form';

import Input from "@/components/forms/fields/Input";
import AsyncSelect from "@/components/forms/fields/AsyncSelect";

type ControlTypes = 'file' | 'input' | 'select' | 'async-select';

interface FormControlProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    control: Control<T>;
    onChange?: (value: unknown) => void;
    rules?: RegisterOptions;
    controlType: ControlTypes;
    required?: boolean;

    [key: string]: unknown;
}

/**
 *
 * @param name
 * @param control
 * @param onChange
 * @param rules
 * @param controlType
 * @param required
 * @param rest
 * @constructor
 */
export default function FormControl<T extends FieldValues = FieldValues>(
    {
        name,
        control,
        onChange,
        rules = {},
        controlType,
        required = false,
        ...rest
    }: FormControlProps<T>
) {
    let ControlComponent: React.ComponentType<React.ComponentProps<typeof Input | typeof AsyncSelect>>;

    switch (controlType) {
        case 'input':
            ControlComponent = Input;
            break;
        case 'async-select': {
            ControlComponent = AsyncSelect;
            break;
        }
        default:
            throw new Error(`Unsupported controlType: ${controlType}`);
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                ...rules,
                ...(required ? { required: true } : {}),
            }}
            render={({ field }) => {
                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e);
                    onChange?.(e);
                };

                return <ControlComponent {...rest} {...field} onChange={handleChange} />;
            }}
        />
    );
}
