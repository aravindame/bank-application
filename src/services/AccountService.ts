import { Account } from "../models/IAccount";

/**
 * This class handles operations related to accounts.
 */
export class AccountService {
    private readonly accounts: Account[] = [];
  
    /**
     * Adds a new account to the service.
     * @param account The account to be added.
     */
    public addAccount(account: Account) {
      this.accounts.push(account);
    }
  
    /**
     * Finds an account by its ID.
     * @param accountId The ID of the account to find.
     * @returns The found account or undefined if not found.
     */
    public findAccount(accountId: string): Account | undefined {
      return this.accounts.find((account) => account.id === accountId);
    }

    /**
     * Retrieves all accounts stored in the service.
     * @returns An array of all accounts.
     */
    public getAllAccounts(): Account[] {
      return this.accounts;
    }

}
