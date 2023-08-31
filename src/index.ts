import { BankAccountSystem } from "./core/BankAccountSystem";
import { DefaultInterestRuleValidator } from "./validators/DefaultInterestRuleValidator";
import { DefaultTransactionValidator } from "./validators/DefaultTransactionValidator";
import { TransactionService } from "./models/TransactionImpl";
import { InterestRule } from "./models/InterestRule";
import {
    isValidDate,
    isValidAmount,
    isValidType,
    isValidInterestRate,
    validateMonth,
} from './validators/DefaultValidator';

/**
 * The `BankAccountSystemConsoleInterface` class represents a user interface for interacting with the banking system.
 * It handles user input, provides options for inputting transactions, defining interest rules, printing statements,
 * and quitting the application.
 */

class BankAccountSystemConsoleInterface {

    private bankAccountSystem: BankAccountSystem;

    constructor(bankAccountSystem: BankAccountSystem) {
        this.bankAccountSystem = bankAccountSystem;
    }

    /**
     * Starts the user input handling loop.
     */
    public start() {
        console.log("Welcome to AwesomeGIC Bank! What would you like to do?");
        console.log("[I]nput transactions");
        console.log("[D]efine interest rules");
        console.log("[P]rint statement");
        console.log("[Q]uit");

        process.stdin.on('data', (input) => {
            const userInput = input.toString().trim().toUpperCase();

            if (userInput === 'I') {
                this.handleInputTransaction();
            } else if (userInput === 'D') {
                this.handleDefineInterestRule();
            } else if (userInput === 'P') {
                this.handlePrintStatement();
            } else if (userInput === 'Q') {
                this.handleQuit();
            } else {
                console.log("Invalid input. Please enter a valid option.");
            }
        });
    }
    /**
     * Handles user input for adding transactions.
     * Prompts the user for transaction details and validates input before adding the transaction.
     * Displays success or error messages accordingly.
     */
    private handleInputTransaction() {
        console.log("Please enter transaction details in <Date>|<Account>|<Type>|<Amount> format");
        console.log("(or enter blank to go back to main menu):");

        process.stdin.once('data', (input) => {
            try {
                const userInput = input.toString().trim();
                if (userInput === '') {
                    this.start();
                } else {
                    const [date, account, type, amountStr] = userInput.split('|');
                    const amount = parseFloat(amountStr);

                    if (isValidDate(date) && isValidAmount(amountStr) && isValidType(type)) {
                        const transaction = new TransactionService(date, account, type, amount);
                        this.bankAccountSystem.addTransaction(transaction);
                        console.log("Transaction added successfully!");
                    } else {
                        console.log("Invalid transaction data. Please check the input values.");
                    }
                }
            } catch (error: any) {
                console.log("An error occurred:", error.message);
            } finally {
                this.start();
            }
        });
    }
    /**
     * Handles user input for defining interest rules.
     * Prompts the user for interest rule details and validates input before adding the interest rule.
     * Displays success or error messages accordingly.
     */
    private handleDefineInterestRule() {
        console.log("Please enter interest rule details in <Date>|<RuleId>|<Rate in %> format");
        console.log("(or enter blank to go back to main menu):");

        process.stdin.once('data', (input) => {
            try {
                const userInput = input.toString().trim();
                if (userInput === '') {
                    this.start();
                } else {
                    const [date, ruleId, rateStr] = userInput.split('|');
                    const rate = parseFloat(rateStr);

                    if (isValidDate(date) && isValidInterestRate(rateStr)) {
                        const interestRule = new InterestRule(date, ruleId, rate);
                        this.bankAccountSystem.addInterestRule(interestRule);
                        console.log("Interest rule added successfully!");
                    } else {
                        console.log("Invalid interest rule data. Please check the input values.");
                    }
                }
            } catch (error: any) {
                console.log("An error occurred:", error.message);
            } finally {
                this.start();
            }
        });
    }
    /**
     * Handles user input for printing account statements.
     * Prompts the user for account and month details to generate the statement.
     * Validates input before printing the statement and displays any errors encountered.
     */
    private handlePrintStatement() {
        console.log("Please enter account and month to generate the statement <Account>|<Month>");
        console.log("(or enter blank to go back to main menu):");

        process.stdin.once('data', (input) => {
            try {
                const userInput = input.toString().trim();
                if (userInput === '') {
                    this.start();
                } else {
                    const [accountId, month] = userInput.split('|');

                    if (validateMonth(month)) {
                        this.bankAccountSystem.printStatement(accountId, month);
                    } else {
                        console.log("Invalid month. Month should be between 01 and 12.");
                    }
                }
            } catch (error: any) {
                console.log("An error occurred:", error.message);
            } finally {
                this.start();
            }
        });
    }
    /**
     * Handles user input for quitting the banking application.
     * Displays a thank you message and exits the application with a status code of 0.
     */
    private handleQuit() {
        console.log("Thank you for banking with AwesomeGIC Bank.");
        console.log("Have a nice day!");
        process.exit(0);
    }
}

const transactionValidator = new DefaultTransactionValidator();
const interestRuleValidator = new DefaultInterestRuleValidator();

const bankAccountSystem = new BankAccountSystem(transactionValidator, interestRuleValidator);

const userInputHandler = new BankAccountSystemConsoleInterface(bankAccountSystem);
userInputHandler.start();
