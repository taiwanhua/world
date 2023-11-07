import type {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  KeyboardEventHandler,
} from "react";
import { forwardRef, memo, useCallback } from "react";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Stack from "@mui/material/Stack";
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
      disabled,
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
          setInputValue("");
        }
      },
      [onEnterKeyDown, setInputValue],
    );

    return (
      <Box>
        <Stack direction="row" spacing={1}>
          <ArrowForwardIosIcon color="success" fontSize="small" />
          <TextField
            disabled={disabled}
            label="Multiline"
            maxRows={4}
            minRows={4}
            multiline
            onChange={onChange}
            onKeyDown={onKeyDown}
            ref={ref}
            value={inputValue}
          />
        </Stack>
      </Box>
    );
  },
);

export default memo(ChatInputForwardRef);
