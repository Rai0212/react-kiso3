/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BookDetail.css";

const BookDetail = () => {
  const { id } = useParams(); // URLからIDを取得．
  const [bookDetail, setBookDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBookDetail = async () => {
      setIsLoading(true);
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
        setBookDetail(response.data);

        // 書籍IDをログとして送信．
        await axios.post(
          "https://railway.bookreview.techtrain.dev/logs",
          { selectBookId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        setErrorMessage("書籍情報の取得に失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  return (
    <div className="book-detail">
      {isLoading && <p>読み込み中...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {bookDetail && (
        <div className="book-detail__content">
          <p>
            <strong>タイトル:</strong> {bookDetail.title}
          </p>
          <p>
            <strong>詳細:</strong> {bookDetail.detail}
          </p>
          <p>
            <strong>レビュー:</strong> {bookDetail.review}
          </p>
          <p>
            <strong>商品URL:</strong> {bookDetail.url}
          </p>
          <p>
            <strong>投稿者:</strong> {bookDetail.reviewer}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
