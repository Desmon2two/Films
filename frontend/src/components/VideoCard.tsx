import type { VideoCardProps } from "../types/VIdeoCardPropsType";

export default function VideoCard({
  id,
  coverURL,
  title,
  description,
  year,
  onAction
}: VideoCardProps, ) {
  return (
    <div
      className="videoCard"
      onClick={onAction}
    >
      {/* <img
        src={coverURL}
        className="videoCard__cover"
      /> */}
      <h2 className="videoCard__title">{title}</h2>
      <p className="videoCard__description">{description}</p>
      <p className="videoCard__year">{year}</p>
    </div>
  );
}
