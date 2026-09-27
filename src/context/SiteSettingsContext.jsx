import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSiteSettings } from '../lib/supabase';

const defaultSettings = {
  company_name: 'HomePulse Appliance Repair',
  phone: '(800) 555-0199',
  phone_raw: '18005550199',
  emergency_phone: '(800) 555-0199',
  email: 'info@homepulse.com',
  address: '100 State Street, Suite 400',
  city_state: 'Boston, MA 02109',
  working_hours: 'Mon - Sat: 7:00 AM - 9:00 PM | Sun: Emergency Service',
  emergency_badge: '24/7 Rapid Response in Greater Boston',
  announcement: 'Same-day luxury appliance repair dispatch available today',
  whatsapp_number: '15715711664',
  whatsapp_display: '(571) 571-1664',
  facebook_url: 'https://www.facebook.com',
  instagram_url: 'https://www.instagram.com',
  twitter_url: 'https://www.twitter.com',
  linkedin_url: 'https://www.linkedin.com',
};

const SiteSettingsContext = createContext({
  settings: defaultSettings,
  loading: true,
  refreshSettings: async () => {},
});

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await getSiteSettings();
      if (data) {
        const phone = data.phone || defaultSettings.phone;
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const waNum = data.whatsapp_number || defaultSettings.whatsapp_number;
        const cleanWa = waNum.replace(/[^0-9]/g, '');

        setSettings((prev) => ({
          ...prev,
          ...data,
          phone,
          phone_raw: cleanPhone,
          whatsapp_number: cleanWa,
          whatsapp_display: data.whatsapp_display || data.whatsapp_number || phone,
          call_link: `tel:+${cleanPhone}`,
          whatsapp_link: `https://wa.me/${cleanWa}`,
        }));
      }
    } catch (e) {
      console.warn('Failed to load settings:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  return context || { settings: defaultSettings, loading: false, refreshSettings: () => {} };
}
