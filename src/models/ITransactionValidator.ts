import { Transaction } from "./ITransaction";

/**
 * Represents a validator for transaction objects.
 */
export interface TransactionValidator {
    /**
     * Checks if a given transaction is valid.
     * @param transaction - The transaction to validate.
     * @returns True if the transaction is valid, false otherwise.
     */
    isValidTransaction(transaction: Transaction): boolean;
}
