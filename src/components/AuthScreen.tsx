import React, { useState, useEffect, useRef } from 'react';
import { AuthStep, User } from '../types';
import { db, dbDefault } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface AuthScreenProps {
  authStep: AuthStep;
  setAuthStep: (step: AuthStep) => void;
  onLoginSuccess: (user: Partial<User>) => void;
  onBackToPhone?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  authStep,
  setAuthStep,
  onLoginSuccess,
}) => {
  // Login State
  const [phoneNumber, setPhoneNumber] = useState('06 61 23 45 67');
  const [authMethod, setAuthMethod] = useState<'sms' | 'whatsapp'>('sms');

  // OTP State
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
  const [currentOtpCode, setCurrentOtpCode] = useState<string>('8492');
  const [timerLeft, setTimerLeft] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [otpError, setOtpError] = useState<string>('');
  const [otpSuccess, setOtpSuccess] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('Code validé avec succès !');
  const [showNotificationBanner, setShowNotificationBanner] = useState<boolean>(false);
  const [showFirebaseGuide, setShowFirebaseGuide] = useState<boolean>(false);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Default pre-existing accounts database
  const DEFAULT_ACCOUNTS: User[] = [
    {
      fullName: 'Sidi Ahmed',
      email: 'ahmed@exemple.ma',
      phone: '06 61 23 45 67',
      city: 'Casablanca',
      deliveryAddress: 'Appartement 12, Résidence Les Almohades, Gauthier',
      isLoggedIn: true,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_z4E55MUwGDvGIpRhY74Apvft1V0uosGxOG7Yzp6QifFJ5vWLOq2sjtpFK_3G6k2IPBbgCh4-W41oR2Ns9hgyHWadEETVO8Ybu4oi51UFwNy5K_6bcPwE9nF355_xJu3lhryuDsDHmBWqTOzgIcXkLuo_k6hZR1kD9NoqB-s9gfIx0seCiqTij44pX52faPgUI4dAXWXsuKUCghm9KBUSDJ6sUJSwg1YlRez9CGb04wLFnPT-aISjty6bfoldmYZ4GOshOnIXnCg'
    }
  ];

  // Helper: Normalize phone number digits
  const normalizePhone = (p: string) => p.replace(/\D/g, '').replace(/^212/, '').replace(/^0/, '');

  // Helper: Find existing user account
  const findExistingAccount = (phone: string): User | null => {
    const target = normalizePhone(phone);
    if (!target) return null;

    try {
      const rawAccounts = localStorage.getItem('dada_kitchen_accounts');
      const accounts: User[] = rawAccounts ? JSON.parse(rawAccounts) : DEFAULT_ACCOUNTS;
      const found = accounts.find((acc) => normalizePhone(acc.phone) === target);
      if (found) return found;
    } catch (e) {
      console.error(e);
    }

    try {
      const rawUser = localStorage.getItem('dada_kitchen_user');
      if (rawUser) {
        const savedUser: User = JSON.parse(rawUser);
        if (savedUser.phone && normalizePhone(savedUser.phone) === target) {
          return savedUser;
        }
      }
    } catch (e) {}

    return null;
  };

  // Register State
  const [fullName, setFullName] = useState('Sidi Ahmed');
  const [email, setEmail] = useState('ahmed@exemple.ma');
  const [city, setCity] = useState('casablanca');
  const [deliveryAddress, setDeliveryAddress] = useState('Appartement 12, Résidence Les Almohades, Gauthier');
  const [zoneAck, setZoneAck] = useState(true);
  const [termsAck, setTermsAck] = useState(true);

  // Timer Effect for OTP
  useEffect(() => {
    let interval: any = null;
    if (authStep === 'OTP' && isTimerRunning && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [authStep, isTimerRunning, timerLeft]);

  // Handle Phone Submit
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    // Generate random 4-digit code
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setCurrentOtpCode(newCode);
    setOtpValues(['', '', '', '']);
    setOtpError('');
    setOtpSuccess(false);

    setAuthStep('OTP');
    setTimerLeft(60);
    setIsTimerRunning(true);
    setShowNotificationBanner(true);
  };

  // Auto fill OTP
  const handleAutofillOtp = (codeToFill: string = currentOtpCode) => {
    const digits = codeToFill.slice(0, 4).split('');
    setOtpValues(digits);
    setOtpError('');
    setOtpSuccess(true);

    const existingAccount = findExistingAccount(phoneNumber);

    if (existingAccount) {
      setSuccessMsg(`Bon retour ${existingAccount.fullName} ! Connexion en cours...`);
      setTimeout(() => {
        onLoginSuccess({
          ...existingAccount,
          isLoggedIn: true
        });
      }, 700);
    } else {
      setSuccessMsg('Code validé ! Création de votre compte...');
      setTimeout(() => {
        setAuthStep('REGISTER');
      }, 700);
    }
  };

  // Handle OTP Inputs Auto Focus
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setOtpError('');
    const newValues = [...otpValues];
    newValues[index] = value.slice(-1);
    setOtpValues(newValues);

    // Auto advance focus
    if (value && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }

    // Auto validate if complete
    const filledCode = newValues.join('');
    if (filledCode.length === 4) {
      validateOtpCode(filledCode);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const validateOtpCode = (code: string) => {
    if (code === currentOtpCode || code === '1234') {
      setOtpError('');
      setOtpSuccess(true);

      const existingAccount = findExistingAccount(phoneNumber);

      if (existingAccount) {
        setSuccessMsg(`Bon retour ${existingAccount.fullName} ! Connexion directe...`);
        setTimeout(() => {
          onLoginSuccess({
            ...existingAccount,
            isLoggedIn: true
          });
        }, 700);
      } else {
        setSuccessMsg('Code validé ! Redirection vers la création de compte...');
        setTimeout(() => {
          setAuthStep('REGISTER');
        }, 700);
      }
    } else {
      setOtpError(`Code incorrect (${code}). Utilisez ${currentOtpCode} ou 1234`);
      setOtpSuccess(false);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otpValues.join('');
    if (enteredCode.length < 4) {
      setOtpError('Veuillez saisir les 4 chiffres du code.');
      return;
    }
    validateOtpCode(enteredCode);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !zoneAck || !termsAck) return;

    const newUser: User = {
      fullName,
      email,
      phone: phoneNumber,
      city: city.charAt(0).toUpperCase() + city.slice(1),
      deliveryAddress,
      isLoggedIn: true,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_z4E55MUwGDvGIpRhY74Apvft1V0uosGxOG7Yzp6QifFJ5vWLOq2sjtpFK_3G6k2IPBbgCh4-W41oR2Ns9hgyHWadEETVO8Ybu4oi51UFwNy5K_6bcPwE9nF355_xJu3lhryuDsDHmBWqTOzgIcXkLuo_k6hZR1kD9NoqB-s9gfIx0seCiqTij44pX52faPgUI4dAXWXsuKUCghm9KBUSDJ6sUJSwg1YlRez9CGb04wLFnPT-aISjty6bfoldmYZ4GOshOnIXnCg'
    };

    // Save to accounts registry in localStorage
    try {
      const rawAccounts = localStorage.getItem('dada_kitchen_accounts');
      const accounts: User[] = rawAccounts ? JSON.parse(rawAccounts) : DEFAULT_ACCOUNTS;
      const targetPhone = normalizePhone(phoneNumber);
      const existsIdx = accounts.findIndex((a) => normalizePhone(a.phone) === targetPhone);
      if (existsIdx >= 0) {
        accounts[existsIdx] = newUser;
      } else {
        accounts.push(newUser);
      }
      localStorage.setItem('dada_kitchen_accounts', JSON.stringify(accounts));
    } catch (e) {
      console.error(e);
    }

    // Save to Firestore databases
    try {
      const targetPhone = normalizePhone(phoneNumber) || 'user';
      const userPayload = { ...newUser, updatedAt: new Date().toISOString() };
      setDoc(doc(db, 'users', targetPhone), userPayload, { merge: true }).catch(() => {});
      setDoc(doc(dbDefault, 'users', targetPhone), userPayload, { merge: true }).catch(() => {});
    } catch (e) {
      console.error(e);
    }

    onLoginSuccess(newUser);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#2d1b00] flex flex-col items-center justify-center relative px-4 py-8 zellige-pattern">
      {/* Simulated Push Notification Banner */}
      {showNotificationBanner && authStep === 'OTP' && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm bg-[#1e1b18]/95 backdrop-blur-md text-white rounded-2xl p-3.5 shadow-2xl border border-white/20 animate-in slide-in-from-top duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#e65100] flex items-center justify-center text-white flex-shrink-0">
                <span className="material-symbols-outlined text-base">
                  {authMethod === 'sms' ? 'sms' : 'chat'}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#ffab69] uppercase tracking-wider">
                    {authMethod === 'sms' ? 'SMS Reçu' : 'WhatsApp Reçu'}
                  </span>
                  <span className="text-[10px] text-white/50">• À l'instant</span>
                </div>
                <p className="text-xs text-white/90 font-['Be_Vietnam_Pro'] mt-0.5">
                  Dada Kitchen: Votre code de vérification est <strong className="text-[#ffab69] font-extrabold">{currentOtpCode}</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNotificationBanner(false)}
              className="text-white/60 hover:text-white p-1"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <button
            onClick={() => handleAutofillOtp(currentOtpCode)}
            className="mt-2.5 w-full py-1.5 bg-[#e65100] hover:bg-[#ffab69] hover:text-[#2d1b00] text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span>Remplir automatiquement ({currentOtpCode})</span>
          </button>
        </div>
      )}

      {/* Screen 1: LOGIN (Connexion) */}
      {authStep === 'LOGIN' && (
        <main className="relative z-10 w-full max-w-[440px] flex flex-col items-center py-6">
          {/* Header Branding */}
          <header className="flex flex-col items-center mb-8 text-center">
            <div className="mb-5 relative group">
              <div className="absolute -inset-4 bg-[#e65100]/10 rounded-full blur-2xl group-hover:bg-[#e65100]/20 transition-all duration-500"></div>
              <div className="relative w-22 h-22 bg-[#e65100] rounded-2xl flex items-center justify-center shadow-xl shadow-[#e65100]/20 rotate-3 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  restaurant
                </span>
              </div>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl md:text-4xl text-[#e65100] tracking-tight mb-2">
              Dada Kitchen
            </h1>
            <p className="font-['Be_Vietnam_Pro'] text-base md:text-lg text-[#57423d] max-w-[280px]">
              Bienvenue dans la cuisine de nos Dadas
            </p>
          </header>

          {/* Login Card */}
          <section className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#f4d9c6]/40">
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#2d1b00] mb-4">
                Connexion
              </h2>

              <div className="space-y-2">
                <label className="font-['Be_Vietnam_Pro'] font-semibold text-sm text-[#57423d] block ml-1" htmlFor="identifier">
                  Numéro de Téléphone
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#e65100]">
                    smartphone
                  </span>
                  <input
                    id="identifier"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ex: 06 00 00 00 00"
                    className="w-full bg-[#fff4e5] border-b-2 border-transparent focus:border-[#e65100] outline-none transition-all h-14 pl-12 pr-4 rounded-xl font-['Be_Vietnam_Pro'] text-[#2d1b00] placeholder:text-[#8a716c]/60 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full h-14 bg-[#e65100] text-white font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg rounded-xl shadow-lg shadow-[#e65100]/20 hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Recevoir le code de vérification</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>

                <div className="flex justify-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="method"
                      value="sms"
                      checked={authMethod === 'sms'}
                      onChange={() => setAuthMethod('sms')}
                      className="w-4 h-4 text-[#e65100] border-[#dec0b9] focus:ring-[#e65100]"
                    />
                    <span className="font-['Be_Vietnam_Pro'] font-semibold text-xs text-[#57423d] group-hover:text-[#e65100] transition-colors">
                      Recevoir par SMS
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="method"
                      value="whatsapp"
                      checked={authMethod === 'whatsapp'}
                      onChange={() => setAuthMethod('whatsapp')}
                      className="w-4 h-4 text-[#e65100] border-[#dec0b9] focus:ring-[#e65100]"
                    />
                    <span className="font-['Be_Vietnam_Pro'] font-semibold text-xs text-[#57423d] group-hover:text-[#e65100] transition-colors">
                      Recevoir par WhatsApp
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </section>

          {/* Firebase Guide Accordion */}
          <div className="w-full mt-6">
            <button
              onClick={() => setShowFirebaseGuide(!showFirebaseGuide)}
              className="w-full py-2.5 px-4 bg-white/80 rounded-xl border border-[#dec0b9]/40 flex items-center justify-between text-xs font-bold text-[#57423d] hover:bg-white transition-all shadow-xs"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#e65100] text-base">settings</span>
                <span>Instructions de configuration Firebase Auth</span>
              </div>
              <span className="material-symbols-outlined text-base">
                {showFirebaseGuide ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {showFirebaseGuide && (
              <div className="mt-2 bg-white rounded-2xl p-4 border border-[#dec0b9]/50 text-xs text-[#57423d] space-y-3 shadow-sm animate-in fade-in duration-200">
                <p className="font-bold text-[#2d1b00] text-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#e65100] text-base">local_fire_department</span>
                  Configuration de la connexion par téléphone avec Firebase
                </p>
                <ol className="list-decimal pl-4 space-y-2 leading-relaxed">
                  <li>Ouvrez la <strong>Console Firebase</strong> et sélectionnez votre projet.</li>
                  <li>Allez dans <strong>Authentication</strong> &gt; onglet <strong>Sign-in method</strong>.</li>
                  <li>Activez le fournisseur <strong>Téléphone (Phone)</strong>.</li>
                  <li>Ajoutez votre domaine dans <strong>Domaines autorisés</strong> (ex: domaine Cloud Run).</li>
                  <li>(Optionnel en test) Dans la section <em>Numéro de téléphone de test</em>, ajoutez <code>+212 661234567</code> avec le code <code>1234</code>.</li>
                </ol>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Screen 2: OTP VERIFICATION */}
      {authStep === 'OTP' && (
        <main className="relative z-10 w-full max-w-md flex flex-col items-center">
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between mb-6">
            <button
              onClick={() => setAuthStep('LOGIN')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#2d1b00] hover:bg-[#fff4e5] transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#e65100]">Dada Kitchen</h1>
            <div className="w-10"></div>
          </div>

          <div className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#dec0b9]/30">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-[#ffdad2] rounded-2xl flex items-center justify-center rotate-3 shadow-sm">
                <span className="material-symbols-outlined text-[#e65100] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  mark_email_unread
                </span>
              </div>
            </div>

            {/* Header Text */}
            <div className="text-center mb-6">
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl text-[#001f29] mb-2">
                Vérification du code
              </h2>
              <p className="font-['Be_Vietnam_Pro'] text-sm text-[#57423d]">
                Saisissez le code à 4 chiffres envoyé au <span className="font-bold text-[#001f29]">+212 {phoneNumber}</span>
              </p>

              {/* Quick Fill Button */}
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={() => handleAutofillOtp(currentOtpCode)}
                  className="px-3.5 py-1.5 bg-[#fff4e5] hover:bg-[#e65100] hover:text-white text-[#e65100] rounded-full text-xs font-bold border border-[#ffab69]/50 transition-all flex items-center gap-1.5 shadow-2xs active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">flash_on</span>
                  <span>Code reçu : {currentOtpCode} (Cliquer pour remplir)</span>
                </button>
              </div>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex justify-center gap-3">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputsRef.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className={`w-14 h-18 text-center font-['Plus_Jakarta_Sans'] text-3xl font-bold rounded-xl border-2 outline-none transition-all ${
                      otpSuccess
                        ? 'bg-[#e6f6ff] border-[#006a60] text-[#006a60]'
                        : otpError
                        ? 'bg-[#ffdad6]/40 border-[#ba1a1a] text-[#ba1a1a]'
                        : 'bg-[#f3faff] border-[#e65100]/40 focus:border-[#e65100] focus:bg-white text-[#001f29]'
                    }`}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {/* Error or Success Message */}
              {otpError && (
                <div className="p-3 bg-[#ffdad6]/50 border border-[#ba1a1a]/30 rounded-xl text-center text-xs font-bold text-[#ba1a1a] flex items-center justify-center gap-1.5 animate-in fade-in">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>{otpError}</span>
                </div>
              )}

              {otpSuccess && (
                <div className="p-3 bg-[#e6f6ff] border border-[#006a60]/30 rounded-xl text-center text-xs font-bold text-[#006a60] flex items-center justify-center gap-1.5 animate-in fade-in">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Timer & Resend */}
              <div className="text-center">
                {isTimerRunning ? (
                  <p className="font-['Be_Vietnam_Pro'] font-medium text-xs text-[#57423d]">
                    Renvoyer le code dans <span className="text-[#8e4e14] font-bold">{formatTimer(timerLeft)}</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const newCode = Math.floor(1000 + Math.random() * 9000).toString();
                      setCurrentOtpCode(newCode);
                      setOtpValues(['', '', '', '']);
                      setOtpError('');
                      setTimerLeft(60);
                      setIsTimerRunning(true);
                      setShowNotificationBanner(true);
                    }}
                    className="font-['Be_Vietnam_Pro'] text-xs text-[#e65100] font-bold underline hover:opacity-80 transition-opacity"
                  >
                    Renvoyer un nouveau code par SMS
                  </button>
                )}
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full h-14 bg-[#e65100] text-white rounded-xl font-['Plus_Jakarta_Sans'] font-bold text-lg shadow-md hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Valider et continuer</span>
                <span className="material-symbols-outlined text-xl">check</span>
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#dec0b9]/30 text-center">
              <p className="font-['Be_Vietnam_Pro'] text-xs text-[#57423d]">
                Besoin d'aide ?{' '}
                <a
                  href="#support"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Service client Dada Kitchen: Support disponible 7j/7 au 0522 00 00 00");
                  }}
                  className="text-[#006a60] font-semibold hover:underline"
                >
                  Contactez le support
                </a>
              </p>
            </div>
          </div>
        </main>
      )}

      {/* Screen 3: REGISTER (Créer un compte) */}
      {authStep === 'REGISTER' && (
        <main className="relative z-10 w-full max-w-[500px]">
          {/* Header */}
          <header className="w-full py-4 flex items-center justify-between mb-2">
            <button
              onClick={() => setAuthStep('OTP')}
              className="p-2 rounded-full text-[#57423d] hover:bg-[#ebe5e0] transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex-1 text-center pr-8">
              <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#e65100]">Créer un compte</h1>
            </div>
          </header>

          <div className="bg-white/95 backdrop-blur-md border border-black/10 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="mb-6 space-y-1">
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl text-[#001f29]">Bienvenue chez Dada Kitchen</h2>
              <p className="text-[#57423d] font-['Be_Vietnam_Pro'] text-sm">Rejoignez notre communauté de passionnés du goût.</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#57423d] block" htmlFor="full_name">
                  Nom complet
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#e65100]/80">
                    person
                  </span>
                  <input
                    id="full_name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Amina Alami"
                    className="w-full bg-[#f8f3ee] border-b-2 border-transparent focus:border-[#e65100] rounded-xl pl-12 pr-4 py-3 font-['Be_Vietnam_Pro'] text-sm outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#57423d] block" htmlFor="email">
                  Email
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#e65100]/80">
                    mail
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amina@exemple.ma"
                    className="w-full bg-[#f8f3ee] border-b-2 border-transparent focus:border-[#e65100] rounded-xl pl-12 pr-4 py-3 font-['Be_Vietnam_Pro'] text-sm outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* City Select */}
              <div className="space-y-1">
                <label className="font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#57423d] block" htmlFor="city">
                  Ville
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#e65100]/80">
                    location_on
                  </span>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#f8f3ee] border-b-2 border-transparent focus:border-[#e65100] rounded-xl pl-12 pr-10 py-3 font-['Be_Vietnam_Pro'] text-sm appearance-none outline-none transition-all text-[#001f29]"
                    required
                  >
                    <option value="casablanca">Casablanca</option>
                    <option value="rabat">Rabat</option>
                    <option value="marrakech">Marrakech</option>
                    <option value="agadir">Agadir</option>
                    <option value="tanger">Tanger</option>
                    <option value="fes">Fès</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#57423d] pointer-events-none">
                    expand_more
                  </span>
                </div>
                <p className="text-[11px] text-[#8e4e14] font-medium mt-1">
                  Livraison disponible à Casablanca actuellement.
                </p>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1">
                <label className="font-['Be_Vietnam_Pro'] text-xs font-semibold text-[#57423d] block" htmlFor="delivery_address">
                  Adresse de livraison
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#e65100]/80">
                    home
                  </span>
                  <input
                    id="delivery_address"
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Ex: Rue 12, Maarif"
                    className="w-full bg-[#f8f3ee] border-b-2 border-transparent focus:border-[#e65100] rounded-xl pl-12 pr-4 py-3 font-['Be_Vietnam_Pro'] text-sm outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Zone Acknowledgment Checkbox */}
              <div className="flex items-start gap-3 p-3 bg-[#fff4e5] rounded-xl border border-[#ffab69]/30 mt-2">
                <input
                  type="checkbox"
                  id="zone_ack"
                  checked={zoneAck}
                  onChange={(e) => setZoneAck(e.target.checked)}
                  className="mt-1 rounded border-[#dec0b9] text-[#e65100] focus:ring-[#e65100] h-4 w-4"
                  required
                />
                <label htmlFor="zone_ack" className="text-xs font-['Be_Vietnam_Pro'] text-[#57423d] leading-relaxed cursor-pointer">
                  <span className="font-bold text-[#e65100]">La section Dadas</span> est disponible pour le moment dans les zones suivantes : Sidi Maarouf, Floride, Beausejour, CIL, Oasis, Maarif, Riviera.<br />
                  <span className="font-bold text-[#e65100]">La section Traiteurs</span> est disponible dans toute la ville de Casablanca et régions.
                </label>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-3 py-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAck}
                  onChange={(e) => setTermsAck(e.target.checked)}
                  className="rounded border-[#dec0b9] text-[#e65100] focus:ring-[#e65100] h-4 w-4"
                  required
                />
                <label htmlFor="terms" className="text-xs font-['Be_Vietnam_Pro'] text-[#57423d] cursor-pointer">
                  J'accepte les conditions d'utilisation et la politique de confidentialité.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#e65100] text-white py-4 rounded-xl font-['Plus_Jakarta_Sans'] font-bold text-base transition-all hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group mt-4 cursor-pointer"
              >
                <span>S'inscrire et commencer</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  chevron_right
                </span>
              </button>
            </form>
          </div>
        </main>
      )}
    </div>
  );
};
