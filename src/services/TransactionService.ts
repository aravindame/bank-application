import { TransactionImpl } from "../models/TransactionImpl";

/**
 * Represents a service that manages transactions.
 */
export class TransactionService {
    private readonly transactions: TransactionImpl[] = [];

    /**
     * Adds a transaction to the service.
     * @param transaction - The transaction to be added.
     */
    public addTransaction(transaction: TransactionImpl) {
        this.transactions.push(transaction);
    }


    /**
     * Retrieves transactions associated with a specific account.
     * @param accountId - The ID of the account.
     * @returns An array of transactions associated with the account.
     */
    public getTransactionsForAccount(accountId: string): TransactionImpl[] {
        return this.transactions.filter(transaction => transaction.account === accountId);
    }
}
