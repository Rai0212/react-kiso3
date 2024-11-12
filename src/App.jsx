/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Signup from "./SignUp";
import Login from "./Login";
import BookList from "./BookList"; // 書籍レビュー一覧ページ
import "./App.css";

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {!isLoggedIn && (
        <header>
          <h1>Book Review App</h1>
          <nav>
            <Link to="/">ホーム</Link>
            <Link to="/signup">サインアップ</Link>
            <Link to="/login">ログイン</Link>
          </nav>
        </header>
      )}
      {isLoggedIn && (
        <header>
          <h1>Book Review App</h1>
          <nav>
            <Link to="/">ホーム</Link>
            <Link to="/signup">サインアップ</Link>
            <Link to="/login">ログイン</Link>
            <Link to="/booklist">書籍レビュー一覧</Link>
          </nav>
        </header>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h3>
                <p className="first-title">書籍レビューアプリにようこそ！</p>
                <p>
                  初めての方は，右上からサインアップを選択し，アカウントを作成してください．
                </p>
                <p>
                  すでにアカウントをお持ちの方は，右上からログインを選択して，自分のアカウントにログインをお願いします．
                </p>
                <br />
                <img
                  src="./src/assets/eye_ganseihirou_book_woman.png"
                  height={150}
                />
              </h3>
            </main>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/booklist" element={<BookList />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
