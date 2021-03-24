/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';

const Option = ({
  option, onClick, originalOptions,
}) => (
  <div key={option.id} className="option">
    <label name={option.name} id={option.id}>{option.value}</label>
    <input type="radio" onChange={() => { onClick(option.level + 1, option.id, originalOptions); }} name={option.name} value={option.value} required />
  </div>

);

Option.propTypes = {
  option: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  originalOptions: PropTypes.array.isRequired,
};

export default Option;
