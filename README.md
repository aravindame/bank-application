# Bank Application

This is a simple banking system that handles operations on bank accounts. The system is capable of the following features:

1. Input banking transactions
2. Calculate interest
3. Print account statement

## Usage

To use the system, follow these steps:

1. Run the following command to start the system:

`npm start`

2. The system will prompt you to select an action. Enter the number of the action you want to perform.
3. For each action, the system will ask you for the necessary information. Enter the information as prompted.
4. The system will then perform the action and display the results.

## Actions

The system supports the following actions:

1: Input a banking transaction
2: Calculate interest for an account
3: Print an account statement
4: Quit

## Examples

Here are some examples of how to use the system:

### Add transaction

To input a banking transaction, enter 1 and then follow the prompts. For example, to deposit $100 into account AC001 on June 26, 2023, you would enter the following:

1
AC001
D
100
20230626

* To calculate interest for account AC001 for the month of June, enter 2 and then enter AC001 and 06.
* To print an account statement for account AC001 for the month of June, enter 3 and then enter AC001 and 06.
* To quit the system, enter 4.

### Add interest rule

To add an interest rule, enter 2 and then follow the prompts. The system will ask you for the following information:

Date
Interest rate

Once you have entered all of the necessary information, the system will add the interest rule to the database.

Here is an example of how to add an interest rule:

2
20230701
2.00

This will add a deposit of $100 into account AC001 on June 26, 2023. It will also add an interest rule that applies a 2% interest rate on all transactions that occur on or after July 1, 2023.

## Tips

* You can enter a blank line to skip a prompt.
* You can press `Ctrl + C` to quit the system at any time.