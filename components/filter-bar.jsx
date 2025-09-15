import React from "react";

const types = [
  {
    name: "Classic Cravers",
    image: "https://via.placeholder.com/60?text=Classic",
  },
  { name: "Choc Overload", image: "https://via.placeholder.com/60?text=Choc" },
  {
    name: "Stuffed & Savage",
    image: "https://via.placeholder.com/60?text=Savage",
  },
  {
    name: "Fruity Rebels",
    image: "https://via.placeholder.com/60?text=Fruity",
  },
  {
    name: "Seasonal Surprises",
    image: "https://via.placeholder.com/60?text=Seasonal",
  },
];

export default function FilterBar({ selectedType, setSelectedType }) {
  return (
    <div className="flex flex-col gap-4 w-40 pr-2  border-r-2 border-yellow-200 ">
      <h2 className="text-lg font-semibold text-gray-800">
        Filter by Type
      </h2>
      {types.map((type) => {
        const isSelected = selectedType === type.name;
        return (
          <button
            key={type.name}
            onClick={() => setSelectedType(isSelected ? null : type.name)}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition
              ${
                isSelected
                  ? "bg-amber-100 ring-2 ring-amber-400"
                  : "hover:bg-gray-100"
              }
              focus:outline-none`}
          >
           
            <span
              className={`text-sm font-medium ${
                isSelected ? "text-amber-700" : "text-gray-700"
              }`}
            >
              {type.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
