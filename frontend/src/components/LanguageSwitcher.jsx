import React, { useEffect, useState } from 'react';

// Lightweight language selector (UI-only for now). Stores preference in localStorage.
// Languages commonly used in Indian government portals.
const LANG_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'mr', label: 'मराठी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' }
];

const LanguageSwitcher = ({ onChange }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
    if (typeof onChange === 'function') onChange(lang);
    // Dispatch a custom event so other parts can listen if needed (non-breaking enhancement)
    window.dispatchEvent(new CustomEvent('app:languageChanged', { detail: { lang } }));
  }, [lang, onChange]);

  return (
    <label className="sr-only" aria-label="Language selector">
      <select
        className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        aria-label="Select language"
      >
        {LANG_OPTIONS.map((opt) => (
          <option key={opt.code} value={opt.code}>{opt.label}</option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSwitcher;
