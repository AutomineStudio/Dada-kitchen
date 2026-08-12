import React, { useState } from 'react';
import { Order } from '../types';

interface RatingModalProps {
  order: Order;
  onClose: () => void;
  onSubmitRating: (orderId: string, rating: number, comment: string) => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  order,
  onClose,
  onSubmitRating
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRating(order.id, rating, comment);
    onClose();
  };

  const activeDisplayRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Scrim Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#123441]/60 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Modal Container */}
      <div className="relative z-10 bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header Image */}
        <div className="w-full h-36 md:h-40 relative">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKxid-WpZaRb8PJPfxzKcJ8nYblh8kSccva1gGJRpRh0dKqHdzBjgUJO02NlOQeYs9oANRx3QUAh7DzVcRJ2IbK9-HQzA-kS5uzqdmYciNhHpAvxXj-MeNqJ0Ccx_2QFHKHG53X274lkFhaNSZn2qCvAfsbpHoYtDkLbfrKw32X_igvUk5gHW8I9d1NGjlKaLyXlMGS52qYiF1MKEH32Z-JykExNUbsZT3K3isbJIkyzcyitNhRM0p"
            alt="Repas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#57423d] bg-white/80 rounded-full p-1.5 hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 flex flex-col items-center text-center -mt-6 relative z-10">
          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl text-[#001f29] mb-1">
            Noter votre repas
          </h3>
          <p className="font-['Be_Vietnam_Pro'] text-sm text-[#57423d] mb-6">
            Comment avez-vous trouvé votre commande de chez {order.dadaName}?
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            {/* Rating Stars */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((starValue) => {
                const isFilled = starValue <= activeDisplayRating;
                return (
                  <button
                    key={starValue}
                    type="button"
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(starValue)}
                    className="p-1 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                  >
                    <span
                      className={`material-symbols-outlined text-4xl transition-colors ${
                        isFilled ? 'text-[#e76f51]' : 'text-[#dec0b9]'
                      }`}
                      style={{ fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Comment Text Area */}
            <div className="w-full text-left mb-6">
              <label className="font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#57423d] block mb-2" htmlFor="feedback">
                Votre avis (optionnel)
              </label>
              <textarea
                id="feedback"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre expérience..."
                className="w-full bg-[#f3faff] border-0 border-b-2 border-[#dec0b9] focus:border-[#33a395] focus:ring-0 rounded-t-xl p-3 font-['Be_Vietnam_Pro'] text-sm text-[#001f29] resize-none outline-none transition-colors"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#e76f51] text-white font-['Plus_Jakarta_Sans'] font-bold text-base py-3 px-8 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
