import type Video from "../types/VideoType";

export default function VideoCard({
  id,
  coverURL,
  title,
  description,
  year,
}: Video) {
  return (
    <div
      className="videoCard"
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
