export default function VideoBackground({ id = null }) {
  return (
    <>
      {/* <div className="absolute top-0 left-0 bg-black/80 w-full h-full z-10" /> */}
      <video
        className="bg-black block m-0 p-0 relative h-full object-cover object-right"
        autoPlay
        muted
        loop
      >
        <source src="mov.mp4" type="video/mp4" />
      </video>
    </>
  );
}
