/* eslint-disable no-unused-vars */

import React from "react";
import "./Home.css";

// ホーム画面を表示するためのコンポーネント．
const Home = () => {
  return (
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
          alt="book illustration"
          height="auto"
        />
      </h3>
    </main>
  );
};

export default Home;
