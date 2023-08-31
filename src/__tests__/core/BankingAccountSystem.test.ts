import { BankAccountSystem } from "../../core/BankAccountSystem";
import { Account } from "../../models/IAccount";
import { TransactionImpl } from "../../models/TransactionImpl";
import { TransactionService } from "../../services/TransactionService";
import { AccountService } from "../../services/AccountService";
import { DefaultTransactionValidator } from "../../validators/DefaultTransactionValidator";
import { DefaultInterestRuleValidator } from "../../validators/DefaultInterestRuleValidator";
import { InterestRule } from "../../models/InterestRule";


describe("BankAccountSystem", () => {
  let bankAccountSystem: BankAccountSystem;

  beforeEach(() => {
    const transactionValidator = new DefaultTransactionValidator();
    const interestRuleValidator = new DefaultInterestRuleValidator();
    bankAccountSystem = new BankAccountSystem(transactionValidator, interestRuleValidator);
  });

  describe("Add a transaction", () => {
    it('should add a valid transaction', () => {
      const validTransaction = new TransactionImpl('20230626', 'AC001', 'W', 100.00);
      bankAccountSystem.addTransaction(validTransaction);
      const transactions = bankAccountSystem['transactionService'].getTransactionsForAccount('AC001');

      expect(transactions.length).toBe(1);
      expect(transactions[0]).toEqual(validTransaction);
    });

    it("should add a transaction and update account balance", () => {
      const account: Account = { id: "AC001", balance: 0, annualizedInterest: 0 };
      const transaction: TransactionImpl = new TransactionImpl("20230626", "AC001", "D", 100.00);

      const transactionService = new TransactionService();
      const accountService = new AccountService();
      jest.spyOn(accountService, "findAccount").mockReturnValue(account);
      
      bankAccountSystem["transactionService"] = transactionService;
      bankAccountSystem["accountService"] = accountService;

      bankAccountSystem.addTransaction(transaction);

      expect(account.balance).toBe(100.00);
    });
    
    it('should not add an invalid transaction', () => {
      const invalidTransaction = new TransactionImpl('20230626', 'AC001', 'W', -100.00);

      const consoleSpy = jest.spyOn(console, 'log');
      bankAccountSystem.addTransaction(invalidTransaction);

      expect(consoleSpy).toHaveBeenCalledWith('An error occurred:', 'Invalid transaction data.');
    });

    it('should add a valid deposit transaction and update account balance', () => {
      const validTransaction = new TransactionImpl('20230626', 'AC001', 'D', 100.00);

      const account: Account = { id: "AC001", balance: 0, annualizedInterest: 0 };
      const accountService = new AccountService();
      jest.spyOn(accountService, "findAccount").mockReturnValue(account);
      
      bankAccountSystem.addAccount(account);
      bankAccountSystem.addTransaction(validTransaction);
      const result = bankAccountSystem.getAccountById('AC001');
      expect(result?.balance).toBe(100.00);
    });

    it('should add a valid withdrawal transaction and update account balance', () => {
      const validTransaction = new TransactionImpl('20230626', 'AC001', 'W', 50.00);
      const account: Account = { id: "AC001", balance: 0, annualizedInterest: 0 };
      const accountService = new AccountService();
      jest.spyOn(accountService, "findAccount").mockReturnValue(account);
      
      bankAccountSystem.addAccount(account);
      bankAccountSystem.addTransaction(validTransaction);
      const result = bankAccountSystem.getAccountById('AC001');
      expect(result?.balance).toBe(-50.00);
    });

    it('should throw an error for invalid transaction type', () => {
      const invalidTransaction = new TransactionImpl('20230626', 'AC001', 'X', 50.00);

      const consoleSpy = jest.spyOn(console, 'log');
      bankAccountSystem.addTransaction(invalidTransaction);

      expect(consoleSpy).toHaveBeenCalledWith('An error occurred:', 'Invalid transaction data.');
    });

    it('should not update account balance for an invalid transaction', () => {
      const invalidTransaction = new TransactionImpl('20230626', 'AC001', 'D', -100.00);
      const account: Account = { id: "AC001", balance: 0, annualizedInterest: 0 };
      const accountService = new AccountService();
      jest.spyOn(accountService, "findAccount").mockReturnValue(account);

      const consoleSpy = jest.spyOn(console, 'log');
      bankAccountSystem.addTransaction(invalidTransaction);

      const result = bankAccountSystem.getAccountById('AC001');
      expect(account?.balance).toBe(0);
    });
  });

  describe('Add interest rule', () => {
    it('should add a valid interest rule', () => {
      const validInterestRule = new InterestRule('20230615', 'RULE03', 2.20);
      bankAccountSystem.addInterestRule(validInterestRule);
      const interestRules = bankAccountSystem['interestCalculator'].getAllInterestRules();
      expect(interestRules.length).toBe(1);
      expect(interestRules[0]).toEqual(validInterestRule);
    });

    it('should add multiple valid interest rules', () => {
      const rule1 = new InterestRule('20230615', 'RULE03', 2.20);
      const rule2 = new InterestRule('20230620', 'RULE04', 1.50);
  
      bankAccountSystem.addInterestRule(rule1);
      bankAccountSystem.addInterestRule(rule2);
  
      const addedRule1 = bankAccountSystem['interestCalculator'].findInterestRuleById('RULE03');
      const addedRule2 = bankAccountSystem['interestCalculator'].findInterestRuleById('RULE04');
      
      expect(addedRule1).toEqual(rule1);
      expect(addedRule2).toEqual(rule2);
    });
  
    it('should not add an interest rule with an existing rule ID', () => {
      const existingRule = new InterestRule('20230615', 'RULE03', 2.20);
      bankAccountSystem.addInterestRule(existingRule);
  
      const duplicateRule = new InterestRule('20230620', 'RULE03', 1.50);
  
      const originalLog = console.log;
      const loggedMessages:any = [];
      console.log = message => loggedMessages.push(message);
  
      bankAccountSystem.addInterestRule(duplicateRule);
  
      expect(loggedMessages).toContain("An error occurred while adding an interest rule:");
      expect(bankAccountSystem['interestCalculator'].findInterestRuleById('RULE03')).toEqual(existingRule);
  
      console.log = originalLog;
    });
  
    it('should handle adding interest rule with same date and different rule ID', () => {
      const rule1 = new InterestRule('20230615', 'RULE03', 2.20);
      const rule2 = new InterestRule('20230615', 'RULE04', 1.50);
  
      bankAccountSystem.addInterestRule(rule1);
      bankAccountSystem.addInterestRule(rule2);
  
      const addedRule = bankAccountSystem['interestCalculator'].findInterestRuleById('RULE04');
      expect(addedRule).toEqual(rule2);
    });
  });
  describe("Add an account", () => {
    it("should add a new valid account", () => {
      const account: Account = { id: "AC001", balance: 0, annualizedInterest: 0 };
  
      bankAccountSystem.addAccount(account);
  
      const addedAccount = bankAccountSystem.getAccountById("AC001");
      expect(addedAccount).toEqual(account);
    });
  
    it("should not add an account with existing ID", () => {
      const existingAccount: Account = { id: "AC001", balance: 0, annualizedInterest: 0 };
      const newAccount: Account = { id: "AC001", balance: 500, annualizedInterest: 0 };
  
      bankAccountSystem.addAccount(existingAccount);
      bankAccountSystem.addAccount(newAccount);
  
      const addedAccount = bankAccountSystem.getAccountById("AC001");
      expect(addedAccount?.balance).toBe(0);
    });
  
    it("should handle adding multiple accounts", () => {
      const account1: Account = { id: "AC001", balance: 0, annualizedInterest: 0 };
      const account2: Account = { id: "AC002", balance: 1000.00, annualizedInterest: 0 };
      const account3: Account = { id: "AC003", balance: -200.00, annualizedInterest: 0 };
  
      bankAccountSystem.addAccount(account1);
      bankAccountSystem.addAccount(account2);
      bankAccountSystem.addAccount(account3);
  
      const addedAccount1 = bankAccountSystem.getAccountById("AC001");
      const addedAccount2 = bankAccountSystem.getAccountById("AC002");
      const addedAccount3 = bankAccountSystem.getAccountById("AC003");
  
      expect(addedAccount1).toEqual(account1);
      expect(addedAccount2).toEqual(account2);
      expect(addedAccount3).toEqual(account3);
    });
  
    it("should not add an account with negative balance", () => {
      const invalidAccount: Account = { id: "AC001", balance: -100.00, annualizedInterest: 0 };
  
      const consoleSpy = jest.spyOn(console, "log");
      bankAccountSystem.addAccount(invalidAccount);
  
      expect(consoleSpy).toHaveBeenCalledWith("An error occurred:","Invalid transaction data.");
    });
  });
  
  describe("calculate correct interest", () => {
    it("should calculate interest for an account with no transactions", () => {
      const account: Account = { id: "AC001", balance: 1000.00, annualizedInterest: 0 };
      const interestRule = new InterestRule("20230615", "RULE01", 2.00);
  
      bankAccountSystem.addAccount(account);
      bankAccountSystem.addInterestRule(interestRule);
      bankAccountSystem.calculateInterest();
  
      const updatedAccount = bankAccountSystem.getAccountById("AC001");
      expect(updatedAccount?.annualizedInterest).toBe(0);
    });
  
    it("should calculate interest for an account with transactions", () => {
      const account: Account = { id: "AC001", balance: 1000.00, annualizedInterest: 0 };
      const depositTransaction = new TransactionImpl("20230601", "AC001", "D", 500.00);
      const withdrawalTransaction = new TransactionImpl("20230610", "AC001", "W", 200.00);
      const interestRule = new InterestRule("20230615", "RULE01", 2.00);
  
      const transactionService = new TransactionService();
      const accountService = new AccountService();
      jest.spyOn(accountService, "findAccount").mockReturnValue(account);
  
      bankAccountSystem["transactionService"] = transactionService;
      bankAccountSystem["accountService"] = accountService;
  
      bankAccountSystem.addAccount(account);
      bankAccountSystem.addInterestRule(interestRule);
      bankAccountSystem.addTransaction(depositTransaction);
      bankAccountSystem.addTransaction(withdrawalTransaction);
      bankAccountSystem.calculateInterest();
  
      const updatedAccount = bankAccountSystem.getAccountById("AC001");
      expect(updatedAccount?.annualizedInterest).toBeCloseTo(0);
    });
  
    it("should calculate interest for an account with multiple interest rules", () => {
      const account: Account = { id: "AC001", balance: 1000.00, annualizedInterest: 0 };
      const depositTransaction = new TransactionImpl("20230601", "AC001", "D", 500.00);
      const interestRule1 = new InterestRule("20230615", "RULE01", 2.00);
      const interestRule2 = new InterestRule("20230620", "RULE02", 1.50);
  
      const transactionService = new TransactionService();
      const accountService = new AccountService();
      jest.spyOn(accountService, "findAccount").mockReturnValue(account);
  
      bankAccountSystem["transactionService"] = transactionService;
      bankAccountSystem["accountService"] = accountService;
  
      bankAccountSystem.addAccount(account);
      bankAccountSystem.addInterestRule(interestRule1);
      bankAccountSystem.addInterestRule(interestRule2);
      bankAccountSystem.addTransaction(depositTransaction);
      bankAccountSystem.calculateInterest();
  
      const updatedAccount = bankAccountSystem.getAccountById("AC001");
      expect(updatedAccount?.annualizedInterest).toBeCloseTo(0);
    });
  });
  describe("Create Statement", () => {
  
    it("should throw an error for an invalid month", () => {
      const consoleSpy = jest.spyOn(console, "log");
      bankAccountSystem.printStatement("AC001", "13");
  
      expect(consoleSpy).toHaveBeenCalledWith("An error occurred:", "Invalid month. Month should be between 01 and 12.");
    });
  
    it("should throw an error for an account not found", () => {
      const consoleSpy = jest.spyOn(console, "log");
      bankAccountSystem.printStatement("AC002", "06");
  
      expect(consoleSpy).toHaveBeenCalledWith("An error occurred:", "Account not found.");
    });
  });
  describe("printStatement", () => {
    let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });
  
    it("should handle error and print an error message for invalid month", () => {
      const account: Account = { id: "AC002", balance: 500.0, annualizedInterest: 10.0 };
    
      bankAccountSystem.printStatement("AC002", "13");
  
      expect(consoleLogSpy).toHaveBeenCalledWith("An error occurred:", "Invalid month. Month should be between 01 and 12.");
    });
  
    it("should handle error and print an error message for account not found", () => {
  
      bankAccountSystem.printStatement("AC003", "06");
  
      expect(consoleLogSpy).toHaveBeenCalledWith("An error occurred:","Account not found.");
    });
  });
});