import React from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

const InputComponent: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Ingrese apellidos y nombres o solo apellidos"
      />
    </div>
  );
};

export default InputComponent;
