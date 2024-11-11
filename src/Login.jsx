/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // ローディング状態を管理

  return (
    <div>
      <h2>ログイン</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          setLoading(true); // ログイン処理開始時にローディング開始
          try {
            // サインインAPIにリクエスト
            const response = await axios.post(
              "https://railway.bookreview.techtrain.dev/signin",
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            // レスポンスからトークンを取得
            const token = response.data.token;

            if (token) {
              // トークンをローカルストレージに保存
              localStorage.setItem("authToken", token);
              // ダッシュボードに遷移
              console.log("login success!");
              navigate("/dashboard");
            } else {
              console.error("トークンの取得に失敗しました");
              setErrorMessage("トークンの取得に失敗しました");
            }
          } catch (error) {
            // エラーハンドリング
            if (error.response) {
              console.error("ログインエラー:", error.response.data);
              if (error.response.data.ErrorCode === 404) {
                setErrorMessage("そのメールアドレスは登録されていません");
              } else if (error.response.data.ErrorCode === 400) {
                setErrorMessage("すべて入力してください");
              } else if (error.response.data.ErrorCode === 401) {
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
            setLoading(false); // ローディング終了
          }
        }}
      >
        <Form>
          <div>
            <label>メールアドレス</label>
            <Field name="email" type="email" className="mail-input"/>
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>パスワード</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "ログイン中..." : "ログイン"}
          </button>

          {/* エラーメッセージ表示 */}
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
