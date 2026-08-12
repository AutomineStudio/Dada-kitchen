import React from 'react';
import { Address } from '../types';

interface AddressBookScreenProps {
  addresses: Address[];
  onBack: () => void;
  onOpenAddNewAddress: () => void;
  onDeleteAddress: (id: string) => void;
  onSetDefaultAddress: (id: string) => void;
}

export const AddressBookScreen: React.FC<AddressBookScreenProps> = ({
  addresses,
  onBack,
  onOpenAddNewAddress,
  onDeleteAddress,
  onSetDefaultAddress
}) => {
  return (
    <div className="min-h-screen bg-[#f3faff] text-[#001f29] pb-32">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#f3faff]/90 backdrop-blur-md shadow-xs h-16 flex items-center justify-between px-4 md:px-8 w-full border-b border-[#dec0b9]/30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#a33d23] hover:bg-[#e6f6ff] transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-[#a33d23]">
            Dada Kitchen
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <div className="mb-6 flex items-center gap-4">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl text-[#001f29]">
            Carnet d'adresses
          </h2>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white rounded-2xl p-5 border border-[#dec0b9]/30 shadow-xs hover:shadow-md transition-all relative overflow-hidden group"
            >
              <div
                className={`absolute top-0 left-0 w-1.5 h-full ${
                  addr.type === 'home'
                    ? 'bg-[#e76f51]'
                    : addr.type === 'work'
                    ? 'bg-[#ffab69]'
                    : 'bg-[#33a395]'
                }`}
              ></div>

              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-[#a33d23]">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {addr.type === 'home' ? 'home' : addr.type === 'work' ? 'work' : 'family_home'}
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#001f29]">
                    {addr.name}
                  </h3>
                </div>

                <div className="flex gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onDeleteAddress(addr.id)}
                    className="text-[#57423d] hover:text-[#ba1a1a] transition-colors p-1 rounded-full hover:bg-[#ffdad6]/50"
                    title="Supprimer"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>

              <p className="font-['Be_Vietnam_Pro'] text-xs text-[#57423d] leading-relaxed mb-3">
                {addr.fullAddress}
              </p>

              <div className="mt-3 pt-3 border-t border-[#dec0b9]/20 flex flex-wrap items-center justify-between gap-2">
                {addr.isDefault ? (
                  <span className="inline-block px-3 py-1 bg-[#e6f6ff] text-[#57423d] font-['Be_Vietnam_Pro'] text-[11px] font-semibold rounded-full">
                    Par défaut
                  </span>
                ) : (
                  <button
                    onClick={() => onSetDefaultAddress(addr.id)}
                    className="text-[11px] font-['Be_Vietnam_Pro'] font-semibold text-[#a33d23] hover:underline"
                  >
                    Définir par défaut
                  </button>
                )}

                {addr.hasSpecialInstructions && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#ccedfe] text-[#001f29] font-['Be_Vietnam_Pro'] text-[11px] rounded-full">
                    <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                    Instructions spéciales
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Address FAB */}
        <div className="mt-8 flex justify-center md:justify-start">
          <button
            onClick={onOpenAddNewAddress}
            className="bg-[#e76f51] text-white font-['Plus_Jakarta_Sans'] font-bold text-sm px-6 py-4 rounded-xl flex items-center gap-2 hover:bg-[#a33d23] transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            <span>Ajouter une nouvelle adresse</span>
          </button>
        </div>
      </main>
    </div>
  );
};
