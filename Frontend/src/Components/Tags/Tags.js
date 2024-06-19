import React from 'react';
import { Link } from 'react-router-dom';
import './Tag.css'

export default function Tags({ tags, forFoodPage }) {

  return (
    <div
      className='tag-container'
      style={{
        justifyContent: forFoodPage ? 'start' : 'center',
      }}
    >
        
      {tags.map(tag => (
        <Link key={tag.name} to={`/tag/${tag.name}`}>
          {tag.name}
          {!forFoodPage && `(${tag.count})`}
        </Link>
      ))}
    </div>
  );
}