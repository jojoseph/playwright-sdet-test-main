import {expect, Locator} from '@playwright/test'

export class Helper{
constructor(){}
async checkColor(
  element: Locator,
  expectedColor: string
): Promise<void> {
  const actualColor = await element.evaluate(el => 
  window.getComputedStyle(el).borderColor
    /*   const actualColor = await this.createBtn.evaluate(el => 
    window.getComputedStyle(el).backgroundColor); */
);
  await expect(element).toHaveCSS('border-color', expectedColor);
}
}

