import { test, expect } from '@playwright/test';

test('displays error message for invalid email input', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // 不正なメールアドレスを入力
  await page.fill('input[placeholder="Email"]', 'invalidemail');
  await page.fill('input[placeholder="Password"]', 'password123');
  
  // ログインボタンをクリック
  await page.click('button[type="submit"]');
  
  // エラーメッセージの表示を確認
  const errorMessage = await page.locator('text=Invalid email address').isVisible();
  expect(errorMessage).toBe(true); // しっかりエラー文が出力されるかをここで確認
});
