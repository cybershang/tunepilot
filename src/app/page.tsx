import MediaControls from "./media-control";
import VolumeSlider from "./volume-slider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <MediaControls />
      <VolumeSlider />
    </main>
  );
}
