/* eslint-disable no-unused-vars */
// 参考：https://qiita.com/rh_/items/f3ad6037c13b4c9f33e1

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BookList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setReviews,
  setErrorMessage,
  setLoading,
  setOffset,
} from "./bookSlice";
import ReviewList from "./ReviewList";
import Pagination from "./Pagination";

const BookList = () => {
  const dispatch = useDispatch();
  const { reviews, errorMessage, offset, isLoading } = useSelector(
    (state) => state.book
  );

  useEffect(() => {
    const fetchReviews = async () => {
      dispatch(setLoading(true));
      dispatch(setErrorMessage(""));

      try {
        const response = await axios.get(
          `https://railway.bookreview.techtrain.dev/public/books?offset=${offset}` // ページを更新できるよう，${offset}に．
        );
        dispatch(setReviews(response.data)); // 10件だけ表示，APIの仕様(10件ずつ返ってくる)より．
      } catch (error) {
        dispatch(setErrorMessage("データ取得エラーが発生しました"));
      } finally {
        dispatch(setLoading(false)); // ローディング終了
      }
    };

    fetchReviews();
  }, [offset, dispatch]);

  return (
    <div className="review-list">
      <h2 className="review-list__title">書籍レビュー一覧</h2>
      <Link to="/new" className="new-review__post">新規レビュー投稿</Link>
      <p>タイトルにカーソルを合わせ，左クリックすると，各本の詳細ページへ移動します．</p>
      {isLoading && <p>読み込み中...</p>}
      <ReviewList reviews={reviews} />
      {errorMessage && <div className="review-list__error">{errorMessage}</div>}
      {!isLoading && <Pagination />}
    </div>
  );
};

export default BookList;
