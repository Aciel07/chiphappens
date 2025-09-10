import React from 'react';

const types = [
  { name: 'Classic Cravers', image: 'https://via.placeholder.com/60?text=Classic' },
  { name: 'Choc Overload', image: 'https://via.placeholder.com/60?text=Choc' },
  { name: 'Stuffed & Savage', image: 'https://via.placeholder.com/60?text=Savage' },
  { name: 'Fruity Rebels', image: 'https://via.placeholder.com/60?text=Fruity' },
  { name: 'Seasonal Shenanigans', image: 'https://via.placeholder.com/60?text=Seasonal' },
  { name: 'Other', image: 'https://via.placeholder.com/60?text=Other' },
];

export default function FilterBar({ selectedType, setSelectedType }) {
  return (
    <div className="bg-stone-50 m-10 flex justify-center gap-6 py-6 overflow-x-auto">
      {types.map((type) => {
        const isSelected = selectedType === type.name;
        return (
          <button
            key={type.name}
            onClick={() => setSelectedType(isSelected ? null : type.name)}
            className={`flex flex-col items-center space-y-1 px-2 py-1 transition
              ${isSelected ? 'ring-2 ring-gray-400' : 'hover:ring-1 hover:ring-gray-300'}
              rounded-lg focus:outline-none`}
          >
            <img
              src={type.image}
              alt={type.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className={`text-xs font-medium ${isSelected ? 'text-amber-600' : 'text-gray-600'}`}>
              {type.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
