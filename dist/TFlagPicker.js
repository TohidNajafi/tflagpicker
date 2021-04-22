import "./TFlagPicker.css";
import React from 'react';
import { useEffect, useState } from "react";
import countries from "./data/countries";
import PropTypes from 'prop-types';

function TFlagPicker(props) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({
    "name": "Iran, Islamic Republic of",
    "dial_code": "+98",
    "code": "IR"
  });
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    let defaultCountries = countries.filter(function (co) {
      return co.code.toLowerCase() === props.defaultCountry.toLowerCase();
    });

    if (defaultCountries.length > 0) {
      setSelected(defaultCountries[0]);
    }

    window.onclick = function (event) {
      if (event.target.getAttribute('id') === "my-tfg-modal") {
        setShow(false);
      }
    };
  });

  const buttonClicked = () => {
    setSearchKey("");
    setShow(true);
    setFilteredCountries(countries);
  };

  const searchKeyChanged = e => {
    setSearchKey(e.target.value);
    let filtered = countries.filter(function (el) {
      return el.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredCountries(filtered);
  };

  const countrySelected = country => {
    setSelected(country);
    setShow(false);
    props.onChange(country);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tfg-button",
    onClick: buttonClicked
  }, /*#__PURE__*/React.createElement("img", {
    className: "tfg-button-flag",
    src: require(`./data/${selected.code.toLowerCase()}.svg`).default,
    alt: "flag"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tfg-button-symbol"
  }, selected.code), /*#__PURE__*/React.createElement("span", null, "|"), /*#__PURE__*/React.createElement("span", {
    className: "tfg-button-code"
  }, selected.dial_code)), /*#__PURE__*/React.createElement("div", {
    id: "my-tfg-modal",
    className: "tfg-modal",
    style: {
      display: show ? "block" : "none"
    },
    dir: props.modalDirection
  }, /*#__PURE__*/React.createElement("div", {
    className: "tfg-modal-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tfg-modal-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tfg-modal-header-input-place"
  }, /*#__PURE__*/React.createElement("img", {
    src: require("./search-icon.svg").default,
    className: "tfg-modal-header-search-icon",
    alt: "search-icon"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "tfg-modal-header-input",
    placeholder: props.searchPlaceholder,
    value: searchKey,
    onChange: searchKeyChanged
  }))), /*#__PURE__*/React.createElement("div", {
    id: "my-tfg-modal-body",
    className: "tfg-modal-body"
  }, filteredCountries.map((country, c) => /*#__PURE__*/React.createElement("div", {
    className: "tfg-modal-body-item",
    key: c,
    onClick: () => countrySelected(country)
  }, /*#__PURE__*/React.createElement("img", {
    className: "tfg-modal-body-item-flag",
    src: require(`./data/${country.code.toLowerCase()}.svg`).default,
    alt: "flag"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tfg-modal-body-item-name"
  }, country.name), /*#__PURE__*/React.createElement("span", {
    className: "tfg-modal-body-item-dial-code"
  }, country.dial_code)))))));
}

TFlagPicker.defaultProps = {
  searchPlaceholder: 'Search',
  defaultCountry: "IR",
  modalDirection: "ltr"
};
TFlagPicker.propTypes = {
  searchPlaceholder: PropTypes.string,
  defaultCountry: PropTypes.string,
  modalDirection: PropTypes.string,
  onChange: PropTypes.func
};
export default TFlagPicker;