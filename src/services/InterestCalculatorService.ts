import { Account } from "../models/IAccount";
import { InterestRule } from "../models/InterestRule";
import { TransactionImpl } from "../models/TransactionImpl";

/**
 * The InterestCalculatorService class calculates interest for accounts based on interest rules and transactions.
 */
export class InterestCalculatorService {

  private readonly interestRules: InterestRule[] = [];

/**
 * Adds an interest rule to the list of interest rules.
 * @param interestRule - The interest rule to be added.
 */
public addInterestRule(interestRule: InterestRule) {
  try {
    const existingRule = this.findInterestRuleById(interestRule.ruleId);
    if (existingRule) {
      throw new Error(`Interest rule with ID '${interestRule.ruleId}' already exists.`);
    }
    this.interestRules.push(interestRule);
  } catch (error: any) {
    console.log("An error occurred while adding an interest rule:", error.message);
  }
}

  /**
   * Calculates the interest for a specific account based on its transactions and interest rules.
   * @param account - The account for which interest needs to be calculated.
   * @param transactions - The transactions associated with the account.
   * @returns The calculated interest amount.
   */
  public calculateInterestForAccount(account: Account, transactions: TransactionImpl[]): number {
    try {
      let interest = 0;
      let endOfDayBalance = account.balance;

      for (const transaction of transactions) {
        if (transaction.account === account.id) {
          if (transaction.type === 'D') {
            endOfDayBalance += transaction.amount;
          } else if (transaction.type === 'W') {
            endOfDayBalance -= transaction.amount;
          }
          for (const interestRule of this.interestRules) {
            if (transaction.date >= interestRule.date) {
              const dailyInterest = (endOfDayBalance * interestRule.rate) / 100;
              interest += dailyInterest;
            }
          }
        }
      }
      return interest;
    } catch (error: any) {
      console.log("An error occurred while calculating interest:", error.message);
      return 0;
    }
  }
  /**
   * returns the list of interest rules.
   * @return interestRule - The list of interest rules.
   */
  public getAllInterestRules(): InterestRule[] {
    return this.interestRules;
  }

  /**
   * Finds an interest rule by its ID.
   * @param ruleId - The ID of the interest rule to find.
   * @returns The interest rule with the specified ID, or null if not found.
   */
  public findInterestRuleById(ruleId: string): InterestRule | null {
    try {
      return this.interestRules.find(rule => rule.ruleId === ruleId) || null;
    } catch (error: any) {
      console.log("An error occurred while finding an interest rule:", error.message);
      return null;
    }
  }
}
