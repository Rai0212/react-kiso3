/**
  * @jest-environment jsdom
  */

/* eslint-disable no-undef */

// 参照：https://zenn.dev/crsc1206/articles/de79af226d0c69
// 2時間くらいかかった．．．，だいぶ試行錯誤した．

import { render, screen } from '@testing-library/react';
import App from './src/App';
import '@testing-library/jest-dom';

test('renders email, password fields, and login button', () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText('Email');
  const passwordInput = screen.getByPlaceholderText('Password');

  expect(emailInput).toBeInTheDocument(); // placeholderがEmailであるものが存在すること
  expect(passwordInput).toBeInTheDocument(); // placeholderがPasswordであるものが存在すること

  expect(emailInput).toHaveAttribute('type', 'text'); // emailInputのtypeがtextであること
  expect(passwordInput).toHaveAttribute('type', 'password'); // passwordInputのtypeがpasswordであること

  expect(screen.getByRole('button', { name: "Login" })).toBeInTheDocument(); // "Login"と書いてあるボタンがあること
});
