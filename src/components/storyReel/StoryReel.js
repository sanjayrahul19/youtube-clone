import React, { useState, useEffect } from "react";
import "./StoryReel.css";
import { useSelector } from "react-redux";
import { Add } from "@material-ui/icons";
import { Button, LinearProgress } from "@material-ui/core";
import { db, storage, timeStamp } from "../../firebase/Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Story from "../story/Story";
const StoryReel = () => {
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState([]);

  const user = useSelector((state) => {
    return state.userData.user;
  });

  const handle = () => {
    const storageRef = ref(storage, `status/${video.name}`);
    const uploadTask = uploadBytesResumable(storageRef, video);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          Math.round(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            addDoc(collection(db, "status"), {
              timeStamp: timeStamp,
              profilePic: user.photoURL,
              username: user.displayName,
              video: url,
            });
            setProgress(0);
            setVideo("");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

  useEffect(() => {
    const q = query(collection(db, "status"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapShot) => {
      setStatus(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, []);
  const file = () => {
    document.getElementById("files").click();
  };

  return (
    <div className="storyReel">
      <div className="storyReel__card">
        {progress > 0 && (
          <LinearProgress variant="determinate" value={progress} />
        )}
        <img src={user.photoURL} alt="" />
        <Button className="button" type="submit" onClick={file}>
          <Add />
        </Button>
        <Button onClick={handle} className="but">
          create Short
        </Button>
        <input
          type="file"
          id="files"
          onChange={(e) => {
            setVideo(e.target.files[0]);
          }}
          style={{ display: "none" }}
        />
      </div>
      {status.map((status) => (
        <Story
          key={status.id}
          title={status.data.username}
          profile={status.data.profilePic}
          video={status.data.video}
        />
      ))}
    </div>
  );
};

export default StoryReel;
