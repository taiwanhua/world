import type {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  KeyboardEventHandler,
  CSSProperties,
} from "react";
import { forwardRef, memo, useCallback, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Stack from "@mui/material/Stack";
import type { CmdInputHistory } from "@/frontend/hooks/zustand/useCmdInputHistoryStore";

const emptyFunction = (): void => {
  // do nothing
};

export interface CmdInputReadonlyProps {
  command: CmdInputHistory;
  readonly: true;
  inputValue?: undefined;
  setInputValue?: undefined;
  onEnterKeyDown?: undefined;
}

export interface CmdInputEditableProps {
  command?: undefined;
  readonly?: false;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  onEnterKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export type CmdInputProps = CmdInputReadonlyProps | CmdInputEditableProps;

const CmdInputForwardRef = forwardRef<HTMLInputElement, CmdInputProps>(
  function CmdInput(
    {
      readonly = false,
      command,
      inputValue = "",
      setInputValue = emptyFunction,
      onEnterKeyDown = emptyFunction,
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

    const inputStyle = useMemo<CSSProperties>(
      () => ({
        border: "none",
        background: "transparent",
        outline: "none",
        display: "block",
        width: "100%",
        fontSize: "1rem",
      }),
      [],
    );

    return (
      <Box>
        <Typography color="#06b6d4" component="span">
          Arhua&apos;s world🌍🌎🌏
        </Typography>
        {" on branch "}
        <Typography color="#d946ef" component="span">
          {" main "}
        </Typography>
        is
        <Typography color="#f59e24" component="span">
          {" 📦 v1.0.1 "}
        </Typography>
        via
        <Typography color="#22c550" component="span">
          {" next@13.4.12 "}
        </Typography>
        <Stack direction="row" spacing={1}>
          <ArrowForwardIosIcon color="success" fontSize="small" />
          <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            readOnly={readonly}
            ref={ref}
            style={inputStyle}
            value={command ? command : inputValue}
          />
        </Stack>
      </Box>
    );
  },
);

export default memo(CmdInputForwardRef);
