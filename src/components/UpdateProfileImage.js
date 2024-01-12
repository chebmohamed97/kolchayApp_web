import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import "../styles/profileStyles.scss";
import { doc, updateDoc } from "firebase/firestore";

export default function UpdateProfileImage() {
  const [err, setErr] = useState(false);
  const { currentUser, userInfo } = useAuth();
  const date = new Date().getTime();
  const storageRef = ref(storage, `${currentUser.displayName + date}`);
  const [file, setFile] = useState(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const updateImageInFirestore = async (downloadURL) => {
    const photoRef = doc(db, "users", currentUser.uid);

    // Set the "capital" field of the city 'DC'
    await updateDoc(photoRef, {
      photoURL: downloadURL,
    });
  };
  const uploadImage = async () => {
    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          console.log(downloadURL);
          await updateProfile(currentUser, {
            photoURL: downloadURL,
          });
          updateImageInFirestore(downloadURL);
          console.log("Updated user image");
          setShowSuccessMsg(true);
        } catch (err) {
          console.log(err);
          setErr(true);
        }
      });
    });
  };
  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file === null) {
      console.log("file none");
    } else {
      uploadImage();
    }
  }, [file]);

  return (
    <div>
      <div className="profile-image-container">
        <img
          src={userInfo.photoURL}
          alt="profileImg"
          className="profile-image"
        />
      </div>
      <div className="changePhotoText">
        <p className="changePhotoText"> Changer la photo de votre profil</p>
        <input type="file" onChange={handleImageChange} />
      </div>
      {showSuccessMsg ? (
        <p className="changePhotoText">La photo a ete change avec succes ! </p>
      ) : (
        <></>
      )}
      {err && <span>Une erreur s'est produite</span>}
    </div>
  );
}
