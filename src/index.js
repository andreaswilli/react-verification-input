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
      passwordMode,
      inputProps,
      containerProps,
      classNames: classes,
      onChange,
      onFocus,
      onBlur,
      onComplete,
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

    useEffect(() => {
      if(inputProps.disabled) {
        setActive(false);
      }
    }, [inputProps.disabled])

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

        if (newInputVal.length === length) {
          onComplete?.(newInputVal);
        }
      }
    };

    const getValue = () => {
      return value ?? localValue;
    };

    const isCharacterSelected = (i) => {
      const value = getValue();
      return (
        (value.length === i || (value.length === i + 1 && length === i + 1)) &&
        isActive
      );
    };

    const isCharacterInactive = (i) => getValue().length < i;
    const isCharacterFilled = (i) => getValue().length > i;

    const {
      className: inputClassName,
      type: inputType,
      ...restInputProps
    } = inputProps;
    const { className: containerClassName, ...restContainerProps } =
      containerProps;

    return (
      <>
        <div
          data-testid="container"
          className={classNames(
            "vi__container",
            classes.container,
            containerClassName
          )}
          onClick={() => inputRef.current.focus()}
          {...restContainerProps}
        >
          <input
            aria-label="verification input"
            spellCheck={false}
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
            className={classNames("vi", inputClassName)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setActive(true);
              onFocus?.();
            }}
            onBlur={() => {
              setActive(false);
              onBlur?.();
            }}
            onSelect={(e) => {
              const val = e.target.value;
              e.target.setSelectionRange(val.length, val.length);
            }}
            type={passwordMode ? "password" : inputType}
            {...restInputProps}
          />
          {[...Array(length)].map((_, i) => (
            <div
              className={classNames(
                "vi__character",
                classes.character,
                {
                  "vi__character--selected": isCharacterSelected(i),
                  "vi__character--inactive": isCharacterInactive(i),
                  "vi__character--filled": isCharacterFilled(i),
                },
                isCharacterSelected(i) && classes.characterSelected,
                isCharacterInactive(i) && classes.characterInactive,
                isCharacterFilled(i) && classes.characterFilled
              )}
              onClick={handleClick}
              id={`field-${i}`}
              data-testid={`character-${i}`}
              key={i}
            >
              {passwordMode && getValue()[i]
                ? "*"
                : getValue()[i] || placeholder}
            </div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
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
  passwordMode: PropTypes.bool,
  inputProps: PropTypes.object,
  containerProps: PropTypes.object,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    character: PropTypes.string,
    characterInactive: PropTypes.string,
    characterSelected: PropTypes.string,
    characterFilled: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onComplete: PropTypes.func,
};

VerificationInput.defaultProps = {
  length: 6,
  validChars: "A-Za-z0-9",
  placeholder: "·",
  autoFocus: false,
  inputProps: {},
  containerProps: {},
  classNames: {},
};

export default VerificationInput;
