/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-key */
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Option from '../../components/orders/Option';
import OptionFieldset from '../../components/orders/OptionFieldset';

const NewOrder = ({ authData }) => {
  const { id } = useParams();
  const [bicycle, changeBicycle] = useState({});
  const [options, changeOptions] = useState([]);
  const history = useHistory();
  // option adding
  const addFieldset = optionsArray => {
    if (optionsArray.length !== 0) {
      const fieldsetDiv = [];

      optionsArray.map(option => {
        fieldsetDiv.push(<Option id={option.option_id} name={option.option_name} value={option.option_value} onClick={addFieldset} options={option.sub_options} />);
      });

      changeOptions(oldOptions => [...oldOptions, <OptionFieldset name={optionsArray[0].option_name} options={fieldsetDiv} id={optionsArray[0].option_level} />]);
    }
  };

  // fetching bike data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/bicycles/${id}`)
      .then(response => {
        if (response.data) {
          changeBicycle(response.data);
          addFieldset(response.data.options.options, 0);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // options filtering
  useEffect(() => {
    const newOptions = options.filter(option => {
      if (option.key <= options[(options.length - 1)].props.id) {
        if (options[(options.length - 1)].props.name === option.props.name) {
          if (options[(options.length - 1)] === option) { return option; }
        }
        if (options[(options.length - 1)].props.name !== option.props.name) {
          return option;
        }
      }
    });
    changeOptions(newOptions);
  }, [options.length]);

  // submission handling

  const handleSubmit = e => {
    e.preventDefault();
    const radios = document.getElementsByTagName('input');
    let selectedOptions = {};
    for (let i = 0; i < radios.length; i += 1) {
      if (radios[i].type === 'radio' && radios[i].checked) {
        selectedOptions = { ...selectedOptions, [radios[i].name]: radios[i].value };
      }
    }
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/v1/orders',
      data: {
        user_id: authData.user.id,
        bicycle_id: id,
        product_name: bicycle.name,
        product_image_url: bicycle.image_url,
        options: selectedOptions,
      },
    })
      .then(() => {
        history.push('/orders/success');
      });
  };

  return (

    <div className="container-fluid">
      <div className="bicycle-container container d-flex flex-column justify-content-center align-items-center">
        <div className="bicycle-container-image">
          <div className="bicycle-container-model btn btn-outline-primary">{bicycle.model}</div>
          <img src={bicycle.image_url} alt="" className="w-100" />
        </div>
        <div className="bicycle-container-name">{bicycle.name}</div>
        <div className="bicycle-container-description">{bicycle.description}</div>
        <div>
          <h2>Place order</h2>
          <form id="OrderForm">
            <div className="order-options">
              {options.length !== 0 ? options.map(option => option) : ''}
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Create order</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default NewOrder;
