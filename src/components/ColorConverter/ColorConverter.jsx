import React, { useState } from 'react';
import classnames from 'classnames';

const ERROR_TEXT = 'Ошибка!';
const DEFAULT_STATE = {
  hexString: '',
  rgbString: '',
  componentBackgroundColor: '#ffffff',
};

export default function ColorConverter() {
  const [state, setState] = useState(DEFAULT_STATE);

  const FormStyle = {
    backgroundColor: state.componentBackgroundColor,
  }

  const rgbClass = classnames({
    'input': true,
    'error': state.rgbString === ERROR_TEXT,
  });

  function hex2Rgb(hexString) {
    const matches = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
    return matches ? `rgb(${matches.slice(1).map((value) => parseInt(value, 16)).join(', ')})` : matches;
  }

  const onInputChange = (event) => {
    if (event.target.value.length < 7) {
      setState((prev) =>
        ({ ...prev, hexString: event.target.value, rgbString: '', componentBackgroundColor: '#ffffff' }));
      return;
    }

    const rgbValue = hex2Rgb(event.target.value);

    if (rgbValue) {
      setState({
        hexString: event.target.value,
        rgbString: rgbValue,
        componentBackgroundColor: event.target.value,
      });
      return;
    }
    setState((prev) => ({ ...prev, rgbString: ERROR_TEXT, componentBackgroundColor: '#e74c3c' }));
  };

  return (
    <form className="form" style={FormStyle}>
      <input className="input" type="text" value={state.hexString} onChange={onInputChange} maxLength="7"
        placeholder="Введите hex-код цвета (с символом #)" />
      <input className={rgbClass} type="text" value={state.rgbString} readOnly="readonly" />
    </form>
  );
}
