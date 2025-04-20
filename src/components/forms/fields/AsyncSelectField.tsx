import { components } from 'react-select';
import {Controller} from 'react-hook-form';
import AsyncSelect from 'react-select/async';

type Option = {
    value: string;
    label: string;
};

type AsyncSelectProps<T> = {
    control: any;
    name: string;
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
export default function _AsyncSelect<T>(
    {
        name,
        label,
        error,
        client,
        control,
        dataTestId,
    }: AsyncSelectProps<T>
) {

    const loadOptions = async (inputValue: string): Promise<Option[]> => {
        console.log(1111)
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

    const CustomInput = (props: any) => (
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
                                ? field.value.map((val: string) => ({
                                    value: val,
                                    label: val,
                                }))
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
