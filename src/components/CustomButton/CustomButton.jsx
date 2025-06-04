import React from 'react';

function CustomButton({ label, onClick, type = 'button', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 'auto',
        padding: '0.6rem 1.2rem',
        backgroundColor: disabled ? '#ccc' : '#0038FD',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.3s',
      }}
    >
      {label}
    </button>
  );
}

export default CustomButton;
