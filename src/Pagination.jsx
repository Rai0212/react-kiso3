/* eslint-disable no-unused-vars */
// 参考：https://qiita.com/rh_/items/f3ad6037c13b4c9f33e1

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset } from "./bookSlice";
import "./Pagination.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const { offset } = useSelector((state) => state.book); // offsetを状態として管理．

  const handlePreviousPage = () => {
    if (offset > 0) {
      dispatch(setOffset(offset - 10));
    }
  };

  const handleNextPage = () => {
    dispatch(setOffset(offset + 10));
  };

  useEffect(() => {
    window.scrollTo(0, 0); // ページの1番上にスクロール．
  }, [offset]); // offsetが変わる度に実行．

  return (
    <div className="pagination">
      <button
        className={`pagination__button ${
          offset === 0 ? "pagination__button--disabled" : "" // offsetが0のとき，ボタンを黒く表示したいので，クラスを分けた．
        }`}
        onClick={handlePreviousPage}
        disabled={offset === 0}
      >
        ←前へ
      </button>
      <button className="pagination__button" onClick={handleNextPage}>
        次へ→
      </button>
    </div>
  );
};

export default Pagination;
