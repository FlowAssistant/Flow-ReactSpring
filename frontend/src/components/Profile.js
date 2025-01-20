import React, { useState } from "react";
import styles from "./Profile.module.css";

function Profile({ username, handleLogout }) {
    const [editMode, setEditMode] = useState(false);
    const [newUsername, setNewUsername] = useState(username);

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        if (newUsername.trim() !== "") {
            localStorage.setItem("username", newUsername);
            alert("프로필이 업데이트되었습니다.");
            setEditMode(false);
        } else {
            alert("유효한 사용자 이름을 입력해주세요.");
        }
    };

    return (
        <div className={styles.profileContainer}>
            <h2 className={styles.title}>프로필</h2>
            <div className={styles.profileInfo}>
                <label className={styles.label}>사용자 이름:</label>
                {editMode ? (
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className={styles.input}
                    />
                ) : (
                    <span className={styles.username}>{username}</span>
                )}
            </div>
            <div className={styles.actions}>
                {editMode ? (
                    <button onClick={handleSave} className={styles.saveButton}>
                        저장
                    </button>
                ) : (
                    <button onClick={handleEdit} className={styles.editButton}>
                        수정
                    </button>
                )}
                <button onClick={handleLogout} className={styles.logoutButton}>
                    로그아웃
                </button>
            </div>
        </div>
    );
}

export default Profile;
