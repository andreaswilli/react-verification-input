import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VerificationInput from "./index";

const paste = (element, text) => {
  // DataTransfer is not supported in jsdom: https://github.com/jsdom/jsdom/issues/1568
  // userEvent.paste will not work in this case
  const pasteEvent = new Event("paste", { bubbles: true, cancelable: true });
  pasteEvent.clipboardData = { getData: () => text };
  element.dispatchEvent(pasteEvent);
};

describe("VerificationInput", () => {
  it("should render 6 empty fields with placeholder", () => {
    render(<VerificationInput />);

    expect(screen.getByTestId("characters")).toHaveTextContent(/^······$/);
  });

  it("should change the number of fields", () => {
    render(<VerificationInput length={4} />);

    expect(screen.getByTestId("characters")).toHaveTextContent(/^····$/);
  });

  it("should change the placeholder", () => {
    render(<VerificationInput placeholder="_" />);

    expect(screen.getByTestId("characters")).toHaveTextContent(/^______$/);
  });

  it("should allow digits as well as upper- and lowercase letters", () => {
    render(<VerificationInput />);

    userEvent.type(screen.getByRole("textbox"), "0aA1bB");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^0aA1bB$/);
  });

  it("should not allow special characters", () => {
    render(<VerificationInput />);

    userEvent.type(screen.getByRole("textbox"), "abc$+!?def");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^abcdef$/);
  });

  it("should only allow digits", () => {
    render(<VerificationInput validChars="0-9" />);

    userEvent.type(screen.getByRole("textbox"), "0a1B2$3?4*5_");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^012345$/);
  });

  // TODO: prevent user from entering the placeholder character
  xit("should not allow placeholder character", () => {
    render(<VerificationInput />);

    userEvent.type(screen.getByRole("textbox"), "·0·1·2");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^012···$/);
  });

  it("should insert valid code on paste", () => {
    render(<VerificationInput />);

    paste(screen.getByRole("textbox"), "012345");

    expect(screen.getByTestId("characters")).toHaveTextContent("012345");
  });

  it("should keep previous value if invalid code is pasted", () => {
    render(<VerificationInput />);
    userEvent.type(screen.getByRole("textbox"), "012345");

    paste(screen.getByRole("textbox"), "abcdefg");

    expect(screen.getByTestId("characters")).toHaveTextContent("012345");
  });

  it("should auto focus the input if specified", async () => {
    render(<VerificationInput autoFocus />);

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toHaveFocus();
    });
  });

  it("should focus the clicked field", () => {
    render(<VerificationInput />);
    userEvent.type(screen.getByRole("textbox"), "012345");
    const field = screen.getByText("3");

    userEvent.click(field);

    expect(field).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should select the rightmost active field", () => {
    render(<VerificationInput />);
    userEvent.type(screen.getByRole("textbox"), "01");
    const rightmostActiveField = screen.getByTestId("character-2");
    const inactiveField = screen.getByTestId("character-3");

    userEvent.click(inactiveField);

    expect(rightmostActiveField).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should select the first field if empty", () => {
    render(<VerificationInput />);
    const rightmostField = screen.getByTestId("character-0");

    userEvent.click(screen.getByTestId("characters"));

    expect(rightmostField).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should select the next field", () => {
    render(<VerificationInput />);
    const nextField = screen.getByTestId("character-3");

    userEvent.type(screen.getByRole("textbox"), "012");

    expect(nextField).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should select the last field if full", () => {
    render(<VerificationInput />);
    const lastField = screen.getByTestId("character-5");

    userEvent.type(screen.getByRole("textbox"), "012345");

    expect(lastField).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should only activate one empty field to the right", () => {
    render(<VerificationInput />);

    userEvent.type(screen.getByRole("textbox"), "012");

    const emptyFields = screen.getAllByText("·");
    expect(emptyFields[0]).not.toHaveClass(
      "verification-input__character--inactive--default"
    );
    expect(emptyFields[1]).toHaveClass(
      "verification-input__character--inactive--default"
    );
    expect(emptyFields[2]).toHaveClass(
      "verification-input__character--inactive--default"
    );
  });

  it("should delete characters to the left (backspace)", () => {
    render(<VerificationInput />);
    userEvent.type(screen.getByRole("textbox"), "012345");

    userEvent.type(screen.getByRole("textbox"), "{backspace}");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^01234·$/);

    userEvent.type(screen.getByRole("textbox"), "{backspace}");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^0123··$/);

    const field1 = screen.getByText("1");
    userEvent.click(field1);
    userEvent.type(screen.getByRole("textbox"), "{backspace}");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^0·23··$/);
    expect(field1).toHaveClass(
      "verification-input__character--selected--default"
    );

    userEvent.type(screen.getByRole("textbox"), "{backspace}");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^··23··$/);
    expect(screen.getByTestId("character-0")).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should delete characters to the right (del)", () => {
    render(<VerificationInput />);
    userEvent.type(screen.getByRole("textbox"), "0123");
    userEvent.click(screen.getByTestId("character-0"));

    userEvent.type(screen.getByRole("textbox"), "{del}");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^·123··$/);

    userEvent.type(screen.getByRole("textbox"), "{del}");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^··23··$/);

    const field3 = screen.getByTestId("character-3");
    userEvent.click(field3);
    userEvent.type(screen.getByRole("textbox"), "{del}");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^··2···$/);
    expect(field3).toHaveClass(
      "verification-input__character--selected--default"
    );

    userEvent.type(screen.getByRole("textbox"), "{del}");

    expect(screen.getByTestId("characters")).toHaveTextContent(/^··2···$/);
    expect(field3).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should move the selection with arrow keys", () => {
    render(<VerificationInput />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "012345");

    fireEvent.keyUp(input, {
      key: "ArrowLeft",
      code: "ArrowLeft",
      keyCode: 37,
    });

    expect(screen.getByText("4")).toHaveClass(
      "verification-input__character--selected--default"
    );

    fireEvent.keyUp(input, {
      key: "ArrowRight",
      code: "ArrowRight",
      keyCode: 39,
    });

    expect(screen.getByText("5")).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should not move the selection out of bounds", () => {
    render(<VerificationInput />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "012345");

    fireEvent.keyUp(input, {
      key: "ArrowRight",
      code: "ArrowRight",
      keyCode: 39,
    });

    expect(screen.getByText("5")).toHaveClass(
      "verification-input__character--selected--default"
    );

    userEvent.click(screen.getByText("0"));
    fireEvent.keyUp(input, {
      key: "ArrowLeft",
      code: "ArrowLeft",
      keyCode: 37,
    });

    expect(screen.getByText("0")).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should not move the selection to an inactive field", () => {
    render(<VerificationInput />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "012");

    fireEvent.keyUp(input, {
      key: "ArrowRight",
      code: "ArrowRight",
      keyCode: 39,
    });

    expect(screen.getByTestId("character-3")).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should select the first empty field when focused by tab key", () => {
    render(
      <>
        <button>other element</button>
        <VerificationInput />
      </>
    );
    userEvent.type(screen.getByRole("textbox"), "012");

    const otherElement = screen.getByText("other element");
    userEvent.click(otherElement);
    userEvent.tab(otherElement);

    expect(screen.getByTestId("character-3")).toHaveClass(
      "verification-input__character--selected--default"
    );

    userEvent.type(screen.getByRole("textbox"), "345");
    userEvent.click(otherElement);
    userEvent.tab(otherElement);

    expect(screen.getByText("5")).toHaveClass(
      "verification-input__character--selected--default"
    );
  });

  it("should trigger onChange callback", () => {
    const spyHandleChange = jest.fn();
    render(<VerificationInput input={{ onChange: spyHandleChange }} />);

    userEvent.type(screen.getByRole("textbox"), "01");

    expect(spyHandleChange).toHaveBeenCalledTimes(2);
    expect(spyHandleChange).toHaveBeenCalledWith("0");
    expect(spyHandleChange).toHaveBeenCalledWith("01");
  });

  it("should ignore irrelevant keyboard events", () => {
    const spyHandleChange = jest.fn();
    render(<VerificationInput input={{ onChange: spyHandleChange }} />);

    userEvent.type(screen.getByRole("textbox"), "012");
    spyHandleChange.mockClear();

    userEvent.type(screen.getByRole("textbox"), "{ctrl}");

    expect(spyHandleChange).not.toHaveBeenCalled();
  });

  it("should trigger onFocus and onBlur callbacks", () => {
    const spyHandleFocus = jest.fn();
    const spyHandleBlur = jest.fn();
    render(
      <>
        <VerificationInput
          input={{ onFocus: spyHandleFocus, onBlur: spyHandleBlur }}
        />
        <div>other element</div>
      </>
    );

    userEvent.click(screen.getByTestId("characters"));
    userEvent.click(screen.getByText("other element"));

    expect(spyHandleFocus).toHaveBeenCalledTimes(1);
    expect(spyHandleBlur).toHaveBeenCalledTimes(1);
  });
});
