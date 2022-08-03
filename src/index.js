import React, { useRef, useState, useEffect, forwardRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import style from "./styles.css";

const VerificationInput = forwardRef(
  (
    {
      value,
      length,
      validChars,
      placeholder,
      autoFocus,
      debug,
      inputProps,
      containerProps,
      classNames: classes,
      onChange,
      onFocus,
      onBlur,
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
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
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
        }
        setLocalValue(newInputVal);
      }
    };

    const getValue = () => {
      return value ?? localValue;
    };

    return (
      <div className="vi__wrapper">
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
          className={classNames("vi", {
            "vi--debug": debug,
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
          className={classNames("vi__container", classes.container)}
          onClick={() => inputRef.current.focus()}
          {...containerProps}
        >
          {[...Array(length)].map((_, i) => (
            <div
              className={classNames("vi__character", classes.character, {
                "vi__character--selected":
                  (getValue().length === i ||
                    (getValue().length === i + 1 && length === i + 1)) &&
                  isActive,
                [classes.characterSelected]:
                  (getValue().length === i ||
                    (getValue().length === i + 1 && length === i + 1)) &&
                  isActive,
                "vi__character--inactive": getValue().length < i,
                [classes.characterInactive]: getValue().length < i,
              })}
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
  debug: PropTypes.bool,
  inputProps: PropTypes.object,
  containerProps: PropTypes.object,
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
  debug: false,
  inputProps: {},
  containerProps: {},
  classNames: {},
};

export default VerificationInput;
