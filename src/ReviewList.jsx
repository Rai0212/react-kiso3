/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "react-router-dom";

import "./ReviewList.css";

const ReviewList = ({ reviews }) => {
  return (
    <ul className="review-list__items">
      {reviews.map((review) => (
        <li key={review.id} className="review-list__item">
          <Link to={`/detail/${review.id}`}>
            <h2 className="review-list__item-title">{review.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
