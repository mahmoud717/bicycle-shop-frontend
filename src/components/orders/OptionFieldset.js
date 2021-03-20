/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

export default function OptionFieldset({
  name, options, onClick, originalOptions,
}) {
  return (
    <fieldset name={name} className={name} required>
      <legend>{name}</legend>
      {options.map(option => (
        <Option key={option.id + option.name} option={option} onClick={onClick} originalOptions={originalOptions} />
      ))}
    </fieldset>
  );
}

OptionFieldset.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  originalOptions: PropTypes.array.isRequired,
};
