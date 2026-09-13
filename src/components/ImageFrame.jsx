export default function ImageFrame({
  src,
  alt,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
}) {
  return (
    <figure className={`image-frame ${className}`.trim()}>
      <img src={src} alt={alt} loading={loading} fetchPriority={fetchPriority} />
    </figure>
  );
}
