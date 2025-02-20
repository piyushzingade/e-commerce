export default function Appbar() {
  return (
    <div className="w-full flex items-center justify-between   bg-white shadow-md">
      {/* Left Logo */}
      <img src="Logo.png" alt="Dream Build Logo" className="h-16 w-42" />

      {/* Center Text */}
      <h1 className="text-4xl font-bold text-[#5222D0] tracking-wide pr-5">
        Let&apos;s Build Your Dream
      </h1>

      {/* Top Right Image */}
      <img src="topright.png" alt="Top Decoration" className="h-16 w-24" />
    </div>
  );
}
