export default function DecorativeDots() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top Left */}
      <div className="absolute top-12 left-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-maroon rounded-full opacity-20"></div>
          <div className="w-12 h-px bg-maroon opacity-15"></div>
        </div>
      </div>
      
      {/* Top Right */}
      <div className="absolute top-12 right-8">
        <div className="flex items-center gap-2">
          <div className="w-12 h-px bg-maroon opacity-15"></div>
          <div className="w-2 h-2 bg-maroon rounded-full opacity-20"></div>
        </div>
      </div>
      
      {/* Bottom Left */}
      <div className="absolute bottom-12 left-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-maroon rounded-full opacity-20"></div>
          <div className="w-12 h-px bg-maroon opacity-15"></div>
        </div>
      </div>
      
      {/* Bottom Right */}
      <div className="absolute bottom-12 right-8">
        <div className="flex items-center gap-2">
          <div className="w-12 h-px bg-maroon opacity-15"></div>
          <div className="w-2 h-2 bg-maroon rounded-full opacity-20"></div>
        </div>
      </div>
    </div>
  );
}

