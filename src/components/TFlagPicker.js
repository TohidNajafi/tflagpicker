import "./TFlagPicker.css"
import React from 'react';
import {useEffect, useState} from "react";
import countries from "./data/countries";
import PropTypes from 'prop-types'

function TFlagPicker(props) {
    const [show,setShow] = useState(false);
    const [selected,setSelected] = useState({"name":"Iran, Islamic Republic of","dial_code":"+98","code":"IR"});
    const [filteredCountries,setFilteredCountries] = useState(countries);
    const [searchKey,setSearchKey] = useState("");

    useEffect(()=>{
        let defaultCountries = countries.filter(function (co) {
            return co.code.toLowerCase() === props.defaultCountry.toLowerCase();
        });
        if (defaultCountries.length>0){
            setSelected(defaultCountries[0])
        }
        window.onclick = function(event) {
            if (event.target.getAttribute('id') === "my-tfg-modal") {
                setShow(false);
            }
        }
    });
    const buttonClicked = () => {
        setSearchKey("")
        setShow(true)
        setFilteredCountries(countries)
    }
    const searchKeyChanged = (e) =>{
        setSearchKey(e.target.value)
        let filtered = countries.filter(function (el) {
            return el.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredCountries(filtered);
    }
    const countrySelected = (country)=>{
        setSelected(country)
        setShow(false)
        props.onChange(country)
    }
    return (
        <div>
            <div className="tfg-button" onClick={buttonClicked}>
                <img className={"tfg-button-flag"} src={require(`./data/${selected.code.toLowerCase()}.svg`).default} alt={"flag"}/>
                <span className={"tfg-button-symbol"}>{selected.code}</span>
                <span>|</span>
                <span className={"tfg-button-code"}>{selected.dial_code}</span>
            </div>

            <div id="my-tfg-modal" className={"tfg-modal"} style={{display:show?"block":"none"}} dir={props.modalDirection}>
                <div className={"tfg-modal-content"}>
                    {/*<span className={"tfg-modal-close"} onClick={()=>setShow(false)}>&times;</span>*/}

                    <div className={"tfg-modal-header"}>
                        <div className={"tfg-modal-header-input-place"}>
                            <img src={require("./search-icon.svg").default}
                                 className={"tfg-modal-header-search-icon"}
                                 alt={"search-icon"}/>
                            <input type="text"
                                   className={"tfg-modal-header-input"}
                                   placeholder={props.searchPlaceholder}
                                   value={searchKey}
                                   onChange={searchKeyChanged}/>
                        </div>
                    </div>

                    <div id={"my-tfg-modal-body"} className={"tfg-modal-body"}>
                        {filteredCountries.map((country,c)=>
                            <div className={"tfg-modal-body-item"} key={c} onClick={()=>countrySelected(country)}>
                                <img className={"tfg-modal-body-item-flag"} src={require(`./data/${country.code.toLowerCase()}.svg`).default} alt={"flag"}/>
                                <span className={"tfg-modal-body-item-name"}>{country.name}</span>
                                <span className={"tfg-modal-body-item-dial-code"}>{country.dial_code}</span>
                            </div>
                        )}

                    </div>

                </div>
            </div>

        </div>


    );
}

TFlagPicker.defaultProps = {
    searchPlaceholder: 'Search',
    defaultCountry:"IR",
    modalDirection:"ltr",
};

TFlagPicker.propTypes = {
    searchPlaceholder: PropTypes.string,
    defaultCountry:PropTypes.string,
    modalDirection:PropTypes.string,
    onChange:PropTypes.func
};

export default TFlagPicker;