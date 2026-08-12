import React from 'react';
import { ActiveTab, User } from '../types';

interface HeaderProps {
  user: User;
  title?: string;
  onOpenProfile?: () => void;
  onOpenAddressModal?: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  title = 'Dada Kitchen',
  onOpenProfile,
  onOpenAddressModal,
  onBack,
  showBack = false
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fffaf0]/90 backdrop-blur-md shadow-xs h-16 flex items-center justify-between px-4 md:px-8 w-full border-b border-[#dec0b9]/30">
      <div className="flex items-center gap-3">
        {showBack && onBack ? (
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#001f29] hover:bg-[#e6f6ff] transition-all active:scale-95"
            aria-label="Retour"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : (
          <div className="w-10 h-10 rounded-2xl bg-[#e65100] flex items-center justify-center text-white shadow-md shadow-[#e65100]/20 rotate-3">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              restaurant
            </span>
          </div>
        )}
        <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl md:text-2xl text-[#e65100] tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {user.isLoggedIn && (
          <>
            {onOpenAddressModal && (
              <button
                onClick={onOpenAddressModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8f3ee] text-[#57423d] text-xs font-semibold hover:bg-[#ebe5e0] transition-colors border border-[#dec0b9]/40"
              >
                <span className="material-symbols-outlined text-sm text-[#e65100]">location_on</span>
                <span className="truncate max-w-[120px]">{user.deliveryAddress || 'Choisir adresse'}</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            )}

            <button
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#ffab69] focus:outline-none focus:ring-2 focus:ring-[#e65100] active:scale-95 transition-transform shadow-xs"
              title="Mon profil"
            >
              <img
                src={
                  user.avatar ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuD_cAWI3Jrfv_EQC-B6Ml0QN1MoeUpv3xJgYUaZJr0sUxaMo-pYzsfUsHI-Uk5ZsigI5jP7DZxX8qiz5SHXbDtbW--Kpbst1GHz6dJQHsvkRWstPH3Nm1LLa933K23sFxWvHWWIPJtZjspOOwT24ksyCER2lth1vSxlccuWvvglB-P-tpL-PoeIUVSeiwRh1XHjzAtPbmz9kjozDXBCVsL5gf4K5A8eTsmeayxZdtDbZ5hyBFpsixI9'
                }
                alt={user.fullName || 'Profil'}
                className="w-full h-full object-cover"
              />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

interface BottomBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  orderCount?: number;
}

export const BottomBar: React.FC<BottomBarProps> = ({ activeTab, onTabChange, orderCount = 0 }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-white border-t border-[#dec0b9]/40 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] rounded-t-2xl">
      <button
        onClick={() => onTabChange('DADAS')}
        className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-200 active:scale-105 ${
          activeTab === 'DADAS'
            ? 'bg-[#e65100] text-white shadow-sm'
            : 'text-[#57423d] hover:bg-[#f8f3ee]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={{ fontVariationSettings: activeTab === 'DADAS' ? "'FILL' 1" : "'FILL' 0" }}
        >
          explore
        </span>
        <span className="font-['Be_Vietnam_Pro'] text-[11px] font-semibold mt-0.5">Dadas</span>
      </button>

      <button
        onClick={() => onTabChange('TRAITEURS')}
        className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-200 active:scale-105 ${
          activeTab === 'TRAITEURS'
            ? 'bg-[#e65100] text-white shadow-sm'
            : 'text-[#57423d] hover:bg-[#f8f3ee]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={{ fontVariationSettings: activeTab === 'TRAITEURS' ? "'FILL' 1" : "'FILL' 0" }}
        >
          restaurant
        </span>
        <span className="font-['Be_Vietnam_Pro'] text-[11px] font-semibold mt-0.5">Traiteurs</span>
      </button>

      <button
        onClick={() => onTabChange('ORDERS')}
        className={`relative flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-200 active:scale-105 ${
          activeTab === 'ORDERS'
            ? 'bg-[#e65100] text-white shadow-sm'
            : 'text-[#57423d] hover:bg-[#f8f3ee]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={{ fontVariationSettings: activeTab === 'ORDERS' ? "'FILL' 1" : "'FILL' 0" }}
        >
          receipt_long
        </span>
        <span className="font-['Be_Vietnam_Pro'] text-[11px] font-semibold mt-0.5">Commandes</span>
        {orderCount > 0 && (
          <span className="absolute -top-1 right-2 w-4 h-4 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {orderCount}
          </span>
        )}
      </button>

      <button
        onClick={() => onTabChange('PROFILE')}
        className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-200 active:scale-105 ${
          activeTab === 'PROFILE'
            ? 'bg-[#e65100] text-white shadow-sm'
            : 'text-[#57423d] hover:bg-[#f8f3ee]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={{ fontVariationSettings: activeTab === 'PROFILE' ? "'FILL' 1" : "'FILL' 0" }}
        >
          person
        </span>
        <span className="font-['Be_Vietnam_Pro'] text-[11px] font-semibold mt-0.5">Profil</span>
      </button>
    </nav>
  );
};
