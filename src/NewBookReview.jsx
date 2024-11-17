/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import "./NewBookReview.css"

const NewBookReview = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "https://railway.bookreview.techtrain.dev/books",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // alert("書籍レビューを投稿しました！");
        navigate("/booklist");
      }
    } catch (error) {
      console.error("投稿エラー:", error);
      setErrorMessage("レビュー投稿に失敗しました。");
    }
  };

  return (
    <div className="new-review">
      <h2>書籍レビュー投稿</h2>
      <Formik
        initialValues={{ title: "", url: "", detail: "", review: "" }}
        onSubmit={handleSubmit}
      >
        <Form className="new-review__form">
        <div>
        <label>各項目，入力欄の右下にカーソルを合わせ，マウスの左クリックを押しながら操作することで，枠の大きさを調節できます．</label>
        </div>
        <br />
          <div>
            <label>書籍タイトル</label>
            <Field as="textarea" type="text" name="title" className="new-review__title" />
            <ErrorMessage name="title" component="div" />
          </div>

          <div>
            <label>書籍リンク(URL):</label>
            <Field as="textarea" type="url" name="url" className="new-review__url" />
            <ErrorMessage name="url" component="div" />
          </div>

          <div>
            <label>書籍の詳細:</label>
            <Field as="textarea" type="text" name="detail" className="new-review__detail" />
            <ErrorMessage name="detail" component="div" />
          </div>

          <div>
            <label>レビュー:</label>
            <Field as="textarea" type="text" name="review" className="new-review__review" />
            <ErrorMessage name="review" component="div" />
          </div>

          <button
            type="submit"
            className="new-review__button"
            disabled={isLoading}
          >
            {isLoading ? "投稿中..." : "投稿"}
          </button>

          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default NewBookReview;
