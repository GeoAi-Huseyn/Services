import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSiteSettings } from '../lib/supabase';

const defaultSettings = {
  company_name: 'HomePulse Appliance Repair',
  phone: '+1 (978) 845-1521',
  phone_raw: '19788451521',
  emergency_phone: '+1 (978) 845-1521',
  email: 'homepulseappliance@gmail.com',
  address: '100 State Street, Suite 400',
  city_state: 'Boston, MA 02109',
  working_hours: 'Mon - Sat: 7:00 AM - 9:00 PM | Sun: Emergency Service',
  emergency_badge: '24/7 Rapid Response in Greater Boston',
  announcement: 'Same-day luxury appliance repair dispatch available today',
  whatsapp_number: '18572022507',
  whatsapp_display: '+1 (857) 202-2507',
  facebook_url: 'https://www.facebook.com',
  instagram_url: 'https://www.instagram.com',
  twitter_url: 'https://www.twitter.com',
  linkedin_url: 'https://www.linkedin.com',
};

function formatSettings(data) {
  if (!data) return defaultSettings;
  const phone = data.phone || defaultSettings.phone;
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const waNum = data.whatsapp_number || defaultSettings.whatsapp_number;
  const cleanWa = waNum.replace(/[^0-9]/g, '');
  return {
    ...defaultSettings,
    ...data,
    phone,
    phone_raw: cleanPhone,
    whatsapp_number: cleanWa,
    whatsapp_display: data.whatsapp_display || data.whatsapp_number || phone,
    call_link: `tel:+${cleanPhone}`,
    whatsapp_link: `https://wa.me/${cleanWa}`,
  };
}

const SiteSettingsContext = createContext({
  settings: defaultSettings,
  loading: true,
  refreshSettings: async () => {},
});

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('homepulse_site_settings');
        if (cached) {
          return formatSettings(JSON.parse(cached));
        }
      }
    } catch (e) {
      // ignore JSON parse error
    }
    return formatSettings(defaultSettings);
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await getSiteSettings();
      if (data) {
        const resolved = formatSettings(data);
        setSettings(resolved);
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('homepulse_site_settings', JSON.stringify(data));
          }
        } catch (e) {
          // localStorage error
        }
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
