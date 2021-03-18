/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Option({
  option, onClick, originalOptions,
}) {
  return (
    <div key={option.id}>
      <label name={option.name} id={option.id}>{option.value}</label>
      <input type="radio" onChange={() => { onClick(option.level + 1, option.id, originalOptions); }} name={option.name} value={option.value} required />
    </div>

  );
}
