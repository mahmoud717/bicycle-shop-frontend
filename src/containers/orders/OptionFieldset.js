/* eslint-disable react/prop-types */
import React from 'react';

export default function OptionFieldset({ name, options }) {
  return (
    <fieldset name={name} className={name} key={name}>
      <legend>{name}</legend>
      {options.map(option => (
        option
      ))}
    </fieldset>
  );
}
