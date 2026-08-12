import React, { useState } from 'react';
import { Address } from '../types';

interface AddressSelectionModalProps {
  addresses: Address[];
  selectedAddressId: string;
  onSelectAddress: (address: Address) => void;
  onOpenAddNewAddress: () => void;
  onClose: () => void;
  onConfirm: () => void;
}

export const AddressSelectionModal: React.FC<AddressSelectionModalProps> = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onOpenAddNewAddress,
  onClose,
  onConfirm
}) => {
  const [currentId, setCurrentId] = useState<string>(selectedAddressId || (addresses[0]?.id ?? ''));

  const handleRadioChange = (address: Address) => {
    setCurrentId(address.id);
    onSelectAddress(address);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      {/* Dimmed Background Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 transition-opacity"
      ></div>

      {/* Bottom Sheet Modal */}
      <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-t-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-[#e76f51]/40 rounded-full"></div>
        </div>

        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#a33d23]">
            Choisir une adresse
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="text-gray-500 hover:text-[#a33d23] transition-colors p-2"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </header>

        {/* Address List */}
        <main className="flex-1 overflow-y-auto p-6 space-y-4">
          {addresses.map((addr) => {
            const isSelected = currentId === addr.id;
            return (
              <label
                key={addr.id}
                onClick={() => handleRadioChange(addr)}
                className={`flex items-start gap-4 p-4 border rounded-xl bg-white shadow-xs cursor-pointer relative transition-all ${
                  isSelected ? 'border-[#a33d23] ring-1 ring-[#a33d23]' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex-shrink-0 pt-1">
                  <input
                    type="radio"
                    name="address"
                    checked={isSelected}
                    onChange={() => handleRadioChange(addr)}
                    className="w-5 h-5 text-[#a33d23] focus:ring-[#a33d23] border-[#a33d23]"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 text-[#003366] font-bold text-sm tracking-wide">
                    <span className="material-symbols-outlined text-[#a33d23] text-base">
                      {addr.type === 'home' ? 'home' : addr.type === 'work' ? 'work' : 'location_on'}
                    </span>
                    <span>{addr.name.toUpperCase()}</span>
                  </div>
                  <p className="text-[#666666] font-['Be_Vietnam_Pro'] text-xs leading-relaxed">
                    {addr.fullAddress}
                  </p>
                </div>
              </label>
            );
          })}

          {/* Add New Address Button */}
          <button
            type="button"
            onClick={onOpenAddNewAddress}
            className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-[#e76f51]/50 rounded-xl text-[#e76f51] font-bold text-xs tracking-wide hover:bg-[#e76f51]/5 transition-colors mt-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>AJOUTER UNE NOUVELLE ADRESSE</span>
          </button>
        </main>

        {/* Footer Actions */}
        <footer className="p-6 pt-2 pb-8 bg-white/90 border-t border-gray-100">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full bg-[#e76f51] hover:bg-[#a33d23] text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-xs tracking-widest uppercase"
          >
            <span>CONFIRMER LA LIVRAISON</span>
            <span className="material-symbols-outlined text-lg">check_circle</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
