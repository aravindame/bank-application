/**
 * Represents a transaction.
 */
export interface Transaction {
    /**
     * The unique identifier of the transaction.
     */
    id: string;
    
    /**
     * The date of the transaction in string format.
     */
    date: string;
    
    /**
     * The account associated with the transaction.
     */
    account: string;
    
    /**
     * The type of the transaction (e.g., "D" for deposit, "W" for withdrawal).
     */
    type: string;
    
    /**
     * The amount of the transaction.
     */
    amount: number;
}
