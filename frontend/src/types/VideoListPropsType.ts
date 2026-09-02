import type Video from "./VideoType"

export type VideoListProps = {
    videos: Video[];
    onVideoClick: (id:string)=>void
}