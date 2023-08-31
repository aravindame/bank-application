import { Transaction } from "../models/ITransaction";
import { TransactionValidator } from "../models/ITransactionValidator";
import { isValidAmount, isValidDate, isValidType } from "./DefaultValidator";

/**
 * Default implementation of the TransactionValidator interface.
 * Validates the properties of a transaction to ensure they are valid.
 */
export class DefaultTransactionValidator implements TransactionValidator {
    /**
     * Checks if the provided transaction is valid.
     * @param transaction - The transaction to be validated.
     * @returns True if the transaction is valid, false otherwise.
     */
    isValidTransaction(transaction: Transaction): boolean {
      return (
        isValidDate(transaction.date) &&
        isValidAmount(transaction.amount.toString()) &&
        isValidType(transaction.type)
      );
    }
}
