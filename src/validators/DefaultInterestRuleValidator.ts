import { InterestRule } from "../models/InterestRule";
import { InterestRuleValidator } from "../models/IInterestRuleValidator";
import { isValidDate, isValidInterestRate } from "./DefaultValidator";

/**
 * Default implementation of the InterestRuleValidator interface.
 * Validates the properties of an interest rule to ensure they are valid.
 */
export class DefaultInterestRuleValidator implements InterestRuleValidator {

/**
* Checks if the provided interest rule is valid.
* @param interestRule - The interest rule to be validated.
* @returns True if the interest rule is valid, false otherwise.
*/
    public isValidInterestRule(interestRule: InterestRule): boolean {
        return (
            isValidDate(interestRule.date) && isValidInterestRate(interestRule.rate.toString())
        );
    }
}