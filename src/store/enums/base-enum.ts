// using a interface and not a enum because i want the user to extend it.

/**
 * The enum that the user must extend and add more steps.
 */
export interface BaseSteps {
    initial: string;
    end: string;
}