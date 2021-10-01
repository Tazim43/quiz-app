import React, { useState } from "react";
import useVideosList from "../hooks/useVideosList";
import classes from "../styles/Videos.module.css";
import Video from "./Video";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Videos() {
   const [page, setPage] = useState(1);

   const { loading, error, videos, hasMore } = useVideosList(page);
   return (
      <div>
         {videos.length > 0 && (
            <InfiniteScroll
               className={classes.videos}
               dataLength={videos.length}
               hasMore={hasMore}
               next={() => setPage(page + 8)}
               loader='Loading...'
            >
               {videos.map((video) => {
                  return (
                     <Video
                        key={video.youtubeID}
                        title={video.title}
                        id={video.youtubeID}
                        noq={video.noq}
                     />
                  );
               })}
            </InfiniteScroll>
         )}

         {!loading && !error && videos.length === 0 && (
            <div>No Data Found!</div>
         )}
         {error && <div>There was an error</div>}
         {loading && <div>Loading...</div>}
      </div>
   );
}
