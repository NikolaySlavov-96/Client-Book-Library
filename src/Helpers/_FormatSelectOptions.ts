interface IDataItem {
    [key: string]: string;
}

interface IFormatSelectOptions {
    value: string;
    label: string
}

const _FormatSelectOptions = (data: IDataItem[], { value, label }: IFormatSelectOptions) => {
    const newStates = data.map(s => {
        return { value: s[value], label: s[label] }
    });

    return newStates;
};

export default _FormatSelectOptions;