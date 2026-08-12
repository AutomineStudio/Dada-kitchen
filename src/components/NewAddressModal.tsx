import React, { useState } from 'react';
import { Address } from '../types';

interface NewAddressModalProps {
  onClose: () => void;
  onSaveAddress: (address: Address) => void;
}

export const NewAddressModal: React.FC<NewAddressModalProps> = ({ onClose, onSaveAddress }) => {
  const [name, setName] = useState('');
  const [city] = useState('Casablanca');
  const [district, setDistrict] = useState('');
  const [fullAddress, setFullAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !fullAddress.trim()) return;

    const newAddress: Address = {
      id: 'addr-' + Date.now(),
      name: name || 'Nouvelle adresse',
      city,
      district: district || 'Casablanca',
      fullAddress: `${fullAddress}, ${district ? district + ', ' : ''}${city}`,
      type: 'home'
    };

    onSaveAddress(newAddress);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-4">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#001f29]/40 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Modal Container */}
      <div className="relative z-10 bg-white w-full max-w-md rounded-t-[24px] md:rounded-[24px] shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#d8f2ff] flex items-center justify-between">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#001f29]">
            Nouvelle adresse
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#57423d] hover:text-[#001f29] transition-colors p-2 rounded-full hover:bg-[#e6f6ff]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {/* Nom de l'adresse */}
          <div>
            <label htmlFor="address-name" className="block font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#57423d] mb-1.5">
              Nom de l'adresse
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#8a716c] text-sm">label</span>
              </div>
              <input
                id="address-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Maison, Bureau"
                className="block w-full pl-10 pr-3 py-3 border-none bg-white border-b-2 border-[#d8f2ff] focus:border-[#33a395] text-sm text-[#001f29] placeholder-[#dec0b9] font-['Be_Vietnam_Pro'] outline-none"
                required
              />
            </div>
          </div>

          {/* Ville */}
          <div>
            <label htmlFor="city" className="block font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#57423d] mb-1.5">
              Ville
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#8a716c] text-sm">location_city</span>
              </div>
              <input
                id="city"
                type="text"
                value={city}
                readOnly
                className="block w-full pl-10 pr-3 py-3 border-none bg-[#f3faff] border-b-2 border-[#d8f2ff] text-sm text-[#001f29] font-['Be_Vietnam_Pro'] outline-none"
              />
            </div>
          </div>

          {/* Quartier */}
          <div>
            <label htmlFor="district" className="block font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#57423d] mb-1.5">
              Quartier
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[#8a716c] text-sm">my_location</span>
              </div>
              <input
                id="district"
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Ex: Gauthier, Maarif"
                className="block w-full pl-10 pr-3 py-3 border-none bg-white border-b-2 border-[#d8f2ff] focus:border-[#33a395] text-sm text-[#001f29] placeholder-[#dec0b9] font-['Be_Vietnam_Pro'] outline-none"
                required
              />
            </div>
          </div>

          {/* Adresse complète */}
          <div>
            <label htmlFor="full-address" className="block font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#57423d] mb-1.5">
              Adresse complète
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                <span className="material-symbols-outlined text-[#8a716c] text-sm">home_pin</span>
              </div>
              <textarea
                id="full-address"
                rows={3}
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Rue, n° de bâtiment, étage..."
                className="block w-full pl-10 pr-3 py-3 border-none bg-white border-b-2 border-[#d8f2ff] focus:border-[#33a395] text-sm text-[#001f29] placeholder-[#dec0b9] font-['Be_Vietnam_Pro'] resize-none outline-none"
                required
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-white font-['Plus_Jakarta_Sans'] font-bold text-sm bg-[#e76f51] hover:bg-[#a33d23] shadow-sm active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                save
              </span>
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
