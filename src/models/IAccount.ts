/**
 * Represents a bank account.
 */
export interface Account {
    /**
     * The unique identifier of the account.
     */
    id: string;

    /**
     * The current balance of the account.
     */
    balance: number;

    /**
     * The annualized interest amount earned on the account.
     */
    annualizedInterest: number;
}
