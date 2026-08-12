import React from 'react';
import { Dada } from '../types';

interface DadasTabProps {
  dadas: Dada[];
  onSelectDada: (dada: Dada) => void;
}

export const DadasTab: React.FC<DadasTabProps> = ({ dadas, onSelectDada }) => {
  return (
    <div className="pb-24 pt-4 px-4 md:px-8 max-w-5xl mx-auto zellige-pattern">
      {/* Title & Tagline */}
      <div className="mb-6">
        <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl md:text-3xl text-[#a33d23]">
          Nos Dadas Cuisinières
        </h2>
        <p className="font-['Be_Vietnam_Pro'] text-sm md:text-base text-[#57423d] mt-1">
          Savourez de vrais repas sains faits maison préparés avec amour au quotidien.
        </p>
      </div>

      {/* List of Dadas Cards */}
      <div className="space-y-4">
        {dadas.length > 0 ? (
          dadas.map((dada) => (
            <div
              key={dada.id}
              onClick={() => onSelectDada(dada)}
              className="group relative bg-white rounded-2xl p-4 md:p-5 shadow-xs border border-[#dec0b9]/40 flex items-center gap-4 transition-all hover:shadow-md hover:border-[#a33d23]/40 cursor-pointer active:scale-[0.99]"
            >
              {/* Avatar */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#ffdad2] shadow-xs group-hover:scale-105 transition-transform duration-300">
                <img
                  src={dada.avatar}
                  alt={dada.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#001f29] group-hover:text-[#a33d23] transition-colors truncate">
                    {dada.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-[#ffdcc4] text-[#2f1400] px-2.5 py-0.5 rounded-full flex-shrink-0">
                    <span className="material-symbols-outlined text-[16px] text-[#8e4e14]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs">
                      {dada.rating}
                    </span>
                  </div>
                </div>

                <p className="font-['Be_Vietnam_Pro'] text-xs text-[#8e4e14] font-semibold mb-2 truncate">
                  {dada.specialty}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[#57423d] text-xs">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#a33d23]">
                      history_edu
                    </span>
                    <span>{dada.experienceYears}+ ans d'expérience</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#006a60]">
                      location_on
                    </span>
                    <span>{dada.location}</span>
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
              restaurant
            </span>
            <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#001f29]">
              Aucune Dada disponible
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
