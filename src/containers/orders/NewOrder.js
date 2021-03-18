/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable consistent-return */

import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import OptionFieldset from '../../components/orders/OptionFieldset';
import changeUserOrders from '../../redux/actions/order_actions';

const NewOrder = ({ authData, changeUserOrders }) => {
  const { id } = useParams();
  const [bicycle, setBicycle] = useState({});
  const [originalOptions, setOriginalOptions] = useState([]);
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [elements, setElements] = useState([]);
  const history = useHistory();

  // adding options to the displayed options list
  const addOptions = (level, parentId, originalOptions) => {
    // checking if there are option with the same level or higher and removing them from the displayed options list
    if (displayedOptions.length) {
      setDisplayedOptions(displayedOptions.filter(item => {
        if (item[0] && item[0].level < level) {
          return item;
        }
      }));
    }
    // adding new options to the displayed options list on select
    let fieldsetArray = [];
    originalOptions.map(option => {
      if (option.level === level && option.parent_id === parentId) {
        fieldsetArray.push(option);
      }
    });
    setDisplayedOptions(oldOptions => [...oldOptions, fieldsetArray]);
  };

  // fetching bike data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/bicycles/${id}`)
      .then(response => {
        if (response.data) {
          setBicycle(response.data.bicycle);
          setOriginalOptions(response.data.options);
          addOptions(1, null, response.data.options);
        }
      })
      .then(() => {

      });
  }, []);

  // converting the items in the displayed options list to react elements
  useEffect(() => {
    setElements([]);
    displayedOptions.map(optionGroup => {
      if (optionGroup.length) {
        setElements(oldElements => [...oldElements, <OptionFieldset key={optionGroup[0].name} options={optionGroup} onClick={addOptions} originalOptions={originalOptions} name={optionGroup[0].name} />]);
      }
    });
  }, [displayedOptions]);

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
      .then(response => {
        if (response.data.status === 'success') {
          changeUserOrders(response.data.orders);
          history.push('/orders/success');
        }
      });
  };

  return (

    <div className="container-fluid p-3">
      <div className="bicycle-container container d-flex flex-column justify-content-center align-items-center">
        <div className="bicycle-container-image">
          <div className="bicycle-container-model btn btn-outline-primary">{bicycle.model}</div>
          <img src={bicycle.image_url} alt="" className="w-100" />
        </div>
        <div className="bicycle-container-name">{bicycle.name}</div>
        <div className="bicycle-container-description">{bicycle.description}</div>
        <div>
          <h2>Place order</h2>
          {/* looping through react elements and displaying them by order */}
          <form id="OrderForm" onSubmit={handleSubmit}>
            { elements && elements.map(el => el)}
            <input type="submit" value="Create order" className="btn btn-primary" />
          </form>
        </div>
      </div>
    </div>

  );
};

const mapDispatchToProps = dispatch => ({
  changeUserOrders: orders => dispatch(changeUserOrders(orders)),
});
export default connect(null, mapDispatchToProps)(NewOrder);
