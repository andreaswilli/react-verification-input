import React, { useRef, useState, useEffect, forwardRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { KEY_CODE } from "./constants";

import style from "./styles.scss";

const VerificationInput = forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const [isActive, setActive] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current.focus();
    }
  }, [props.autoFocus]);

  const handleClick = () => {
    inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (
      [
        KEY_CODE.ARROW_LEFT,
        KEY_CODE.ARROW_RIGHT,
        KEY_CODE.ARROW_UP,
        KEY_CODE.ARROW_DOWN,
      ].includes(event.keyCode)
    ) {
      // do not allow to change cursor position
      event.preventDefault();
    }
  };

  const handleInputChange = (event) => {
    const newInputVal = event.target.value.replace(/\s/g, "");

    if (
      RegExp(`^[${props.validChars}]{0,${props.length}}$`).test(newInputVal)
    ) {
      if (props?.input?.onChange) {
        props?.input?.onChange?.(newInputVal);
      } else {
        setValue(newInputVal);
      }
    }
  };

  const getValue = () => {
    return props.value ?? value;
  };

  const {
    length,
    removeDefaultStyles,
    debug,
    container,
    inputField,
    characters,
    character,
    input,
  } = props;

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
        value={getValue()}
        onChange={handleInputChange}
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={classNames("verification-input", inputClassName, {
          "verification-input--debug": debug,
        })}
        onKeyDown={handleKeyDown}
        onFocus={(e) => {
          setActive(true);
          const val = e.target.value;
          e.target.setSelectionRange(val.length, val.length);
          input?.onFocus?.();
        }}
        onBlur={() => {
          setActive(false);
          input?.onBlur?.();
        }}
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
        onClick={() => inputRef.current.focus()}
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
                  (getValue().length === i ||
                    (getValue().length === i + 1 && length === i + 1)) &&
                  isActive,
                [characterClassNameSelected]:
                  (getValue().length === i ||
                    (getValue().length === i + 1 && length === i + 1)) &&
                  isActive,
                "verification-input__character--inactive--default":
                  !removeDefaultStyles && getValue().length < i,
                [characterClassNameInactive]: getValue().length < i,
              }
            )}
            onClick={handleClick}
            id={`field-${i}`}
            data-testid={`character-${i}`}
            key={i}
            {...characterProps}
          >
            {getValue()[i] || props.placeholder}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: style }} />
    </div>
  );
});

VerificationInput.displayName = "VerificationInput";

VerificationInput.propTypes = {
  value: PropTypes.string,
  length: PropTypes.number,
  validChars: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  removeDefaultStyles: PropTypes.bool,
  debug: PropTypes.bool,
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
    classNameInactive: PropTypes.string,
    classNameSelected: PropTypes.string,
  }),
  input: PropTypes.shape({
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }),
};

VerificationInput.defaultProps = {
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
  input: null,
};

export default VerificationInput;
