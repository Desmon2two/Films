import type { VideoCardProps } from "../types/VIdeoCardPropsType";

export default function VideoCard({
  id,
  coverURL,
  title,
  description,
  year,
  onAction,
}: VideoCardProps) {
  return (
    <article
      className="video-card"
      onClick={onAction}
    >
      <div className="video-card__thumbnail">
        {coverURL ? <img src={coverURL} /> : "Place holder"}
      </div>
      <div className="video-card__content">
        <h2 className="video-card__title">{title}</h2>
        <p className="video-card__description">{description}</p>
        <p className="video-card__year">{year}</p>
      </div>
    </article>
  );
}
