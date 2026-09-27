import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://nanhokyuiunadovjbggz.supabase.co';
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hbmhva3l1aXVuYWRvdmpiZ2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzMjk0MTcsImV4cCI6MjEwNTkwNTQxN30.WpMu3Au_StkCEp5QKKDYTvUTdzUxIoeEHW8YZ2zmFrE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Submit a fast service quote request from ServiceDetail page
 */
export async function submitServiceRequest(data) {
  try {
    const { error } = await supabase
      .from('service_requests')
      .insert([
        {
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          address: data.address || null,
          city: data.city || null,
          brand: data.brand || null,
          service_type: data.serviceType || null,
          time_preference: data.timePreference || null,
          message: data.message || null,
          status: 'pending',
        },
      ]);

    if (error) {
      console.error('Supabase error inserting service_request:', error);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    console.error('Unexpected error in submitServiceRequest:', err);
    return { success: false, error: err };
  }
}

/**
 * Submit a question / inquiry from FAQ page
 */
export async function submitInquiry(data) {
  try {
    const { error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: data.name || null,
          email: data.email || null,
          phone: data.phone || null,
          subject: data.subject || null,
          message: data.message,
          status: 'new',
        },
      ]);

    if (error) {
      console.error('Supabase error inserting inquiry:', error);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    console.error('Unexpected error in submitInquiry:', err);
    return { success: false, error: err };
  }
}

/**
 * Subscribe to newsletter from Footer
 */
export async function subscribeNewsletter(email) {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (error) {
      // 23505 is PostgreSQL unique constraint violation (already subscribed)
      if (error.code === '23505') {
        return { success: true, alreadySubscribed: true };
      }
      console.error('Supabase error subscribing newsletter:', error);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    console.error('Unexpected error in subscribeNewsletter:', err);
    return { success: false, error: err };
  }
}

/**
 * ============================================================================
 * SITE SETTINGS (PUBLIC & ADMIN)
 * ============================================================================
 */

export async function getSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'general')
      .single();

    if (error) {
      console.warn('Could not load site_settings from Supabase, using defaults:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Error fetching site_settings:', err);
    return null;
  }
}

/**
 * ============================================================================
 * SECURE ADMIN PANEL API (RPC BASED WITH PASSWORD HASHING & TOKEN AUTH)
 * ============================================================================
 */

export async function adminLogin(username, password) {
  try {
    const { data, error } = await supabase.rpc('admin_login', {
      p_username: username,
      p_password: password,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Admin login error:', err);
    return { success: false, error: err.message || 'Login failed' };
  }
}

export async function adminVerifySession(token) {
  try {
    if (!token) return { valid: false };
    const { data, error } = await supabase.rpc('admin_verify_session', {
      p_token: token,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Session verify error:', err);
    return { valid: false };
  }
}

export async function adminLogout(token) {
  try {
    if (!token) return { success: true };
    const { data, error } = await supabase.rpc('admin_logout', {
      p_token: token,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Logout error:', err);
    return { success: true };
  }
}

export async function adminChangePassword(token, oldPassword, newPassword) {
  try {
    const { data, error } = await supabase.rpc('admin_change_password', {
      p_token: token,
      p_old_password: oldPassword,
      p_new_password: newPassword,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Change password error:', err);
    return { success: false, error: err.message || 'Şifre değiştirilemedi' };
  }
}

export async function adminGetDashboardStats(token) {
  try {
    const { data, error } = await supabase.rpc('admin_get_dashboard_stats', {
      p_token: token,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Get stats error:', err);
    return { success: false, error: err.message };
  }
}

export async function adminGetServiceRequests(token, status = 'all') {
  try {
    const { data, error } = await supabase.rpc('admin_get_service_requests', {
      p_token: token,
      p_status: status,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Get service requests error:', err);
    return { success: false, error: err.message };
  }
}

export async function adminUpdateServiceRequest(token, id, status, adminNotes = null) {
  try {
    const { data, error } = await supabase.rpc('admin_update_service_request', {
      p_token: token,
      p_id: id,
      p_status: status,
      p_admin_notes: adminNotes,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Update service request error:', err);
    return { success: false, error: err.message };
  }
}

export async function adminDeleteServiceRequest(token, id) {
  try {
    const { data, error } = await supabase.rpc('admin_delete_service_request', {
      p_token: token,
      p_id: id,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Delete service request error:', err);
    return { success: false, error: err.message };
  }
}

export async function adminGetInquiries(token, status = 'all') {
  try {
    const { data, error } = await supabase.rpc('admin_get_inquiries', {
      p_token: token,
      p_status: status,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Get inquiries error:', err);
    return { success: false, error: err.message };
  }
}

export async function adminUpdateInquiry(token, id, status) {
  try {
    const { data, error } = await supabase.rpc('admin_update_inquiry', {
      p_token: token,
      p_id: id,
      p_status: status,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Update inquiry error:', err);
    return { success: false, error: err.message };
  }
}

export async function adminDeleteInquiry(token, id) {
  try {
    const { data, error } = await supabase.rpc('admin_delete_inquiry', {
      p_token: token,
      p_id: id,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Delete inquiry error:', err);
    return { success: false, error: err.message };
  }
}

export async function adminGetSubscribers(token) {
  try {
    const { data, error } = await supabase.rpc('admin_get_subscribers', {
      p_token: token,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Get subscribers error:', err);
    return { success: false, error: err.message };
  }
}

export async function adminDeleteSubscriber(token, id) {
  try {
    const { data, error } = await supabase.rpc('admin_delete_subscriber', {
      p_token: token,
      p_id: id,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Delete subscriber error:', err);
    return { success: false, error: err.message };
  }
}

export async function adminUpdateSettings(token, settings) {
  try {
    const { data, error } = await supabase.rpc('admin_update_settings', {
      p_token: token,
      p_settings: settings,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Update settings error:', err);
    return { success: false, error: err.message };
  }
}

