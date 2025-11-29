import { expect, Locator } from '@playwright/test';

export class Helper {
  constructor() {}

  /**
   * Reusable method to verify CSS color properties (border, background, or text color)
   *
   * @param element        - Playwright Locator of the target element
   * @param expectedColor  - Expected RGB color string, e.g. 'rgb(248, 76, 108)'
   * @param style          - Which CSS property to check: "border" | "background" | "color"
   */
  async checkColor(
    element: Locator,
    expectedColor: string,
    style: string,
  ): Promise<void> {
    if (style === 'border') {
      // Check border color (used for input validation errors)
      await expect(element).toHaveCSS('border-color', expectedColor);
    } else if (style === 'background') {
      // Check background color (used for buttons, e.g. blue submit button)
      await expect(element).toHaveCSS('background-color', expectedColor);
    } else if (style === 'color') {
      // Check text color (used for error messages in red)
      await expect(element).toHaveCSS('color', expectedColor);
    }
  }
}
