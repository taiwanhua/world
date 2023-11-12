import type {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  KeyboardEventHandler,
} from "react";
import { forwardRef, memo, useCallback } from "react";
import Box from "@mui/material/Box";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";

const emptyFunction = (): void => {
  // do nothing
};

export interface ChatInputProps extends TextFieldProps<"outlined"> {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  onEnterKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const ChatInputForwardRef = forwardRef<HTMLInputElement, ChatInputProps>(
  function ChatInput(
    {
      inputValue = "",
      setInputValue = emptyFunction,
      onEnterKeyDown = emptyFunction,
      ...textFieldProps
    },
    ref,
  ) {
    const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        setInputValue(event.target.value);
      },
      [setInputValue],
    );

    const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
      (event) => {
        if (event.key === "Enter") {
          onEnterKeyDown(event);
        }
      },
      [onEnterKeyDown],
    );

    return (
      <Box>
        <TextField
          fullWidth
          label="免付費諮詢"
          maxRows={4}
          minRows={4}
          multiline
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={ref}
          value={inputValue}
          {...textFieldProps}
        />
      </Box>
    );
  },
);

export default memo(ChatInputForwardRef);
