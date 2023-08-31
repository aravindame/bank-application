/**
 * Represents an interest rule for calculating interest on transactions.
 */
export class InterestRule {
    /**
     * The date on which the interest rule is applicable.
     */
    date: string;

    /**
     * The unique identifier for the interest rule.
     */
    ruleId: string;

    /**
     * The interest rate for the rule (in percentage).
     */
    rate: number;

    /**
     * Create a new InterestRule instance.
     * @param date The date on which the interest rule is applicable.
     * @param ruleId The unique identifier for the interest rule.
     * @param rate The interest rate for the rule (in percentage).
     */
    constructor(date: string, ruleId: string, rate: number) {
        this.date = date;
        this.ruleId = ruleId;
        this.rate = rate;
    }
}
