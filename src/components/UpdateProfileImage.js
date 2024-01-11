import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { auth, db, storage } from "../firebase";
import "../styles/profileStyles.scss";
import { doc, updateDoc } from "firebase/firestore";

export default function UpdateProfileImage() {
  const { isLoggedIn, currentUser, userInfo } = useAuth();
  const navigate = useNavigate();
  const date = new Date().getTime();
  const storageRef = ref(storage, `${currentUser.displayName + date}`);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

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
        } catch (err) {
          console.log(err);
        }
      });
    });
  };
  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // This is the base64 encoded image
      };
      reader.readAsDataURL(file);
    } else {
      // Handle errors or unsupported file types
    }
  };

  useEffect(() => {
    console.log(file);
    if (file === null) {
      console.log("file none");
    } else {
      uploadImage();
    }
  }, [file]);

  useEffect(() => {
    console.log(currentUser);
  }, []);

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
        <p className="changePhotoText">
          {" "}
          Vous pouvez changer la photo de votre profil en clickant le button si
          dessous
        </p>
        <input type="file" onChange={handleImageChange} />
      </div>
    </div>
  );
}
