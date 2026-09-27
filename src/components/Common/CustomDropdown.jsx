import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomDropdown.css';

export default function CustomDropdown({
  options = [],
  value = '',
  onChange,
  name,
  placeholder = 'Select an option',
  required = false,
  searchable = true,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Normalize options to { value, label }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return { value: opt.value, label: opt.label || opt.value };
    }
    return { value: opt, label: opt };
  });

  // Current selected label
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : '';

  // Filtered options based on search query
  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setSearchQuery('');
      return next;
    });
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input on open if searchable and many options
  useEffect(() => {
    if (isOpen && searchable && normalizedOptions.length > 7 && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, searchable, normalizedOptions.length]);

  // Handle option select
  const handleSelect = (optValue) => {
    if (onChange) {
      // Send both synthetic event style and raw value for compatibility
      onChange({ target: { name, value: optValue } });
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`hp-custom-dropdown ${className}`} ref={dropdownRef}>
      {/* Hidden input to ensure HTML form submission and native validity */}
      <input
        type="hidden"
        name={name}
        value={value || ''}
        required={required}
      />

      {/* Trigger Button */}
      <button
        type="button"
        className={`hp-dropdown-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`hp-dropdown-value ${!displayLabel ? 'is-placeholder' : ''}`}>
          {displayLabel || placeholder}
        </span>
        <span className="hp-dropdown-arrow">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>

      {/* Floating Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="hp-dropdown-menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            role="listbox"
          >
            {/* Search Input for lists with > 6 items */}
            {searchable && normalizedOptions.length > 6 && (
              <div className="hp-dropdown-search-wrap">
                <span className="hp-dropdown-search-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <input
                  ref={searchInputRef}
                  type="search"
                  className="hp-dropdown-search-input"
                  placeholder="Quick search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            )}

            {/* Options List */}
            <ul className="hp-dropdown-list">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, idx) => {
                  const isSelected = opt.value === value;
                  return (
                    <li
                      key={idx}
                      className={`hp-dropdown-item ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => handleSelect(opt.value)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span>{opt.label}</span>
                      {isSelected && (
                        <span className="hp-dropdown-check">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="hp-dropdown-empty">No results found</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
