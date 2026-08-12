import React, { useState } from 'react';
import { MenuItem, Dada } from '../types';

interface ItemCustomizeModalProps {
  item: MenuItem;
  dada: Dada;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    dadaName: string,
    quantity: number,
    deliverySlot: string,
    specialInstructions: string
  ) => void;
}

const DELIVERY_SLOTS = ['12h - 13h', '13h - 14h', '14h - 15h'];

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  dada,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSlot, setSelectedSlot] = useState<string>('12h - 13h');
  const [instructions, setInstructions] = useState<string>('');

  const totalPrice = item.price * quantity;

  const handleIncrement = () => {
    if (quantity < 20) setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAdd = () => {
    onAddToCart(item, dada.name, quantity, selectedSlot, instructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      {/* Scrim Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#001f29]/60 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Bottom Sheet Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto bg-white rounded-t-[32px] shadow-2xl p-6 overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Handle Bar */}
        <div className="w-full flex justify-center pb-4">
          <div className="w-12 h-1.5 bg-[#dec0b9] rounded-full opacity-50"></div>
        </div>

        {/* Product Image & Header */}
        <div className="flex gap-4 mb-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-xs flex-shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#001f29] mb-1">
              {item.name}
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#a33d23]">
              {item.price} DH
            </p>
            <p className="font-['Be_Vietnam_Pro'] text-xs text-[#57423d] mt-1">
              Préparé par {dada.name}
            </p>
          </div>
        </div>

        {/* Availability Badge */}
        {item.remainingCount && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#e6f6ff] rounded-full mb-6">
            <span className="material-symbols-outlined text-[18px] text-[#006a60]" style={{ fontVariationSettings: "'FILL' 1" }}>
              inventory_2
            </span>
            <span className="font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#57423d]">
              {item.remainingCount} repas restants
            </span>
          </div>
        )}

        {/* Customization Options */}
        <div className="space-y-6">
          {/* Delivery Slot Selection */}
          <div className="space-y-2">
            <h4 className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#001f29] uppercase tracking-wider">
              CRÉNEAU DE LIVRAISON
            </h4>
            <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              {DELIVERY_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full font-['Be_Vietnam_Pro'] text-xs font-semibold border transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-[#ffab69] text-[#783d01] border-[#ffab69] shadow-xs'
                        : 'bg-[#f3faff] text-[#57423d] border-[#dec0b9]'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between p-4 bg-[#f3faff] border border-[#dec0b9]/60 rounded-2xl">
            <span className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#001f29] uppercase tracking-wider">
              QUANTITÉ
            </span>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dec0b9] text-[#57423d] active:scale-90 transition-transform disabled:opacity-30 disabled:pointer-events-none bg-white"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl w-6 text-center text-[#001f29]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ffab69] text-[#783d01] active:scale-90 transition-transform bg-white"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="relative">
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Instructions spéciales (ex: sans coriandre, peu épicé...)"
              className="w-full p-4 bg-[#e6f6ff] border-none rounded-2xl font-['Be_Vietnam_Pro'] text-sm text-[#001f29] focus:ring-2 focus:ring-[#a33d23] h-24 resize-none outline-none"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 mb-2">
          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-4 bg-[#e76f51] text-white rounded-2xl font-['Plus_Jakarta_Sans'] font-bold text-lg shadow-lg shadow-[#e76f51]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span>Ajouter au panier</span>
            <span className="opacity-60">•</span>
            <span>{totalPrice} DH</span>
          </button>
        </div>
      </div>
    </div>
  );
};
