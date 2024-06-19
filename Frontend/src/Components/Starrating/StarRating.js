import React from 'react';
import '../Starrating/Starrating.css'
import starfull from '../../images/icons/star-full.svg'
import starhalf from '../../images/icons/star-half.svg'
import starempty from '../../images/icons/star-empty.svg'

const StarRating=({ stars, size })=> {
  const styles = {
    width: size + 'px',
    height: size + 'px',
    marginRight: size / 6 + 'px',
  };

  function Star({ number }) {
    const halfNumber = number - 0.5;

    return stars >= number ? (
      <img src={starfull} style={styles} alt={number} />
    ) : stars >= halfNumber ? (
      <img src={starhalf}style={styles} alt={number} />
    ) : (
      <img src={starempty}style={styles} alt={number} />
    );
  }

  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map(number => (
        <Star key={number} number={number} />
      ))}
    </div>
  );
}

StarRating.defaultProps = {
  size: 18,
};
export default StarRating;