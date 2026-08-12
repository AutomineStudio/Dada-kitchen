import React, { useState } from 'react';
import { Dada } from '../types';

interface TraiteursTabProps {
  traiteurs: Dada[];
  onSelectTraiteur: (traiteur: Dada) => void;
}

export const TraiteursTab: React.FC<TraiteursTabProps> = ({ traiteurs, onSelectTraiteur }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTraiteurs = traiteurs.filter((traiteur) => {
    return (
      traiteur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      traiteur.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="pb-24 pt-4 px-4 md:px-8 max-w-5xl mx-auto zellige-pattern">
      {/* Title & Tagline */}
      <div className="mb-6">
        <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl md:text-3xl text-[#a33d23]">
          Traiteurs & Réceptions
        </h2>
        <p className="font-['Be_Vietnam_Pro'] text-sm md:text-base text-[#57423d] mt-1">
          Grands plats festifs, Bastillas familiales, Méchoui et buffets d'exception pour vos cérémonies et réunions à Casablanca et régions.
        </p>
      </div>

      {/* Info Badge */}
      <div className="bg-[#e6f6ff] border border-[#33a395]/30 rounded-2xl p-4 mb-6 flex items-start gap-3 shadow-xs">
        <span className="material-symbols-outlined text-[#006a60] text-xl mt-0.5">
          celebration
        </span>
        <div className="text-xs font-['Be_Vietnam_Pro'] text-[#001f29] leading-relaxed">
          <span className="font-bold text-[#006a60]">Livraison Traiteur Grand Casablanca:</span> Disponible sur toute la ville de Casablanca, Mohammedia, Bouskoura et régions. Commandez à l'avance pour vos grands événements!
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#a33d23]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Chercher un traiteur (ex: Bastilla Poisson, Mouton rôti...)"
          className="w-full bg-white border border-[#dec0b9]/60 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-['Be_Vietnam_Pro'] shadow-xs focus:outline-none focus:border-[#a33d23] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a716c] hover:text-[#001f29]"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      {/* Traiteurs List */}
      <div className="space-y-4">
        {filteredTraiteurs.length > 0 ? (
          filteredTraiteurs.map((traiteur) => (
            <div
              key={traiteur.id}
              onClick={() => onSelectTraiteur(traiteur)}
              className="group relative bg-white rounded-2xl p-4 md:p-5 shadow-xs border border-[#dec0b9]/40 flex items-center gap-4 transition-all hover:shadow-md hover:border-[#a33d23]/40 cursor-pointer active:scale-[0.99]"
            >
              {/* Avatar */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#ffdad2] shadow-xs group-hover:scale-105 transition-transform duration-300">
                <img
                  src={traiteur.avatar}
                  alt={traiteur.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#001f29] group-hover:text-[#a33d23] transition-colors truncate">
                    {traiteur.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-[#ffdcc4] text-[#2f1400] px-2.5 py-0.5 rounded-full flex-shrink-0">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4e14]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs">
                      {traiteur.rating}
                    </span>
                  </div>
                </div>

                <p className="font-['Be_Vietnam_Pro'] text-xs text-[#8e4e14] font-semibold mb-2 truncate">
                  {traiteur.specialty}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[#57423d] text-xs">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#a33d23]">
                      history_edu
                    </span>
                    <span>{traiteur.experienceYears}+ ans d'expérience</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#006a60]">
                      domain
                    </span>
                    <span>{traiteur.location}</span>
                  </div>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-[#f3faff] text-[#a33d23] group-hover:bg-[#a33d23] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#dec0b9] p-8">
            <span className="material-symbols-outlined text-4xl text-[#8a716c] mb-2">
              search_off
            </span>
            <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#001f29]">
              Aucun traiteur trouvé
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
