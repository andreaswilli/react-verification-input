import React, { useRef, useState, useEffect, forwardRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import style from "./styles.css";

function Container({enable, children}) {
    if (enable) return (<div className="vi__wrapper">{children}</div>)
    return children
}

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
      wrapWithContainer,
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

        if (newInputVal.length === length) {
          onComplete?.(newInputVal);
        }
      }
    };

    const getValue = () => {
      return value ?? localValue;
    };

    const {
      className: inputClassName,
      type: inputType,
      ...restInputProps
    } = inputProps;
    const { className: containerClassName, ...restContainerProps } =
      containerProps;

    return (
      <Container enable={wrapWithContainer}>
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
              {passwordMode && getValue()[i]
                ? "*"
                : getValue()[i] || placeholder}
            </div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </Container>
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
  }),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onComplete: PropTypes.func,
  wrapWithContainer: PropTypes.bool,
};

VerificationInput.defaultProps = {
  length: 6,
  validChars: "A-Za-z0-9",
  placeholder: "·",
  autoFocus: false,
  inputProps: {},
  containerProps: {},
  classNames: {},
  wrapWithContainer: false,
};

Container.displayName = "Container";

Container.propTypes = {
  enable: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
}

Container.defaultProps = {
  enable: false,
}

export default VerificationInput;
