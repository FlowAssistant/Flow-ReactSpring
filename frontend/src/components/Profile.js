import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import iconEdit from "../assets/images/icon-edit.png"; // 기본 아이콘
import iconProfileDefault from "../assets/images/iconProfileDefault.png"; // 기본 아이콘


function Profile({ username, setProfileImageUrl }) {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        profileImageUrl: "",
    });
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/users/${username}`);
                setUserData(response.data);
                setProfileImageUrl(response.data.profileImageUrl); // NavigationBar 업데이트
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        fetchUserData();
    }, [username, setProfileImageUrl]); // 의존성 배열 추가


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("name", userData.name);
            formData.append("email", userData.email);
            if (newImage) {
                formData.append("profileImage", newImage);
            }

            // 서버에 업데이트 요청
            const response = await axios.put(`/api/users/${username}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("프로필이 성공적으로 업데이트되었습니다!");

            // 프로필 이미지 상태를 업데이트
            const updatedImageUrl = response.data.profileImageUrl; // 서버에서 반환된 URL
            setUserData(response.data);
            setProfileImageUrl(`${updatedImageUrl}?timestamp=${Date.now()}`); // 최신 URL 추가
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };




    return (
        <div className={styles.profileContainer}>
            <h2 className={styles.title}>프로필</h2>
            <div className={styles.formGroup}>
                <div className={styles.formGroup}>
                    <label htmlFor="profile_photo" className={styles.labelProfilePhoto}>
                        <img
                            src={userData.profileImageUrl || iconProfileDefault} // 기본 이미지 처리
                            id="img-profile"
                            className={styles.imgProfile}
                            alt="Profile Picture"
                        />
                        <span className={styles.imgProfileOverlay}>프로필 변경</span>
                        <img
                            src={iconEdit}
                            alt="수정 아이콘"
                            className={styles.icon}
                        />
                        <input
                            type="file"
                            id="profile_photo"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.inputFile}
                        />
                    </label>
                </div>
                <label>이름:</label>
                <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label>이메일:</label>
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className={styles.input}
                />
            </div>

            <button onClick={handleSave} className={styles.saveButton}>
                저장
            </button>
        </div>
    );
}

export default Profile;
