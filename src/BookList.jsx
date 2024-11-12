import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookList.css";

const BookList = () => {
  const [reviews, setReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchReviews = async () => {
    setErrorMessage("");

    try {
      const response = await axios.get(
        `https://railway.bookreview.techtrain.dev/public/books?offset=0`
      );
      setReviews(response.data); // 最初の10件だけ表示，APIの仕様より．
    } catch (error) {
      if (error.response) {
        setErrorMessage("データ取得エラーが発生しました");
      } else {
        setErrorMessage("エラー: " + error.message);
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="review-list">
      <h2 className="review-list__title">書籍レビュー一覧</h2>
      <ul className="review-list__items">
        {reviews.map((review) => (
          <li key={review.id} className="review-list__item">
            <h3 className="review-list__item-title">タイトル: {review.title}</h3>
            <p className="review-list__item-review">レビュー: {review.detail}</p>
            <p className="review-list__item-reviewer">投稿者: {review.reviewer}</p>
          </li>
        ))}
      </ul>
      {errorMessage && <div className="review-list__error">{errorMessage}</div>}
    </div>
  );
};

export default BookList;
