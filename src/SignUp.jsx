/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import Compressor from "compressorjs";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
  const [file, setFile] = useState(null); // アップロードする画像
  const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージ用ステート
  const [loading, setLoading] = useState(false); // ローディング状態を管理
  const navigate = useNavigate();

  // 画像アップロード処理
  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    if (image) {
      new Compressor(image, {
        quality: 0.5,
        success(result) {
          setFile(result);
        },
      });
    }
  };

  return (
    <div className="new-register">
      <h2>新規登録</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "", file: null }}
        onSubmit={async (values) => {
          setLoading(true); // 登録処理開始時にローディング開始
          const formData = {
            name: values.name,
            email: values.email,
            password: values.password,
          };

          try {
            // 1. ユーザー登録
            const userResponse = await axios.post(
              "https://railway.bookreview.techtrain.dev/users",
              formData,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            // ユーザー登録成功時にトークンを取得
            const token = userResponse.data.token;

            // 2. 画像アップロード
            const imageFormData = new FormData();
            imageFormData.append("icon", file);

            // ヘッダーにトークンを設定して画像をアップロード
            const uploadResponse = await axios.post(
              "https://railway.bookreview.techtrain.dev/uploads",
              imageFormData,
              {
                method: "POST",
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log("image upload success!:", uploadResponse.data);

            // ログインページにリダイレクト
            navigate("/login");
          } catch (error) {
            // エラーハンドリング
            if (error.response) {
              if (error.response.data.ErrorCode === 400) {
                setErrorMessage("すべて入力してください");
              } else if (error.response.data.ErrorCode === 401) {
                setErrorMessage("認証エラー");
              } else if (error.response.data.ErrorCode === 409) {
                setErrorMessage("このメールアドレスは既に登録されています");
              } else if (error.response.data.ErrorCode === 500) {
                setErrorMessage("サーバーでエラーが発生しています");
              } else if (error.response.data.ErrorCode === 503) {
                setErrorMessage("現在，サービスが利用できません");
              } else if (!file) {
                setLoading(false);
                setErrorMessage("ファイルを添付してください");
                return; // 処理を中断
              }
            }
            console.error("登録エラー:", error.response?.data || error.message);
          } finally {
            setLoading(false); // 登録処理終了時にローディング終了
          }
        }}
      >
        <Form>
          <div>
            <label>ユーザー名</label>
            <Field name="name" type="text" placeholder="name" className="user-name-input" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label>メールアドレス</label>
            <Field name="email" type="email" placeholder="mail" className="mail-input" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>パスワード</label>
            <Field name="password" type="password" placeholder="password" className="password-input" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <label>ユーザーアイコン</label>
            <input
              type="file"
              placeholder="アイコンの選択"
              onChange={handleImageUpload}
            />
          </div>
          <button type="submit" className="register" disabled={loading}>
            {loading ? "登録中..." : "登録"}
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
        <a href="/login">ログインはこちらから</a>
      </p>
    </div>
  );
};

export default Signup;
