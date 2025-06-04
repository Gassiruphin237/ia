import React from 'react';

function CustomInput({ label, type, value, onChange, placeholder }) {
  return (
    <div className="custom-input" style={{ marginBottom: '1rem' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '0.5rem',  textTransform:'' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '6px',
          fontSize: '1rem'
        }}
      />
    </div>
  );
}

export default CustomInput;
