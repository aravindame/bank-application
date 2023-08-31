import { Account } from '../models/IAccount';
import { InterestRule } from '../models/InterestRule';
import { InterestRuleValidator } from '../models/IInterestRuleValidator';
import { TransactionValidator } from '../models/ITransactionValidator';
import {
  validateMonth,
} from '../validators/DefaultValidator';
import { AccountService } from "../services/AccountService";
import { InterestCalculatorService } from "../services/InterestCalculatorService";
import { TransactionImpl } from "../models/TransactionImpl";
import { TransactionService } from "../services/TransactionService";

/**
 * A comprehensive banking system that manages various financial operations.
 */
export class BankAccountSystem {

  private transactionService: TransactionService;
  private interestCalculator: InterestCalculatorService;
  private accountService: AccountService;

  constructor(
    private readonly transactionValidator: TransactionValidator,
    private readonly interestRuleValidator: InterestRuleValidator
  ) {
    this.transactionService = new TransactionService();
    this.interestCalculator = new InterestCalculatorService();
    this.accountService = new AccountService();
  }

  /**
   * Adds a new transaction to the system.
   * @param transaction The transaction to be added.
   */
  public addTransaction(transaction: TransactionImpl) {
    try {
      if (!this.transactionValidator.isValidTransaction(transaction)) {
        throw new Error("Invalid transaction data.");
      }
      this.transactionService.addTransaction(transaction);
      this.updateAccountBalance(transaction.account, transaction.type, transaction.amount);
    } catch (error: any) {
      console.log("An error occurred:", error.message);
    }
  }

  /**
   * Adds multiple transactions to the system.
   * @param transactions The list of transactions to be added.
   */
  public addTransactions(transactions: TransactionImpl[]) {
    try {
      transactions.forEach(transaction => {
        this.addTransaction(transaction);
      });
    } catch (error: any) {
      console.log("An error occurred:", error.message);
    }
  }

  /**
   * Adds a new interest rule to the system.
   * @param interestRule The interest rule to be added.
   */
  public addInterestRule(interestRule: InterestRule) {
    try {
      if (!this.interestRuleValidator.isValidInterestRule(interestRule)) {
        throw new Error("Invalid interest rule data.");
      }
      this.interestCalculator.addInterestRule(interestRule);
    } catch (error: any) {
      console.log("An error occurred:", error.message);
    }
  }

  /**
   * Adds a new account to the system.
   * @param account The account to be added.
   */
  public addAccount(account: Account) {
    try {
      this.accountService.addAccount(account);
    } catch (error: any) {
      console.log("An error occurred:", error.message);
    }
  }

  /**
   * Calculates interest for all accounts.
   */
  public calculateInterest() {
    try {
      const accounts = this.accountService.getAllAccounts();
      for (const account of accounts) {
        const transactions = this.transactionService.getTransactionsForAccount(account.id);
        const interest = this.interestCalculator.calculateInterestForAccount(account, transactions);
        account.annualizedInterest += interest;
      }
    } catch (error: any) {
      console.log("An error occurred:", error.message);
    }
  }

  /**
   * Prints a statement for a given account and month.
   * @param accountId The ID of the account.
   * @param month The month for which to generate the statement.
   */
  public printStatement(accountId: string, month: string) {
    try {
      if (!validateMonth(month)) {
        throw new Error("Invalid month. Month should be between 01 and 12.");
      }

      const account = this.accountService.findAccount(accountId);
      if (!account) {
        throw new Error("Account not found.");
      }

      const transactions = this.transactionService.getTransactionsForAccount(accountId);
      const interest = this.interestCalculator.calculateInterestForAccount(account, transactions);

      const statement = this.createStatement(account, transactions, interest);
      console.log(statement);
    } catch (error: any) {
      console.log("An error occurred:", error.message);
    }
  }

  /**
   * Get an account by its ID.
   * @param accountId The ID of the account to retrieve.
   * @returns The account with the specified ID, or null if not found.
   */
  public getAccountById(accountId: string): Account | undefined {
    return this.accountService.findAccount(accountId);
  }

  /**
   * Updates the account balance based on the transaction type and amount.
   * @param accountId The ID of the account.
   * @param type The transaction type (D for deposit, W for withdrawal).
   * @param amount The transaction amount.
   */
  private updateAccountBalance(accountId: string, type: string, amount: number) {
    try {
      const account = this.accountService.findAccount(accountId);
      if (!account) {
        return;
      }

      if (type === "D") {
        account.balance += amount;
      } else if (type === "W") {
        account.balance -= amount;
      }
    } catch (error: any) {
      console.log("An error occurred:", error.message);
    }
  }

  /**
   * Creates a statement for an account with transactions and interest.
   * @param account The account for which to generate the statement.
   * @param transactions The list of transactions for the account.
   * @param interest The calculated interest for the account.
   * @returns The generated statement.
   */
  private createStatement(account: Account, transactions: TransactionImpl[], interest: number) {
    try {
      let statement = `
        Account: ${account.id}
        Date     | Txn Id      | Type | Amount | Balance |
      `;
      for (const transaction of transactions) {
        statement += `
          ${transaction.date} | ${transaction.account}-${transaction.date}-01 | ${transaction.type} | ${transaction.amount} | ${account.balance} |
        `;
      }
      statement += `
        20230630 |             | I    | ${interest.toFixed(2)} | ${(account.balance + interest).toFixed(2)} |
      `;
      return statement;
    } catch (error: any) {
      console.log("An error occurred:", error.message);
      return "";
    }
  }
  
}
