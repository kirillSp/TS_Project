export type ValidateField = (val: string) => string | undefined;

export let requiredField: ValidateField = (val) => {
    if (!val) return "Error, field is required";
    return undefined;
}

export let maxLengthCreator = (maxLength: number): ValidateField => (val) => {
    if (val.length > maxLength) return `Error, max length if ${maxLength} symbols`;
    return undefined;
}