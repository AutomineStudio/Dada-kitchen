import React from 'react';
import { User } from '../types';

interface ProfileTabProps {
  user: User;
  onOpenAddressBook: () => void;
  onLogout: () => void;
  onEditProfile?: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  onOpenAddressBook,
  onLogout,
  onEditProfile
}) => {
  return (
    <div className="pb-24 pt-4 px-4 md:px-8 max-w-4xl mx-auto space-y-6 zellige-pattern">
      {/* Hero Profile Card */}
      <section className="relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 bg-white shadow-xs border border-[#dec0b9]/30">
        <div className="relative group">
          <div className="w-28 h-32 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#e76f51] shadow-md transition-transform group-hover:scale-105 duration-300">
            <img
              src={
                user.avatar ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuD_z4E55MUwGDvGIpRhY74Apvft1V0uosGxOG7Yzp6QifFJ5vWLOq2sjtpFK_3G6k2IPBbgCh4-W41oR2Ns9hgyHWadEETVO8Ybu4oi51UFwNy5K_6bcPwE9nF355_xJu3lhryuDsDHmBWqTOzgIcXkLuo_k6hZR1kD9NoqB-s9gfIx0seCiqTij44pX52faPgUI4dAXWXsuKUCghm9KBUSDJ6sUJSwg1YlRez9CGb04wLFnPT-aISjty6bfoldmYZ4GOshOnIXnCg'
              }
              alt={user.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onEditProfile || (() => alert("Fonction de modification du profil"))}
            className="absolute bottom-0 right-0 bg-[#a33d23] text-white p-2 rounded-full shadow-md transition-transform hover:scale-110 active:scale-95"
            title="Modifier le profil"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>

        <div className="text-center md:text-left">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl text-[#001f29]">
            {user.fullName || 'Sidi Ahmed'}
          </h2>
          <p className="font-['Be_Vietnam_Pro'] text-sm text-[#57423d] mt-1">
            {user.email} • {user.phone}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e6f6ff] text-[#006a60] font-['Be_Vietnam_Pro'] text-xs font-semibold rounded-full mt-2">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>{user.city}</span>
          </div>
        </div>
      </section>

      {/* Account Settings Section */}
      <section className="space-y-3">
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#001f29]">
          Paramètres du compte
        </h3>

        <div className="bg-white rounded-2xl overflow-hidden border border-[#dec0b9]/30 divide-y divide-[#dec0b9]/20 shadow-xs">
          {/* Personal Info */}
          <button
            onClick={() => alert(`Informations personnelles:\nNom: ${user.fullName}\nEmail: ${user.email}\nTéléphone: ${user.phone}`)}
            className="w-full flex items-center justify-between p-4 hover:bg-[#e6f6ff] transition-colors group text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f3faff] flex items-center justify-center text-[#a33d23]">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div>
                <p className="font-['Be_Vietnam_Pro'] font-semibold text-sm text-[#001f29]">
                  Informations personnelles
                </p>
                <p className="font-['Be_Vietnam_Pro'] text-xs text-[#57423d]">
                  Gérer nom, email et numéro de téléphone
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8a716c] group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </button>

          {/* Address Book */}
          <button
            onClick={onOpenAddressBook}
            className="w-full flex items-center justify-between p-4 hover:bg-[#e6f6ff] transition-colors group text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f3faff] flex items-center justify-center text-[#a33d23]">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="font-['Be_Vietnam_Pro'] font-semibold text-sm text-[#001f29]">
                  Carnet d'adresses
                </p>
                <p className="font-['Be_Vietnam_Pro'] text-xs text-[#57423d]">
                  Gérer vos adresses de livraison (Maison, Bureau...)
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8a716c] group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </button>
        </div>
      </section>

      {/* Log Out Action */}
      <section className="pt-4 flex flex-col items-center">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-8 py-3 rounded-full text-[#ba1a1a] border border-[#ba1a1a]/20 hover:bg-[#ffdad6]/20 active:scale-95 transition-all font-['Be_Vietnam_Pro'] font-semibold text-sm"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Se déconnecter</span>
        </button>
        <p className="mt-6 font-['Be_Vietnam_Pro'] text-xs text-[#57423d]/60">
          Version 2.4.0 • Fait avec ❤️ au Maroc
        </p>
      </section>
    </div>
  );
};
