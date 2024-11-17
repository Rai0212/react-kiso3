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

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserName = localStorage.getItem("userName");
    console.log("Stored userName from localStorage:", storedUserName);
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, [userName]);

  const handleLogin = (token, name) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userName", name);
    setIsLoggedIn(true);
    setUserName(name);
    navigate("/booklist");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // 認証トークンの削除．
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  // 参考資料：https://jp-seemore.com/web/28301/#toc9
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
      </Routes>
    </>
  );
};

export default AppContent;
