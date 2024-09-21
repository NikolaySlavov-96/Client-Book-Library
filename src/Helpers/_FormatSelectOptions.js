const _FormatSelectOptions = (data, { value, label }) => {
    const newStates = data.map(s => { return { value: s[value], label: s[label] } })
    return newStates;
};

export default _FormatSelectOptions;