import React, { useRef, useState, useEffect, forwardRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { KEY_CODE } from "./constants";

import style from "./styles.scss";

const VerificationInput = forwardRef(
  (
    {
      value,
      length,
      validChars,
      placeholder,
      autoFocus,
      removeDefaultStyles,
      debug,
      inputProps,
      classNames: classes,
      onChange,
      onFocus,
      onBlur,
      ...restProps
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState("");
    const [isActive, setActive] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
      if (autoFocus) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

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

      if (RegExp(`^[${validChars}]{0,${length}}$`).test(newInputVal)) {
        if (onChange) {
          onChange?.(newInputVal);
        } else {
          setLocalValue(newInputVal);
        }
      }
    };

    const getValue = () => {
      return value ?? localValue;
    };

    return (
      <div className="verification-input__wrapper">
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
          className={classNames("verification-input", {
            "verification-input--debug": debug,
          })}
          onKeyDown={handleKeyDown}
          onFocus={(e) => {
            setActive(true);
            const val = e.target.value;
            e.target.setSelectionRange(val.length, val.length);
            onFocus?.();
          }}
          onBlur={() => {
            setActive(false);
            onBlur?.();
          }}
          {...inputProps}
        />
        <div
          data-testid="container"
          className={classNames(
            "verification-input__container",
            classes.container,
            {
              "verification-input__container--default": !removeDefaultStyles,
            }
          )}
          onClick={() => inputRef.current.focus()}
          {...restProps}
        >
          {[...Array(length)].map((_, i) => (
            <div
              className={classNames(
                "verification-input__character",
                classes.character,
                {
                  "verification-input__character--default":
                    !removeDefaultStyles,
                  "verification-input__character--selected--default":
                    !removeDefaultStyles &&
                    (getValue().length === i ||
                      (getValue().length === i + 1 && length === i + 1)) &&
                    isActive,
                  [classes.characterSelected]:
                    (getValue().length === i ||
                      (getValue().length === i + 1 && length === i + 1)) &&
                    isActive,
                  "verification-input__character--inactive--default":
                    !removeDefaultStyles && getValue().length < i,
                  [classes.characterInactive]: getValue().length < i,
                }
              )}
              onClick={handleClick}
              id={`field-${i}`}
              data-testid={`character-${i}`}
              key={i}
            >
              {getValue()[i] || placeholder}
            </div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </div>
    );
  }
);

VerificationInput.displayName = "VerificationInput";

VerificationInput.propTypes = {
  value: PropTypes.string,
  length: PropTypes.number,
  validChars: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  removeDefaultStyles: PropTypes.bool,
  debug: PropTypes.bool,
  inputProps: PropTypes.object,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    character: PropTypes.string,
    characterInactive: PropTypes.string,
    characterSelected: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

VerificationInput.defaultProps = {
  length: 6,
  validChars: "A-Za-z0-9",
  placeholder: "·",
  autoFocus: false,
  removeDefaultStyles: false,
  debug: false,
  inputProps: {},
  classNames: {},
};

export default VerificationInput;
