import { Transaction } from "./ITransaction";

/**
 * Represents a concrete implementation of a transaction.
 */
export class TransactionImpl implements Transaction {

    /**
     * The unique identifier of the transaction.
     */
    public id: string;

    /**
     * The date when the transaction occurred.
     */
    public date: string;

    /**
     * The account associated with the transaction.
     */
    public account: string;

    /**
     * The type of the transaction (e.g., deposit or withdrawal).
     */
    public type: string;

    /**
     * The amount involved in the transaction.
     */
    public amount: number;

    /**
     * Constructs a new TransactionService object.
     * @param date - The date when the transaction occurred.
     * @param account - The account associated with the transaction.
     * @param type - The type of the transaction (e.g., deposit or withdrawal).
     * @param amount - The amount involved in the transaction.
     */
    constructor(date: string, account: string, type: string, amount: number) {
        this.date = date;
        this.id = this.generateTransactionId(date, account, type);
        this.type = type;
        this.account = account
        this.amount = amount;
    }

    /**
     * Generates a unique transaction ID based on the date, account, and type.
     * @param date - The date of the transaction.
     * @param account - The account associated with the transaction.
     * @param type - The type of the transaction.
     * @returns The generated transaction ID.
     */
    public generateTransactionId(date: string, account: string, type: string): string {
        if (!account) return `${date}-01`;
        const timestamp = Math.floor(Date.now() / 1000);
        return `${date}-${account}-${type}-${timestamp % 100000}`;
    }

}
