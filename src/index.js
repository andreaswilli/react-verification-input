import React, { PureComponent } from "react";
import classNames from "classnames";
import PropTypes from "proptypes";

import { KEY_CODE } from "./constants";

import style from "./styles.scss";

export default class VerificationInput extends PureComponent {
  static propTypes = {
    length: PropTypes.number,
    validChars: PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    removeDefaultStyles: PropTypes.bool,
    debug: PropTypes.bool,
    getInputRef: PropTypes.func,
    container: PropTypes.shape({
      className: PropTypes.string,
    }),
    inputField: PropTypes.shape({
      className: PropTypes.string,
    }),
    characters: PropTypes.shape({
      className: PropTypes.string,
    }),
    character: PropTypes.shape({
      className: PropTypes.string,
    }),
  };

  static defaultProps = {
    length: 6,
    validChars: "A-Za-z0-9",
    placeholder: "·",
    autoFocus: false,
    removeDefaultStyles: false,
    debug: false,
    container: {},
    inputField: {},
    characters: {},
    character: {},
    getInputRef: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      tan: "",
      previousTan: "",
      isActive: false,
      isValidTan: false,
    };

    if (this.props.autoFocus) {
      setTimeout(() => this.input.focus(), 0);
    }
  }

  getPlaceholder() {
    return this.props.placeholder.trim() === ""
      ? "\xa0"
      : this.props.placeholder; // \xa0 = non-breaking space
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

  saveInputRef = (ref) => {
    this.input = ref;
    this.props.getInputRef(ref);
  };

  handleChange(tan, selectedIndex) {
    const previousTan = this.state.tan;
    if (
      !RegExp(
        `^[${this.props.validChars}${this.getPlaceholder()}]{0,${
          this.props.length
        }}$`
      ).test(tan) &&
      (tan.indexOf(" ") === -1 ||
        !RegExp(`^[${this.props.validChars}]{${this.props.length}}$`).test(
          tan.replace(/ /g, "")
        ))
    ) {
      this.input.value = previousTan;
      this.moveSelectionBy(0); // set to where it was before
      return;
    }
    tan = tan.replace(/ /g, "");
    this.input.value = tan;
    this.setSelection(selectedIndex);
    this.setState({
      tan,
      previousTan,
      isValidTan: RegExp(
        `^[${this.props.validChars}]{${this.props.length}}$`
      ).test(tan),
    });
    if (this.props.input && this.props.input.onChange) {
      this.props.input.onChange(tan);
    }
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
      if (event.key === "Tab") {
        this.setSelection(tan.length);
      }
      return;
    }

    if (keyCode === KEY_CODE.BACKSPACE) {
      selectedIndex = this.state.selectedIndex;
      // if selection is not last character
      if (selectedIndex < this.state.tan.length - 1) {
        // if selection is empty
        if (this.state.tan[selectedIndex] === this.getPlaceholder()) {
          // move selection to the left
          selectedIndex = Math.max(selectedIndex - 1, 0);
        }
        // delete character (replace with placeholder)
        tan = `${this.state.tan.substring(
          0,
          selectedIndex
        )}${this.getPlaceholder()}${this.state.tan.substring(
          selectedIndex + 1
        )}`;
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
      // if selection is on last character
      if (selectedIndex === this.state.tan.length - 1) {
        // delete last character and leave selection where it is
        this.handleChange(
          this.state.tan.substr(0, this.state.tan.length - 1),
          this.state.selectedIndex
        );
        return;
      }
      // selection is to the left of last character
      // if selection is empty
      if (this.state.tan[selectedIndex] === this.getPlaceholder()) {
        // move selection to the right
        selectedIndex =
          selectedIndex < this.props.length ? selectedIndex + 1 : selectedIndex;
      }
      // delete character (replace with placeholder if not last character)
      tan = `${this.state.tan.substring(0, selectedIndex)}${
        this.state.tan.substring(selectedIndex + 1)
          ? `${this.getPlaceholder()}${this.state.tan.substring(
              selectedIndex + 1
            )}`
          : ""
      }`;
      this.handleChange(tan, selectedIndex);
      return;
    }

    // some character key (valid or invalid) was pressed
    this.handleChange(tan, selectedIndex);
  }

  handleClick(event) {
    let index = parseInt(event.target.id.replace("field-", ""));
    if (index > this.input.value.length) {
      index = this.input.value.length;
    }
    this.setState({
      selectedIndex: index,
    });
    this.input.focus();
    this.input.setSelectionRange(index, index + 1);
  }

  handlePaste(event) {
    const pastedData = event.clipboardData || window.clipboardData;
    const pastedText = pastedData?.getData("Text");

    // this will only work for environments that properly support
    // the clipboard api
    if (pastedText != null) {
      event.preventDefault();
      this.handleChange(pastedText, pastedText.length);
    }
  }

  render() {
    const {
      length,
      removeDefaultStyles,
      debug,
      container,
      inputField,
      characters,
      character,
      input,
      meta,
    } = this.props;

    const { className: containerClassName, ...containerProps } = container;

    const { className: inputClassName, ...inputProps } = inputField;

    const { className: charactersClassName, ...charactersProps } = characters;

    const {
      className: characterClassName,
      classNameInactive: characterClassNameInactive,
      classNameSelected: characterClassNameSelected,
      ...characterProps
    } = character;

    return (
      <div
        className={classNames(
          "verification-input__container",
          containerClassName,
          {
            "verification-input__container--default": !removeDefaultStyles,
          }
        )}
        {...containerProps}
      >
        <input
          ref={this.saveInputRef}
          className={classNames("verification-input", inputClassName, {
            "verification-input--debug": debug,
          })}
          value={this.props.tan}
          onKeyUp={this.handleKeyUp.bind(this)}
          onFocus={() => {
            this.setState({ isActive: true });
            if (input && input.onFocus) {
              input.onFocus();
            }
          }}
          onBlur={() => {
            this.setState({ isActive: false });
            if (input && input.onBlur) {
              input.onBlur();
            }
          }}
          onPaste={this.handlePaste.bind(this)}
          {...inputProps}
        />
        <div
          data-testid="characters"
          className={classNames(
            "verification-input__characters",
            charactersClassName,
            {
              "verification-input__characters--default": !removeDefaultStyles,
            }
          )}
          onClick={() => this.input.focus()}
          {...charactersProps}
        >
          {[...Array(length)].map((_, i) => (
            <div
              className={classNames(
                "verification-input__character",
                characterClassName,
                {
                  "verification-input__character--default": !removeDefaultStyles,
                  "verification-input__character--selected--default":
                    !removeDefaultStyles &&
                    this.state.selectedIndex === i &&
                    this.state.isActive,
                  [characterClassNameSelected]:
                    this.state.selectedIndex === i && this.state.isActive,
                  "verification-input__character--inactive--default":
                    !removeDefaultStyles && this.state.tan.length < i,
                  [characterClassNameInactive]: this.state.tan.length < i,
                }
              )}
              onClick={this.handleClick.bind(this)}
              id={`field-${i}`}
              data-testid={`character-${i}`}
              key={i}
              onPaste={this.handlePaste.bind(this)}
              {...characterProps}
            >
              {this.state.tan[i] || this.getPlaceholder()}
            </div>
          ))}
        </div>
        {meta && meta.touched && meta.error && (
          <div className="verification-input__error">{meta.error}</div>
        )}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </div>
    );
  }
}
