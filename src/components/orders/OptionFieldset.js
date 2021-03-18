/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react';
import Option from './Option';

export default function OptionFieldset({
  name, options, onClick, originalOptions,
}) {
  return (
    <fieldset name={name} className={name} required>
      <legend>{name}</legend>
      {options.map(option => (
        <Option option={option} onClick={onClick} originalOptions={originalOptions} />
      ))}
    </fieldset>
  );
}
