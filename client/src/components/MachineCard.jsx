import React from "react";

export default function MachineCard({ image, name, description, category, imageFit = "cover" }) {
  const fitClass = imageFit === "contain" ? "object-contain bg-slate-100" : "object-cover";

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden">
      <img src={image} alt={name} className={`w-full h-64 ${fitClass}`} />
      <div className="p-4">
        <h3 className="text-xl text-black font-bold mb-2">{name}</h3>
        {description && <p className="text-gray-700 mb-2">{description}</p>}
        {category && <span className="text-sm text-gray-500">{category}</span>}
      </div>
    </div>
  );
}
