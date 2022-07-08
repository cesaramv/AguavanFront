export const capitalize = (value): string => {
    if (!value) return value;
    return `${value.charAt(0).toUpperCase()}${value.slice(1).toLocaleLowerCase()}`
}

export const percentageToDecimal = (value, precision) =>
    parseFloat((value / 100).toFixed(precision));

export const decimaltoPercentage = (value, precision) =>
    parseFloat((value * 100).toFixed(precision));

export const roundWithDecimals = (value, decimals) => 
    Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);