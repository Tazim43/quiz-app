import { useEffect, useState } from "react";

import {
   getDatabase,
   ref,
   query,
   get,
   orderByKey,
   startAt,
   limitToFirst,
} from "firebase/database";

export default function useVideosList(page) {
   // hooks
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [videos, setVideos] = useState([]);
   const [hasMore, setHasMore] = useState(true);

   useEffect(() => {
      const fetchVideos = async () => {
         const db = getDatabase();
         const videosRef = ref(db, "videos");
         const videoQuery = query(
            videosRef,
            orderByKey(),
            startAt("" + page),
            limitToFirst(8)
         );

         try {
            setError("");
            setLoading(true);
            const snapShot = await get(videoQuery);
            setLoading(false);
            if (snapShot.exists()) {
               setVideos((oldData) => {
                  return [...oldData, ...Object.values(snapShot.val())];
               });
            } else {
               setHasMore(false);
            }
         } catch (error) {
            setLoading(false);
            setError("There was an error");
         }
      };
      fetchVideos();
   }, [page]);

   return {
      loading,
      error,
      videos,
      hasMore,
   };
}
