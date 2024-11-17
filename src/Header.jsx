/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ isLoggedIn, userName, handleLogout }) => {
  return (
    <header>
      <h1>Book Review App</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/">ホーム</Link>
            <Link to="/signup">サインアップ</Link>
            <Link to="/login">ログイン</Link>
            <span className="dis-name">こんにちは，{userName} さん</span>
            <Link to="/booklist">書籍レビュー一覧</Link>
            <Link to="/profile">ユーザー情報編集</Link>
            <button onClick={handleLogout} className="logout-button">
              ログアウト
            </button>
          </>
        ) : (
          <>
            <Link to="/">ホーム</Link>
            <Link to="/signup">サインアップ</Link>
            <Link to="/login">ログイン</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
