'use client';

import React, { useEffect, useState } from 'react';
import AsyncSelectBase from 'react-select/async';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';

interface Option {
    id: string;
    name: string;
}

interface AsyncSelectFieldProps {
    client: () => Promise<AxiosResponse<any>>;
    name: string;
    label?: string;
    placeholder?: string;
    isMultiple?: boolean;
    defaultValue?: string | string[];
    getData?: (data: any) => Option[];
    onChange?: (value: Option | Option[] | null) => void;
    errors?: Record<string, any>;
    controlClassName?: string;
    labelClassName?: string;
    groupClassName?: string;
    errorClassName?: string;
}

const AsyncSelect = ({
                         client,
                         name,
                         label,
                         placeholder = '',
                         isMultiple = false,
                         defaultValue,
                         getData = (data) => data.map((item: any) => ({ id: item.id, name: item.name })),
                         onChange,
                         errors = {},
                         controlClassName,
                         labelClassName,
                         groupClassName,
                         errorClassName,
                     }: AsyncSelectFieldProps) => {
    const [initialOptions, setInitialOptions] = useState<Option[]>([]);
    const [value, setValue] = useState<Option | Option[] | null>(null);

    // Fetch initial options once
    useEffect(() => {
        client().then((response) => {
            const loaded = getData(response.data);
            setInitialOptions(loaded);

            // Set default value(s) if provided
            if (defaultValue) {
                if (Array.isArray(defaultValue)) {
                    const matchedValues = loaded.filter((opt) => defaultValue.includes(opt.id));
                    setValue(matchedValues);
                } else {
                    const found = loaded.find((opt) => opt.id === defaultValue);
                    if (found) setValue(found);
                }
            }
        });
    }, [client, defaultValue, getData]);

    const loadOptions = async (inputValue: string): Promise<Option[]> => {
        const response = await client();
        const allOptions = getData(response.data);
        if (inputValue) return allOptions;

        return allOptions.filter((opt) =>
            opt.name.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const onChangeWrapper = (selected: any) => {
        setValue(selected);
        onChange?.(selected);
    };

    return (
        <div className={classNames(groupClassName)}>
            {label && <label className={classNames(labelClassName)}>{label}</label>}

            <AsyncSelectBase
                cacheOptions
                isClearable
                isMulti={isMultiple}
                defaultOptions={initialOptions}
                value={value}
                loadOptions={loadOptions}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                placeholder={placeholder}
                onChange={onChangeWrapper}
                className={classNames(controlClassName)}
                name={name}
            />

            {errors[name] && (
                <div className={classNames('invalid-feedback text-nowrap', errorClassName)}>
                    {errors[name]?.message}
                </div>
            )}
        </div>
    );
};

export default AsyncSelect;
