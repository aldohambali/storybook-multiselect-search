import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './select.css';

export const Select = ({ size, label, outlined, withSearch, multiple, ...props }) => {
  const isOutlined = outlined ? 'storybook-select--outlined' : 'storybook-select--no-outlined';
  const initialFruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango', 'Pineapple', 'Strawberry'];
  const [isVisible, setIsVisible] = useState(false);
  const [fruits, setFruits] = useState(initialFruits); 
  const [suggestions, setSuggestions] = useState(initialFruits);
  const [inputValue, setInputValue] = useState('');
  const [selectedFruits, setSelectedFruits] = useState([]); 
  const inputRef = useRef(null);

  const handleClick = () => {
    setIsVisible(!isVisible);
    setSuggestions(fruits)
  };

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);
  
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSuggestions(initialFruits)

    const filteredSuggestions = fruits.filter(fruit =>
      fruit.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelectFruit = (fruit) => {
    if(multiple){
      const updatedFruits = fruits.filter(f => f !== fruit);
      setFruits(updatedFruits);
      setSelectedFruits([...selectedFruits, fruit]);
    } else {
      setSelectedFruits([fruit]);
    }
    
    setSuggestions([]);
    setInputValue('');

    if (isVisible) { 
      setIsVisible(!isVisible);
    }
  };

  const handleRemoveSelectedFruit = (fruit) => {
    const updatedSelectedFruits = selectedFruits.filter(f => f !== fruit);
    setSelectedFruits(updatedSelectedFruits);

    setFruits([...fruits, fruit]);
  };

  const getHighlightedText = (text) => {
    if (!inputValue) return text;

    const parts = text.split(new RegExp(`(${inputValue})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === inputValue.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  return (

    <>
      <div className="select-container">
        <table>
          <tbody>
            <tr>
              <td>
                <label
                  className={[
                    "storybook-label storybook-select",
                    `storybook-select--${size}`,
                  ].join(" ")}
                >
                  {label}
                </label>
              </td>
              <td>
                <div
                  className={[
                    "inputSelectDiv",
                    `inputSelectDiv--${size}`,
                    isOutlined,
                  ].join(" ")}
                >
                  <div className="select__parent">
                    {multiple ? (
                      <>
                        {selectedFruits.map((fruit, index) => (
                          <div key={index} className="select__multi-value">
                            <div className="select__multi-value__label">{fruit}</div>
                            <div
                              role="button"
                              className="select__multi-value__remove"
                              aria-label="Remove Purple"
                              onClick={() => handleRemoveSelectedFruit(fruit)}
                            >
                              <svg
                                height="14"
                                width="14"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                              </svg>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {selectedFruits.map((fruit, index) => (
                          <div key={index} style={{ "paddingLeft": "10px",'cursor':'pointer'}} onClick={handleClick}>
                            {fruit}
                          </div>
                        ))}
                      </>
                    )}

                    <div
                      className="select__input-container"
                      data-value=""
                      onClick={handleClick}
                    >
                      <input
                        className="select__input closeInput"
                      />
                    </div>
                  </div>
                  <div className="select__indicators">
                    <span className="select__indicator-separator"></span>
                    <div
                      className="select__indicator select__dropdown-indicator"
                      aria-hidden="true"
                    >
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                        className="iconSelect"
                        onClick={handleClick}
                      >
                        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {isVisible && (
                  <div className={["suggestContainer", isOutlined].join(" ")}>
                    <div className="suggestDiv">
                      {withSearch && (
                        <>
                          <div style={{ padding: "5px" }}>
                            <div className="input-group">
                              <span className="input-icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  width="20"
                                  height="20"
                                  viewBox="0,0,255.99599,255.99599"
                                >
                                  <g
                                    fill="#b2b2b2"
                                    fillRule="nonzero"
                                    stroke="none"
                                    strokeWidth="1"
                                    strokeLinecap="butt"
                                    strokeLinejoin="miter"
                                    strokeMiterlimit="10"
                                    strokeDasharray=""
                                    strokeDashoffset="0"
                                    fontFamily="none"
                                    fontWeight="none"
                                    fontSize="none"
                                    textAnchor="none"
                                    style={{ mixBlendMode: "normal" }}
                                  >
                                    <g transform="scale(8.53333,8.53333)">
                                      <path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z"></path>
                                    </g>
                                  </g>
                                </svg>
                              </span>
                              <input
                                type="text"
                                ref={inputRef}
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Type to search fruits..."
                                className={[
                                  "inputSuggest",
                                  `inputSuggest--${size}`,
                                ].join(" ")}
                              />
                            </div>
                          </div>

                          <hr />
                        </>
                      )}

                      {suggestions.map((fruit, index) => (
                        <div
                          className={["listSuggest", `listSuggest--${size}`].join(
                            " "
                          )}
                          key={index}
                          onClick={() => handleSelectFruit(fruit)}
                        >
                          {getHighlightedText(fruit)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </td>
            </tr>
          </tbody>

        </table>
      </div>
    </>



  );
};

Select.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string,
  withSearch: PropTypes.bool,
  multiple: PropTypes.bool,
  outlined: PropTypes.bool,
  onClick: PropTypes.func,
};

Select.defaultProps = {
  size: 'medium',
  label: 'Label : ',
  withSearch: true,
  multiple: true,
  outlined: true,
  onClick: undefined,
};
