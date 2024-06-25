// CategorySelector.js
import React from 'react';

const CategorySelector = ({ onSelectCategory }) => {
  const categories = [
    { id: 'all', name: 'Todas las categorías', background: 'linear-gradient(to right, hsla(231, 83%, 18%, 0.856), hsla(93, 86%, 28%, 0.479))' },
    { id: '1', name: 'Suculentas', background: 'linear-gradient(to right,#0ae3f35e,#152b4170)' },
    { id: '2', name: 'Arreglos', background: 'linear-gradient(to right,#f30ab95e,#0281ff70)' },
    { id: '3', name: 'Carnívoras', background: ' linear-gradient(to right,#f32d0a5e,#1e075c70)' },
    { id: '4', name: 'Jardín', background: 'linear-gradient(to right,#e917175e,#ebd40770)' },
    { id: '5', name: 'Interiores', background: 'linear-gradient(to right,#1ef02888,#0831058e)' },
    { id: '6', name: 'Orquídeas', background: 'linear-gradient(to right,#9306eb9c,#2c102abe)' }
  ];

  const handleChange = (e, category) => {
    e.preventDefault();
    onSelectCategory(category.id);
  };

  return (
    <div className="category-selector">
      {categories.map((category) => (
        <a key={category.id} href="/" className="category-link" style={{ background: category.background }} onClick={(e) => handleChange(e, category)}>
          {category.name}
        </a>
      ))}
    </div>
  );
};

export default CategorySelector;
