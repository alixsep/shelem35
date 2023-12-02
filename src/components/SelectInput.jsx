import './SelectInput.scss';

import MiniModal from './MiniModal';

const SelectInput = ({ placeholder, options, action, value }) => {
  return (
    <MiniModal placeholder={placeholder} options={options} action={action}>
      <div className='select-input'>
        <div className='display' onClick={null}>
          {value ? (
            <div className='value'>{value}</div>
          ) : (
            <div className='placeholder'>{placeholder || 'pick'}</div>
          )}
        </div>
      </div>
    </MiniModal>
  );
};

export default SelectInput;
