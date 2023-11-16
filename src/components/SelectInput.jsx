import { useState } from 'react';

import './SelectInput.scss';
import { Close_SVG } from '../svg';

const SelectInput = (p) => {
  const [isOptionPickerOpen, setIsOptionPickerOpen] = useState(false);

  return (
    <div className='select-input'>
      <div className='display' onClick={() => setIsOptionPickerOpen(true)}>
        {p.value ? (
          <div className='value'>{p.value}</div>
        ) : (
          <div className='placeholder'>{p.placeholder || 'pick'}</div>
        )}
      </div>
      {isOptionPickerOpen ? (
        <div className='options'>
          <div className='titlebar'>
            <div className='title'>Select {p.placeholder}</div>
            <div
              className='close-button'
              onClick={() => setIsOptionPickerOpen(false)}
            >
              <Close_SVG />
            </div>
          </div>
          {p.options &&
            p.options.map((option) => {
              return (
                <div
                  key={option.value}
                  className='option'
                  onClick={() => {
                    p.action(option.value);
                    setIsOptionPickerOpen(false);
                  }}
                >
                  {option.text}
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default SelectInput;
