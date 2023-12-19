import type { FC, KeyboardEventHandler, PropsWithChildren } from "react";
import {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  Fragment,
} from "react";
import Box from "@mui/material/Box";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";
import type { CmdInputHistory } from "@/frontend/hooks/zustand/useCmdInputHistoryStore";
import { useCmdInputHistoryStore } from "@/frontend/hooks/zustand/useCmdInputHistoryStore";
import CmdInput from "@/frontend/components/cmd/inputs/CmdInput";
import NotFound from "@/frontend/components/cmd/outputs/results/NotFound";
import { commandMapping } from "@/frontend/components/cmd/outputs/results/commandMapping";

export interface CmdInputHistoryProps {
  sx?: SX;
  initialCommand?: CmdInputHistory;
}

const timeout = 2000;

const CmdInputHistoryFC: FC<PropsWithChildren<CmdInputHistoryProps>> = ({
  sx,
  initialCommand,
}) => {
  const { cmdInputHistory, setCmdInputHistory, pushCmdInput } =
    useCmdInputHistoryStore();

  const boxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!initialCommand || cmdInputHistory.length > 0) {
      return;
    }

    if (count < initialCommand.length) {
      const timeoutFn = setTimeout(
        () => {
          setInputValue((preValue) => preValue + initialCommand[count]);
          setCount((prevCount) => prevCount + 1);
          if (count === initialCommand.length - 1) {
            setCmdInputHistory([initialCommand]);
            setInputValue("");
            inputRef.current?.focus();
          }
        },
        count === 0 ? timeout : 100,
      );

      return () => clearTimeout(timeoutFn);
    }
  }, [cmdInputHistory.length, count, initialCommand, setCmdInputHistory]);

  useEffect(() => {
    if (cmdInputHistory.length === 0) {
      return;
    }

    boxRef.current?.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [cmdInputHistory]);

  const onEnterKeyDown = useCallback<
    KeyboardEventHandler<HTMLInputElement>
  >(() => {
    pushCmdInput(inputValue);
  }, [inputValue, pushCmdInput]);

  const boxSx = useSX(
    () => [{ overflow: "auto", height: "100%", paddingBottom: 2 }, sx],
    [sx],
  );

  return (
    <Box ref={boxRef} sx={boxSx}>
      {cmdInputHistory.map(({ cmdInputHistory: command, key }) => (
        <Fragment key={key}>
          <CmdInput command={command} readonly />
          {commandMapping[command] ?? <NotFound command={command} />}
        </Fragment>
      ))}
      <CmdInput
        inputValue={inputValue}
        onEnterKeyDown={onEnterKeyDown}
        ref={inputRef}
        setInputValue={setInputValue}
      />
    </Box>
  );
};

export default memo(CmdInputHistoryFC);
