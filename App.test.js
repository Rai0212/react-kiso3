/**
  * @jest-environment jsdom
  */

/* eslint-disable no-undef */

// 参照：https://zenn.dev/crsc1206/articles/de79af226d0c69
// 2時間くらいかかった．．．，だいぶ試行錯誤した．先人たちに感謝．

import { render, screen } from '@testing-library/react';
import App from './src/App';
import '@testing-library/jest-dom';

test('renders email, password fields, and login button', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument(); // メールの入力フォームがあること
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument(); // パスワードの入力フォームがあること
  expect(screen.getByRole('button', { name: "Login" })).toBeInTheDocument(); // "Login"と書いてあるボタンがあること
});
