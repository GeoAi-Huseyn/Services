import React, { useState, useRef, useEffect } from 'react';
import './AdminStatusDropdown.css';

const SERVICE_STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    dot: '#f59e0b',
    color: '#b45309',
    bg: '#fef3c7',
    border: '#fde68a',
  },
  in_progress: {
    label: 'In Progress',
    dot: '#3b82f6',
    color: '#1d4ed8',
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
  completed: {
    label: 'Completed',
    dot: '#10b981',
    color: '#047857',
    bg: '#ecfdf5',
    border: '#a7f3d0',
  },
  cancelled: {
    label: 'Cancelled',
    dot: '#ef4444',
    color: '#b91c1c',
    bg: '#fef2f2',
    border: '#fecaca',
  },
};

const INQUIRY_STATUS_CONFIG = {
  new: {
    label: 'New',
    dot: '#6366f1',
    color: '#4338ca',
    bg: '#eef2ff',
    border: '#c7d2fe',
  },
  contacted: {
    label: 'Contacted',
    dot: '#f59e0b',
    color: '#b45309',
    bg: '#fef3c7',
    border: '#fde68a',
  },
  resolved: {
    label: 'Resolved',
    dot: '#10b981',
    color: '#047857',
    bg: '#ecfdf5',
    border: '#a7f3d0',
  },
};

export default function AdminStatusDropdown({
  value,
  onChange,
  type = 'service',
  customOptions = null,
  size = 'md',
  align = 'left',
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef(null);

  const baseConfig = type === 'inquiry' ? INQUIRY_STATUS_CONFIG : SERVICE_STATUS_CONFIG;
  const options = customOptions || Object.keys(baseConfig).map((key) => ({
    value: key,
    label: baseConfig[key].label,
    ...baseConfig[key],
  }));

  const currentOption = options.find((opt) => opt.value === value) || {
    label: value || 'Select Status',
    dot: '#64748b',
    color: '#334155',
    bg: '#f1f5f9',
    border: '#cbd5e1',
  };

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 220 && rect.top > 220) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (val) => {
    setIsOpen(false);
    if (val !== value && onChange) {
      onChange(val);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`hp-admin-status-dropdown ${size === 'sm' ? 'hp-status-sm' : ''} ${
        disabled ? 'hp-status-disabled' : ''
      }`}
    >
      <button
        type="button"
        className={`hp-status-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{
          backgroundColor: currentOption.bg,
          color: currentOption.color,
          borderColor: currentOption.border,
        }}
      >
        <span
          className="hp-status-dot"
          style={{ backgroundColor: currentOption.dot }}
        />
        <span className="hp-status-label">{currentOption.label}</span>
        <svg
          className="hp-status-chevron"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`hp-status-menu ${dropUp ? 'is-dropup' : 'is-dropdown'} align-${align}`}
          role="listbox"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`hp-status-option ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelect(opt.value)}
              >
                <div className="hp-option-left">
                  <span
                    className="hp-option-dot"
                    style={{ backgroundColor: opt.dot }}
                  />
                  <span className="hp-option-text">{opt.label}</span>
                </div>
                {isSelected && (
                  <svg
                    className="hp-option-check"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
