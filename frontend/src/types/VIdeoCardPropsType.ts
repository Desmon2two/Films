import type Video from "./VideoType";
export type VideoCardProps = Video & {
    onAction: ()=>void
}