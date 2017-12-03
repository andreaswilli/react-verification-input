import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'proptypes';

import { KEY_CODE } from './constants';

import './styles.scss';

export default class VerificationInput extends PureComponent {

  static propTypes = {
    length: PropTypes.number.isRequired,
    validChars: PropTypes.string,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    validChars: 'A-Za-z0-9',
    placeholder: '·',
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      tan: '',
      previousTan: '',
      isActive: false,
      isValidTan: false,
    };
  }

  setSelection(index) {
    if (index > this.props.length - 1) {
      index = this.props.length - 1;
    } else if (index < 0) {
      index = 0;
    }
    this.input.setSelectionRange(index, index + 1);
    this.setState({ selectedIndex: index });
  }

  // positive offset = move to the right
  // negative offset = move to the left
  moveSelectionBy(offset) {
    this.setSelection(this.state.selectedIndex + offset);
  }

  handleChange(tan, selectedIndex) {
    const previousTan = this.state.tan;
    if (!RegExp(`^[${this.props.validChars}${this.props.placeholder}]{0,${this.props.length}}$`).test(tan) && (tan.indexOf(' ') === -1 || !RegExp(`^$[${this.props.validChars}]{${this.props.length}}$`).test(tan.replace(/\s/g, '')))) {
      this.input.value = previousTan;
      this.moveSelectionBy(0); // set to where it was before
      return;
    }
    tan = tan.replace(/ /g, '');
    this.input.value = tan;
    this.setSelection(selectedIndex);
    this.setState({
      tan,
      previousTan,
      isValidTan: RegExp(`^[${this.props.validChars}]{${this.props.length}}$`).test(tan),
    });
  }

  handleKeyUp(event) {
    const { keyCode } = event;

    if (keyCode === KEY_CODE.ARROW_LEFT) {
      this.moveSelectionBy(-1);
      return;
    }

    if (keyCode === KEY_CODE.ARROW_RIGHT) {
      if (this.state.selectedIndex >= this.state.tan.length) {
        // don't move selection to disabled fields
        this.moveSelectionBy(0);
        return;
      }
      this.moveSelectionBy(1);
      return;
    }

    let selectedIndex = this.input.selectionStart;
    let tan = this.input.value;
    // if value not changed (and no arrow key pressed)
    if (tan === this.state.tan) {
      // if selection did not change
      if (selectedIndex === this.state.selectedIndex && selectedIndex + 1 === this.input.selectionEnd) {
        // ignore event
        return;
      }

      this.setSelection(selectedIndex);
      return;
    }

    if (keyCode === KEY_CODE.BACKSPACE) {
      selectedIndex = this.state.selectedIndex;
      // if selection is not last character
      if (selectedIndex < this.state.tan.length - 1) {
        // if selection is empty
        if (this.state.tan[selectedIndex] === this.props.placeholder) {
          // move selection to the left
          selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : selectedIndex;
        }
        // delete character (replace with placeholder)
        tan = `${this.state.tan.substring(0, selectedIndex)}${this.props.placeholder}${this.state.tan.substring(selectedIndex + 1)}`;
        this.handleChange(tan, selectedIndex);
        return;
      }
      // delete last character and move selection there
      tan = this.state.tan.substr(0, this.state.tan.length - 1);
      this.handleChange(tan, tan.length);
      return;
    }

    if (keyCode === KEY_CODE.DELETE) {
      selectedIndex = this.state.selectedIndex;
      // if selection is to the right of last character
      if (selectedIndex > this.state.tan.length - 1) {
        // nothing to delete on the right side of the selection -> ignore event
        return;
      }
      // if selection is on last character
      if (selectedIndex === this.state.tan.length - 1) {
        // delete last character and leave selection where it is
        this.handleChange(this.state.tan.substr(0, this.state.tan.length - 1), this.state.selectedIndex);
        return;
      }
      // selection is to the left of last character
      // if selection is empty
      if (this.state.tan[selectedIndex] === this.props.placeholder) {
        // move selection to the right
        selectedIndex = selectedIndex < this.props.length ? selectedIndex + 1 : selectedIndex;
      }
      // delete character (replace with placeholder if not last character)
      tan = `${this.state.tan.substring(0, selectedIndex)}${
        this.state.tan.substring(selectedIndex + 1) ? `${this.props.placeholder}${this.state.tan.substring(selectedIndex + 1)}` : ''
        }`;
      this.handleChange(tan, selectedIndex);
      return;
    }

    // some character key (valid or invalid) was pressed
    this.handleChange(tan, selectedIndex);
  }

  handleClick(event) {
    let index = parseInt(event.target.id.replace('field-', ''));
    if (index > this.input.value.length) {
      index = this.input.value.length;
    }
    this.setState({
      selectedIndex: index
    });
    this.input.focus();
    this.input.setSelectionRange(index, index + 1);
  }

  handlePaste() {
    // only clear input here b/c I wasn't able to receive the pasted content from the event in IE 11 (probably older versions as well)
    // the pasted content is taken directly from input.value and state is updated onKeyUp (paste via context menu not supported)
    this.input.focus();
    this.input.value = '';
  }

  render() {
    return (
      <div className="verification-input__container">
        <input
          ref={(input) => this.input = input}
          type="tel" // TODO: make configurable
          className="verification-input"
          onKeyUp={this.handleKeyUp.bind(this)}
          onFocus={() => this.setState({ isActive: true })}
          onBlur={() => this.setState({ isActive: false })}
          onPaste={this.handlePaste.bind(this)}
        />
        <div
          className="verification-input__characters"
          onClick={() => this.input.focus()}
        >
          {[...Array(this.props.length)].map((_, i) => (
            <div
              className={classNames('verification-input__character', {
                'verification-input__character--selected': this.state.selectedIndex === i && this.state.isActive,
                'verification-input__character--inactive': this.state.tan.length < i,
              })}
              onClick={this.handleClick.bind(this)}
              id={`field-${i}`}
              key={i}
              onPaste={this.handlePaste.bind(this)}
            >{this.state.tan[i] || this.props.placeholder}</div>
          ))}
        </div>
      </div>
    );
  }
}