import type Video from "./VideoType";

type VideoResponse = {
  videos: Video[];
  pagination: {
    page: number;
    limit: number;
    totalVideos: number;
    totalPages: number;
  };
};


export type {VideoResponse as default}