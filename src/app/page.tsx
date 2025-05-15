import { ImageMaskingTool } from "@/components/ImageMaskingTool";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-950 text-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Image Masking Tool</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a product image, specify what to mask with a prompt, and download the masked image or mask.
          </p>
        </header>
        <ImageMaskingTool />
      </div>
    </main>
  );
}
