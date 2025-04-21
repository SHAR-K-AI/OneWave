import React from "react";
import AsyncSelect from 'react-select/async';
import {Track} from "@/lib/client/apiTracks";
import {Control, Controller} from 'react-hook-form';
import {components, GroupBase, InputProps} from 'react-select';

type Option = {
    value: string;
    label: string;
};

type AsyncSelectProps = {
    control: Control<Track>;
    name: keyof Track;
    label: string;
    error?: string;
    dataTestId?: string;
    client: () => Promise<{ data: string[] }>;
};

/**
 *
 * @param name
 * @param label
 * @param error
 * @param client
 * @param control
 * @param dataTestId
 */
export default function _AsyncSelect(
    {
        name,
        label,
        error,
        client,
        control,
        dataTestId,
    }: AsyncSelectProps
) {

    const loadOptions = async (inputValue: string): Promise<Option[]> => {
        const response = await client();
        const allOptions = response.data.map((name) => ({
            value: name,
            label: name,
        }));

        return !inputValue
            ? allOptions
            : allOptions.filter((option) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
            );
    };

    const CustomInput = (props: InputProps<{ value: string; label: string }, true, GroupBase<Option>>) => (
        <components.Input {...props} innerRef={props.innerRef} data-testid={dataTestId} />
    );

    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <AsyncSelect
                        isMulti
                        cacheOptions
                        defaultOptions
                        loadOptions={loadOptions}
                        onChange={(selected) =>
                            field.onChange(
                                (selected as Option[]).map((opt) => opt.value)
                            )
                        }
                        value={
                            Array.isArray(field.value)
                                ? field.value.map((val) => {
                                    if (typeof val === 'string') {
                                        return { value: val, label: val };
                                    }
                                    return { value: val.id, label: val.name };
                                })
                                : []
                        }
                        classNamePrefix="react-select"
                        components={{ Input: CustomInput }}
                        getOptionValue={(event) => event.value}
                        getOptionLabel={(event) => event.label}
                    />
                )}
            />
            {/* TODO data-testid="error-genre" - Genre field error message All other validation errors should follow the pattern data-testid="error-{fieldname}"*/}
            {error && <p className="text-red-600 text-sm" data-testid={`error-${name}`}>{error}</p>}
        </div>
    );
}
