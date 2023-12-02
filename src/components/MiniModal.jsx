// import { useState } from 'react';
import { Close_SVG } from '../svg';

import './MiniModal.scss';
import useModal from '../hooks/useModal';

const MiniModal = ({
  placeholder,
  options,
  action,
  className,
  noSelect,
  children,
}) => {
  const [isModalOpen, close, open] = useModal();

  return (
    <div className='component-with-modal'>
      <div className='modal-child' onClick={open}>
        {children}
      </div>
      {isModalOpen ? (
        <div className={`options ${className}`}>
          <div className='titlebar'>
            <div className='title'>
              {noSelect ? '' : 'Select '}
              {placeholder}
            </div>
            <div className='close-button' onClick={close}>
              <Close_SVG />
            </div>
          </div>
          {options &&
            options.map((option) => {
              return (
                <div
                  key={option.value}
                  className='option'
                  onClick={() => {
                    action(option.value);
                    close();
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

export default MiniModal;
