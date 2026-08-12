import React, { useState } from 'react';
import { Dada, MenuItem, CartItem } from '../types';

interface DadaDetailScreenProps {
  dada: Dada;
  menuItems: MenuItem[];
  cart: CartItem[];
  onBack: () => void;
  onSelectItem: (item: MenuItem) => void;
  onViewBasket: () => void;
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const DadaDetailScreen: React.FC<DadaDetailScreenProps> = ({
  dada,
  menuItems,
  cart,
  onBack,
  onSelectItem,
  onViewBasket
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Lundi');

  // Filter items for this Dada/Traiteur
  const dadaItems = menuItems.filter((item) => item.dadaId === dada.id);

  // If Dada, filter by day if day is defined
  const displayedItems =
    dada.type === 'dada'
      ? dadaItems.filter((item) => !item.day || item.day === selectedDay)
      : dadaItems;

  // Calculate cart summary
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f3faff] text-[#001f29] pb-32">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#f3faff]/90 backdrop-blur-md shadow-xs h-16 flex items-center justify-between px-4 md:px-8 w-full border-b border-[#dec0b9]/30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#a33d23] hover:bg-[#e6f6ff] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl md:text-2xl text-[#a33d23]">
            Dada Kitchen
          </h1>
        </div>
      </header>

      <main className="pt-6 max-w-4xl mx-auto px-4 md:px-8">
        {/* Dada Profile Header */}
        <div className="flex flex-col items-start gap-2 mb-6">
          <div className="flex items-center gap-2">
            <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl md:text-4xl text-[#001f29]">
              {dada.name}
            </h2>
            <span className="material-symbols-outlined text-[#006a60]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#ffdcc4] text-[#2f1400] px-3 py-1 rounded-full text-xs font-bold font-['Be_Vietnam_Pro']">
            <span className="material-symbols-outlined text-[18px] text-[#8e4e14]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span>
              {dada.rating} ({dada.reviewCount} avis)
            </span>
          </div>
        </div>

        {/* Day Selector (for Dadas) */}
        {dada.type === 'dada' && (
          <div className="mb-8">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#001f29] mb-4">
              Menu de la Semaine
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {DAYS.map((day) => {
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`flex-shrink-0 px-6 py-2.5 rounded-full font-['Be_Vietnam_Pro'] text-xs font-semibold transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-[#a33d23] text-white shadow-sm'
                        : 'bg-[#e6f6ff] text-[#57423d] hover:bg-[#ccedfe]'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="space-y-4 mb-12">
          {displayedItems.length > 0 ? (
            displayedItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-white border border-[#dec0b9]/40 hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="w-full sm:w-28 h-32 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#001f29]">
                      {item.name}
                    </h4>
                  </div>
                  {item.subtitle && (
                    <p className="text-[#a33d23] font-['Be_Vietnam_Pro'] text-xs font-semibold mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                  <p className="text-[#57423d] font-['Be_Vietnam_Pro'] text-xs mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#a33d23]">
                      {item.price} DH
                    </span>
                    <button
                      onClick={() => onSelectItem(item)}
                      className="bg-[#e76f51] text-white px-5 py-2 rounded-full font-['Be_Vietnam_Pro'] font-semibold text-xs active:scale-95 transition-transform hover:opacity-90 shadow-xs flex items-center gap-1"
                    >
                      <span>Ajouter</span>
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>

                  {item.remainingCount && (
                    <div className="text-[#57423d]/80 font-['Be_Vietnam_Pro'] text-[11px] mt-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-[#006a60]">inventory_2</span>
                      <span>{item.remainingCount} repas restants</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-[#dec0b9] p-6">
              <p className="font-['Be_Vietnam_Pro'] text-sm text-[#57423d]">
                Aucun plat programmé pour {selectedDay}.
              </p>
            </div>
          )}
        </div>

        {/* "Mon Histoire" Section */}
        <section className="relative overflow-hidden rounded-2xl bg-white shadow-xs border border-[#dec0b9]/30 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            {/* Chef Portrait */}
            <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-sm ring-4 ring-[#f3faff] flex-shrink-0">
              <img
                src={dada.avatar}
                alt={dada.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bio Story */}
            <div className="flex-1">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#a33d23] mb-3">
                Mon Histoire
              </h3>
              <p className="font-['Be_Vietnam_Pro'] text-sm text-[#57423d] leading-relaxed">
                {dada.bio}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Bar (Basket FAB) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] w-[92%] max-w-md animate-bounce-once">
          <button
            onClick={onViewBasket}
            className="w-full glass-panel flex items-center justify-between p-4 rounded-2xl shadow-xl border border-[#e76f51] active:scale-[0.98] transition-all duration-300 bg-white/95"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#a33d23] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                {totalCartCount}
              </div>
              <div className="text-left">
                <span className="block font-['Be_Vietnam_Pro'] text-xs text-[#57423d] leading-none">
                  Votre Panier
                </span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#001f29]">
                  {totalCartPrice} DH
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#a33d23] font-['Plus_Jakarta_Sans'] font-bold text-sm">
              <span>Voir le panier</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
