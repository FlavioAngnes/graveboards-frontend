import { FilterOperators } from "@/types/filters";

/**
 * Returns the symbol representation of a given filter operation.
 *
 * @param {FilterOperators} operation - The filter operation abbreviation.
 * @returns {string} The symbol corresponding to the filter operation.
 */
export const getOperatorSymbol = (operation: FilterOperators): string => {
    switch (operation) {
        case "eq":
            return "=";
        case "neq":
            return "≠";
        case "gt":
            return ">";
        case "lt":
            return "<";
        case "gte":
            return "≥";
        case "lte":
            return "≤";
        default:
            return operation;
    }
}

/**
 * Returns the text representation of a given filter operation.
 *
 * @param {string} operation - The filter operation abbreviation.
 * @param {boolean} abbr - Whether to return the abbreviation or the full text.
 * @returns {string} The text corresponding to the filter operation.
 */
export const getOperatorText = (operation: string, abbr: boolean = false): string => {
    switch (operation) {
        case "=":
            return abbr ? "eq" : "equals";
        case "!=":
            return abbr ? "neq" : "not equals";
        case ">":
            return abbr ? "gt" : "greater than";
        case "<":
            return abbr ? "lt" : "less than";
        case ">=":
            return abbr ? "gte" : "greater than or equals";
        case "<=":
            return abbr ? "lte" : "less than or equals";
        default:
            return operation;
    }
}
