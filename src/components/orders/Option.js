/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Option({
  name, value, onClick, options,
}) {
  return (

    <div>
      <label name={name} id={name}>{value}</label>
      <input type="radio" onChange={() => { onClick(options); }} name={name} value={value} required />
    </div>

  );
}
