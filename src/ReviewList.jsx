/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ReviewList.css";

// 各レビュー(タイトル)を表示するためのコンポーネント．
const ReviewList = ({ reviews }) => {
  const [stateIsMine, setStateIsMine] = useState({}); // 各レビューのisMineを，オブジェクトで管理．
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchIsMine = async () => {
      setIsLoading(true);

      const token = localStorage.getItem("authToken");
      const isMineMap = {};

      for (const review of reviews) {
        // reviewsは配列なので，for文を回して，1つずつ取り出して処理する．
        try {
          const response = await axios.get(
            `https://railway.bookreview.techtrain.dev/books/${review.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          isMineMap[review.id] = response.data.isMine; // 各IDごとに， isMineを保存．
        } catch (error) {
          console.error(
            `レビューID: ${review.id} の isMine 情報取得に失敗しました`,
            error
          );
        }
      }

      setStateIsMine(isMineMap);
      setIsLoading(false);
    };

    fetchIsMine();
  }, [reviews]);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  return (
    <>
      <ul className="review-list__items">
        {reviews.map((review) => (
          <li key={review.id} className="review-list__item">
            <Link to={`/detail/${review.id}`}>
              <h2 className="review-list__item-title">{review.title}</h2>
            </Link>
            {stateIsMine[review.id] && ( // review.isMineがBookListで用いているAPIでは存在しないので，isMineの情報が含まれているAPIを用いたfetchIsMineから，isMineの情報を得ている．
              <Link
                to={`/edit/${review.id}`}
                className="review-list__edit-button"
              >
                編集
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReviewList;
