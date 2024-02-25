'use client'
import { BackendSettingsProvider } from "./backend-context";
import MediaControls from "./media-control";
import VolumeSlider from "./volume-slider";
import SettingsModal from "./settings-modal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BackendSettingsProvider>
      <main className="flex min-h-screen flex-col items-center justify-around p-10">
        <MediaControls />
        <VolumeSlider />
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 border rounded border-black text-3xl shadow-md"
        >
          ⚙️Settings
        </button>
        <SettingsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </main>
    </BackendSettingsProvider>
  );
}
