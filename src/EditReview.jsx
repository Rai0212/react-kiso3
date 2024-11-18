/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./EditReview.css";

// レビューを編集するためのコンポーネント．
const EditReview = () => {
  const { id } = useParams(); // IDをURLから取得．
  const [initialValues, setInitialValues] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 本の詳細を得るためのコンポーネント．
    // 入力欄にあらかじめセットするために，先にfetchする．
    const fetchBookDetails = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get(
          `https://railway.bookreview.techtrain.dev/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInitialValues({
          title: response.data.title,
          url: response.data.url,
          detail: response.data.detail,
          review: response.data.review,
        });
      } catch (error) {
        setErrorMessage("書籍情報の取得に失敗しました。");
      }
    };

    fetchBookDetails();
  }, [id]);

  // レビューを更新するためのコンポーネント．
  const handleUpdate = async (values) => {
    const token = localStorage.getItem("authToken");
    setIsUpdating(true);

    try {
      await axios.put(
        `https://railway.bookreview.techtrain.dev/books/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("書籍レビューを更新しました！");
      navigate("/booklist");
    } catch (error) {
      setErrorMessage("書籍レビューの更新に失敗しました。");
    } finally {
      setIsUpdating(false);
    }
  };

  // レビューを削除するためのコンポーネント．
  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    setIsDeleting(true);

    try {
      await axios.delete(
        `https://railway.bookreview.techtrain.dev/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("書籍レビューを削除しました！");
      navigate("/booklist");
    } catch (error) {
      setErrorMessage("書籍レビューの削除に失敗しました。");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!initialValues) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="edit-review">
      <h2>書籍レビュー編集</h2>
      <Formik initialValues={initialValues} onSubmit={handleUpdate}>
        <Form className="edit-review__form">
          <div>
            <label>
              各項目，入力欄の右下にカーソルを合わせ，マウスの左クリックを押しながら操作することで，枠の大きさを調節できます．
            </label>
          </div>
          <br />

          <div>
            <label>書籍タイトル</label>
            <Field
              as="textarea"
              type="text"
              name="title"
              className="edit-review__title"
            />
            <ErrorMessage name="title" component="div" />
          </div>

          <div>
            <label>書籍リンク(URL):</label>
            <Field
              as="textarea"
              type="url"
              name="url"
              className="edit-review__url"
            />
            <ErrorMessage name="url" component="div" />
          </div>

          <div>
            <label>書籍の詳細:</label>
            <Field
              as="textarea"
              type="text"
              name="detail"
              className="edit-review__detail"
            />
            <ErrorMessage name="detail" component="div" />
          </div>

          <div>
            <label>レビュー:</label>
            <Field
              as="textarea"
              type="text"
              name="review"
              className="edit-review__review"
            />
            <ErrorMessage name="review" component="div" />
          </div>

          <button
            type="submit"
            className="edit-review__button"
            disabled={isUpdating}
          >
            {isUpdating ? "更新中..." : "更新"}
          </button>
          <button
            type="button"
            className="edit-review__button-delete"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "削除中..." : "削除"}
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

export default EditReview;
