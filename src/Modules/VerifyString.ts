export const isEmpty = (value: string | string[]): boolean => {
    if (typeof value === 'string') {
        if (value.trim() === '') {
            return true;
        } else if (
            Array.isArray(value) &&
            value.every((item) => typeof item === 'string')
        ) {
            return true;
        }
    }
    return false;
};
