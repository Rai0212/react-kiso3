// Login.jsxでonLoginを呼び出す
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ローディング中の状態

  return (
    <div>
      <h2>ログイン</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          setIsLoading(true); // ローディング開始
          try {
            const response = await axios.post(
              "https://railway.bookreview.techtrain.dev/signin",
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const token = response.data.token;
            if (token) {
              localStorage.setItem("authToken", token);
              console.log("login success!");
              onLogin(); // ログイン状態を設定
              navigate("/booklist"); // 書籍一覧ページにリダイレクト
            } else {
              console.error("トークンの取得に失敗しました");
            }
          } catch (error) {
            if (error.response) {
              console.error("ログインエラー:", error.response.data);
              if (error.response.data.ErrorCode === 404) {
                setErrorMessage("そのメールアドレスは登録されていません");
              } else if (error.response.data.ErrorCode === 400) {
                setErrorMessage("すべて入力してください");
              } else if (error.response.data.ErrorCode === 403) {
                setErrorMessage("パスワードが違います");
              }else if (error.response.data.ErrorCode === 401) {
                setErrorMessage("認証エラー");
              } else if (error.response.data.ErrorCode === 500) {
                setErrorMessage("サーバーでエラーが発生しています");
              } else if (error.response.data.ErrorCode === 503) {
                setErrorMessage("現在，サービスが利用できません");
              }
            } else {
              console.error("エラー:", error.message);
            }
          } finally {
            setIsLoading(false); // ローディング終了
          }
        }}
      >
        <Form>
          <div>
            <label>メールアドレス</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>パスワード</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}
        </Form>
      </Formik>
      <p>
        <a href="/signup">サインアップはこちらから</a>
      </p>
    </div>
  );
};

export default Login;
