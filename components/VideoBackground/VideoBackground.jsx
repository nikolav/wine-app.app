export default function VideoBackground({ video }) {
  return (
    <video
      className="bg-black block m-0 p-0 relative h-full object-cover object-right"
      autoPlay
      muted
      loop
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}
