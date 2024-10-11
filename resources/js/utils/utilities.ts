let debounceFunction = null;

export const debounce = (
    callback: (args?: unknown) => void,
    timeout?: number
) => {
    if (debounceFunction) {
        clearTimeout(debounceFunction);
    }

    debounceFunction = setTimeout(callback, timeout);
};