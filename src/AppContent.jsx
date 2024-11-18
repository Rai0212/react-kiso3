/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Signup from "./SignUp";
import Login from "./Login";
import BookList from "./BookList";
import Profile from "./Profile";
import NewBookReview from "./NewBookReview";
import BookDetail from "./BookDetail";
import EditReview from "./EditReview";

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // ローカルに保存されているトークンと名前を取得．
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserName = localStorage.getItem("userName");
    console.log("Stored userName from localStorage:", storedUserName);
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, [userName]);

  // ログイン処理．
  const handleLogin = (token, name) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userName", name);
    setIsLoggedIn(true);
    setUserName(name);
    navigate("/booklist");
  };

  // ログアウト処理．
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  // 参考資料：https://jp-seemore.com/web/28301/#toc9
  // ログイン状態の時に，ログイン or サインアップを選択したときに，ブックリストにリダイレクト．
  useEffect(() => {
    if (isLoggedIn) {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/signup"
      ) {
        navigate("/booklist");
      }
    }
  });

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/booklist" element={<BookList />} />
        <Route path="/detail/:id" element={<BookDetail />} />
        <Route
          path="/profile"
          element={<Profile userName={userName} setUserName={setUserName} />}
        />
        <Route path="/new" element={<NewBookReview />} />
        <Route path="/edit/:id" element={<EditReview />} />
      </Routes>
    </>
  );
};

export default AppContent;
