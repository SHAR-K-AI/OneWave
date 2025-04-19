'use client';

import React from 'react';
import classNames from 'classnames';
import {AxiosResponse} from 'axios';
import AsyncSelectBase from 'react-select/async';

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
    value?: string | string[];
    getData?: (data: any) => Option[];
    onChange?: (value: Option | Option[] | null) => void;
    errors?: Record<string, any>;
    controlClassName?: string;
    labelClassName?: string;
    groupClassName?: string;
    errorClassName?: string;
}

const AsyncSelect = (
    {
        client,
        name,
        label,
        placeholder = '',
        isMultiple = false,
        onChange,
        errors = {},
        value,
        controlClassName,
        labelClassName,
        groupClassName,
        errorClassName,
        getData = (data) => data.map((item: any) => ({id: item.id, name: item.name})),
    }: AsyncSelectFieldProps
) => {
    const loadOptions = async (inputValue: string): Promise<Option[]> => {
        const response = await client();
        const allOptions = getData(response.data);
        if (inputValue) return allOptions;

        return allOptions.filter((opt) =>
            opt.name.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const onChangeWrapper = (selected: any) => {
        onChange?.(selected);
    };

    return (
        <div className={classNames(groupClassName)}>
            {label && <label className={classNames(labelClassName)}>{label}</label>}
            <AsyncSelectBase
                name={name}
                cacheOptions
                value={value}
                defaultOptions
                isMulti={isMultiple}
                loadOptions={loadOptions}
                placeholder={placeholder}
                onChange={onChangeWrapper}
                getOptionValue={(e) => e.id}
                getOptionLabel={(e) => e.name}
                className={classNames(controlClassName)}
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
