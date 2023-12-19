import './Title.scss';

import CardImage from '../img/card.webp';
import TitleImage from '../img/shelem35.webp';

const Title = () => {
  return (
    <div className='page-title'>
      <div className='banner'>
        <img src={CardImage} alt='Card Image' />
      </div>
      <div className='title'>
        <img src={TitleImage} alt='Shelem35' />
      </div>
    </div>
  );
};

export default Title;
