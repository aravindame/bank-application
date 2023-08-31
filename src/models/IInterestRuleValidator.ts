import { InterestRule } from "./InterestRule";

/**
 * Represents a validator for interest rules.
 */
export interface InterestRuleValidator {
    /**
     * Validates if the provided interest rule is valid.
     * @param interestRule The interest rule to be validated.
     * @returns True if the interest rule is valid, otherwise false.
     */
    isValidInterestRule(interestRule: InterestRule): boolean;
}
