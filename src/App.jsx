/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <Router>
      <header>
        <h1>Book Review App</h1>
        <nav>
          <Link to="/">ホーム</Link>
          <Link to="/signup">サインアップ</Link>
          <Link to="/login">ログイン</Link>
        </nav>
      </header>

      {/* Routesを使って、遷移先を指定 */}
      <Routes>
        {/* ホームページ（トップページ） */}
        <Route
          path="/"
          element={
            <main>
              <h3>
                <p className="first-title">書籍レビューアプリにようこそ！</p>
                <p>初めての方は，右上からサインアップを選択し，アカウントを作成してください．</p>
                <p>すでにアカウントをお持ちの方は，右上からログインを選択して，自分のアカウントにログインをお願いします．</p>
                <br />
                <img src="./src/assets/eye_ganseihirou_book_woman.png" height={150} />
              </h3>
            </main>
          }
        />
        {/* サインアップページ */}
        <Route path="/signup" element={<Signup />} />
        {/* ログインページ */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
