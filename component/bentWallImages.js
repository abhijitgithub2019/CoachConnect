import Image from "next/image";

const wallImages = [
  "/images/m1.jpg",
  "/images/m2.jpg",
  "/images/m3.jpg",
  "/images/m4.jpg",
  // Add paths to your images
];

const BentWallImages = () => (
  <div
    className="
      fixed md:absolute top-24 left-0
      hidden md:flex flex-col gap-8 pl-4
      z-20
      max-h-[90vh] overflow-y-auto
    "
  >
    {wallImages.map((src, idx) => (
      <div
        key={src}
        className={`
          relative 
          w-44 h-38 md:w-36 md:h-48 
          lg:w-54 lg:h-56 
          shadow-lg bg-white rounded-lg
          ${idx % 2 === 0 ? "-rotate-7" : "rotate-[7deg]"}
        `}
      >
        {/* Pin */}
        <div
          className="
          absolute 
          left-1/2 -translate-x-1/2 
          -top-3 w-5 h-5 md:w-6 md:h-6 
          rounded-full bg-emerald-700 border-2 border-gray-300 z-30
        "
        />
        {/* Image */}
        <Image
          src={src}
          alt={`Pinned ${idx + 1}`}
          className="w-full h-full object-cover rounded-lg"
          height={200}
          width={200}
        />
      </div>
    ))}
  </div>
);

export default BentWallImages;
