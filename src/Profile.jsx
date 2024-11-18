/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

// プロフィールを編集するためのコンポーネント．
const Profile = ({ userName, setUserName }) => {
  const [newUserName, setNewUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setNewUserName(userName);
  }, [userName]);

  // 更新．
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    setIsLoading(true);
    try {
      const response = await axios.put(
        "https://railway.bookreview.techtrain.dev/users",
        { name: newUserName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUserName(newUserName); // AppContentのuserNameを更新．
        localStorage.setItem("userName", newUserName);
        alert("ユーザー情報が更新されました");
        console.log("change the user name sucess!");
        // location.reload();
      }
    } catch (error) {
      console.error("ユーザー情報更新エラー", error);
      setErrorMessage("ユーザー情報の更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>ユーザー情報編集</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>現在のユーザー名：{userName}</label>
          <br />
          <label>新しいユーザー名</label>
          <input
            type="text"
            className="new-user-name-input"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="name-update-button"
          disabled={isLoading}
        >
          {isLoading ? "更新中..." : "更新する"}
        </button>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Profile;
