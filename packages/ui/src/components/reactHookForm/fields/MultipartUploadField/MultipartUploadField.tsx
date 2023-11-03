import {
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSX } from "@/client/hooks/theme/useSX";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import Dialog from "@/client/components/dialogs/Dialog";
import { useIsOpenDialog } from "@/client/hooks/components/dialogs/useIsOpenDialog";
import { AcceptType } from "@/client/constant/s3Upload";
import FileUploadGrid, {
  FileCardClick,
  FileCardDrop,
  Props as FileUploadGridProps,
} from "./FileUploadGrid";
import { lighten, darken, alpha } from "@mui/material/styles";
import { nonChangeHandle } from "@/client/utils/handle/nonChangeHandle";
import { Uploader } from "@/client/utils/s3/uploader";
import FilePreview from "./FilePreview";
import useDidMount from "@/client/hooks/lifecycle/useDidMount";
import { useController } from "react-hook-form";

export interface FileUploadInfo {
  name: string;
  uploader?: Uploader;
}

export type ValueFormatter<T> = (value: T) => FileUploadInfo[];
export type ValueParser<T> = (fileUploadInfos: FileUploadInfo[]) => T;
export type CardActionIndexRef = number | null;

export interface Helpers {
  cardActionIndexRef: CardActionIndexRef;
  isReplaceCardAction: boolean;
  fileUploadInfos: FileUploadInfo[];
  setFileUploadInfos: (nextFileUploadInfos: FileUploadInfo[]) => void;
  pushFileUploadInfo: (pushFileUploadInfo: FileUploadInfo) => void;
  replaceFileUploadInfo: (replaceFileUploadInfo: FileUploadInfo) => void;
}

export interface Props<T = FileUploadInfo>
  extends Omit<OutlinedInputProps, "name"> {
  name: string;
  /** if maxFilesCount === 0, means maxFilesCount is infinite */
  maxFilesCount: number;
  acceptTypes?: AcceptType[];
  // onInputChange: (files: FileList | null, helpers: Helpers) => Promise<void>;
  /** In */
  valueFormatter?: ValueFormatter<T>;
  /** Out */
  valueParser?: ValueParser<T>;
  canFileCardClickPreview?: boolean;
  canFileCardClickUpload?: boolean;
  canFileCardClickDelete?: boolean;
  canFileCardDrop?: boolean;
  canSelectFileCardClick?: boolean;
  canSelectFileCardDrop?: boolean;
  s3EndPoint: string;
  s3Bucket: string;
}

const thumbnailHeight = 100;

const MultipartUploadField = <T,>({
  className,
  sx,
  name,
  disabled,
  maxFilesCount,
  acceptTypes = ["*"], //["video/*", "image/*"],
  // onInputChange,
  valueFormatter = nonChangeHandle as ValueFormatter<T>,
  valueParser = nonChangeHandle as ValueParser<T>,
  canFileCardClickPreview = true,
  canFileCardClickUpload = true,
  canFileCardClickDelete = true,
  canFileCardDrop = true,
  canSelectFileCardClick = true,
  canSelectFileCardDrop = true,
  s3EndPoint,
  s3Bucket,
  ...other
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement | null>();
  const cardActionIndexRef = useRef<CardActionIndexRef>(null);
  const currentCardActionIndex = cardActionIndexRef.current;
  const isCardActionIndexTypeOfNumber = currentCardActionIndex !== null;
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name });

  const [fileUploadInfos, setFileUploadInfos] = useState<FileUploadInfo[]>([]);

  useDidMount(() => {
    setFileUploadInfos(valueFormatter(value) ?? []);
  });

  const setCardActionIndexRef = useCallback(
    (actionIndex: CardActionIndexRef) => {
      cardActionIndexRef.current = actionIndex;
    },
    [],
  );

  const inputMinHeight = useMemo(() => {
    const fileCardHeight = thumbnailHeight + 66;
    const filesCount = fileUploadInfos.length;
    const isMultiple = maxFilesCount !== 1;

    if (isMultiple) {
      const filesAndSelectFileCardCount =
        maxFilesCount === filesCount
          ? maxFilesCount === 0
            ? 1
            : maxFilesCount
          : fileUploadInfos.length + 1;

      return Math.ceil(filesAndSelectFileCardCount / 2) * fileCardHeight;
    }

    const singleFileAndSelectFileCardCount =
      maxFilesCount < fileUploadInfos.length
        ? fileUploadInfos.length
        : maxFilesCount;
    return singleFileAndSelectFileCardCount * fileCardHeight;
  }, [maxFilesCount, fileUploadInfos.length]);

  const acceptTypesJoinString = useMemo(
    () => acceptTypes.join(","),
    [acceptTypes],
  );

  const changeHandler = useCallback(
    async ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      if (!files?.[0]) {
        return;
      }
      const fileName = files[0].name;

      if (fileUploadInfos.find(({ name }) => name === fileName)) {
        alert(
          "The Current selected file has a duplicate name with the already selected file",
        );
        return;
      }
      const isMultiple = maxFilesCount !== 1;

      const options = {
        fileName: files[0].name,
        file: files[0],
      };

      const uploader = new Uploader(options);
      uploader.onAbort(() => {
        let nextValue: FileUploadInfo[] = [];
        setFileUploadInfos((fileUploadInfos) => {
          nextValue = fileUploadInfos.filter(
            (fileUploadInfo, filterIndex) =>
              cardActionIndexRef.current !== filterIndex,
          );

          return nextValue;
        });

        onChange({ target: { value: valueParser(nextValue) } });

        setCardActionIndexRef(null);
      });

      uploader.onSuccess(() => {
        let nextValue: FileUploadInfo[] = [];
        setFileUploadInfos((fileUploadInfos) => {
          nextValue = fileUploadInfos.map((fileUploadInfo, filterIndex) => {
            if (cardActionIndexRef.current === filterIndex) {
              fileUploadInfo.uploader = undefined;
            }
            return fileUploadInfo;
          });

          onChange({ target: { value: valueParser(nextValue) } });

          return nextValue;
        });
        setCardActionIndexRef(null);
      });
      setFileUploadInfos((fileUploadInfos) => [
        ...(isMultiple ? fileUploadInfos : []),
        {
          name: options.fileName,
          uploader,
        },
      ]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [
      fileUploadInfos,
      maxFilesCount,
      setCardActionIndexRef,
      onChange,
      valueParser,
    ],
  );

  const removeHandler = useCallback(
    (deleteIndex: number) => {
      const nextValue = valueParser(
        fileUploadInfos.filter(
          (fileUploadInfo, filterIndex) => deleteIndex !== filterIndex,
        ),
      );

      onChange({ target: { value: nextValue } });
    },
    [fileUploadInfos, onChange, valueParser],
  );

  const selectFileHandler = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [changeHandler],
  );
  const isDroppable = canDrop && !disabled;

  const { isDialogOpen, handleDialogOpen, handleDialogClose } =
    useIsOpenDialog();

  const onDialogClose = () => {
    handleDialogClose(() => {
      cardActionIndexRef.current = null;
    });
  };

  const DialogContent = useMemo(() => {
    if (!isCardActionIndexTypeOfNumber) {
      return null;
    }
    const { name } = fileUploadInfos[currentCardActionIndex];
    const url = `${s3EndPoint}/${s3Bucket}/temp/${name}`;

    return (
      <Card>
        <FilePreview name={name} url={url} />
      </Card>
    );
  }, [
    isCardActionIndexTypeOfNumber,
    fileUploadInfos,
    currentCardActionIndex,
    s3EndPoint,
    s3Bucket,
  ]);

  const onFileCardClickAction = useCallback<FileCardClick>(
    (event, index) => {
      setCardActionIndexRef(index);
    },
    [setCardActionIndexRef],
  );

  const onFileCardClickPreview = useCallback<FileCardClick>(
    (event, index) => {
      setCardActionIndexRef(index);
      handleDialogOpen();
    },
    [handleDialogOpen, setCardActionIndexRef],
  );

  const onFileCardClickUpload = useCallback<FileCardClick>(
    (event, index) => {
      setCardActionIndexRef(index);
      selectFileHandler();
    },
    [selectFileHandler, setCardActionIndexRef],
  );

  // TODO: if need delete, there should fix
  const onFileCardClickDelete = useCallback<FileCardClick>(
    (event, index) => {
      removeHandler(index);
    },
    [removeHandler],
  );

  // TODO: if need replace, there should fix
  const onFileCardDrop = useCallback<FileCardDrop>(
    (item, index) => {
      setCardActionIndexRef(index);
      changeHandler({
        target: { files: item.files },
      } as ChangeEvent<HTMLInputElement>);
    },
    [changeHandler, setCardActionIndexRef],
  );

  const onSelectFileCardClick = useCallback(() => {
    selectFileHandler();
  }, [selectFileHandler]);

  const onSelectFileCardDrop = useCallback<
    NonNullable<FileUploadGridProps["onSelectFileCardDrop"]>
  >(
    (item) => {
      changeHandler({
        target: { files: item.files },
      } as ChangeEvent<HTMLInputElement>);
    },
    [changeHandler],
  );

  const inputSx = useSX(
    () => ({
      opacity: 0,
      minHeight: inputMinHeight,
      "&.Mui-disabled": {
        opacity: 0,
      },
    }),
    [inputMinHeight],
  );

  const canDropBackdrop = useSX(
    () => ({
      width: "100vw",
      height: "100vh",
      backgroundColor: (theme) =>
        isDroppable
          ? alpha(darken(theme.palette.background.default, 1), 0.5)
          : "transparent",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: (theme) => theme.zIndex.drawer + 2,
      pointerEvents: "none",
    }),
    [isDroppable],
  );

  const isDroppableInputSx = useSX(
    () => ({
      backgroundColor: (theme) =>
        theme.palette.mode === "dark"
          ? lighten(theme.palette.background.default, 0.15)
          : darken(theme.palette.background.default, 0.15),
    }),
    [],
  );

  const buttonSx = useSX(() => [{ margin: 1 }, sx], [sx]);

  return (
    <>
      <Box sx={canDropBackdrop} ref={drop} />
      <FormControl
        className={className}
        sx={sx}
        error={Boolean(error?.message)}
      >
        <InputLabel shrink>{other.label}</InputLabel>
        <OutlinedInput
          ref={ref}
          type="file"
          inputProps={{
            sx: inputSx,
            accept: acceptTypesJoinString,
          }}
          notched
          disabled={disabled}
          {...other}
          sx={isDroppable ? isDroppableInputSx : undefined}
          onChange={changeHandler}
          onBlur={onBlur}
          inputRef={inputRef}
        />
        <FormHelperText>{error?.message}</FormHelperText>
        <FileUploadGrid
          disabled={disabled}
          fileUploadInfos={fileUploadInfos}
          s3EndPoint={s3EndPoint}
          s3Bucket={s3Bucket}
          maxFilesCount={maxFilesCount}
          thumbnailHeight={thumbnailHeight}
          onFileCardClickAction={onFileCardClickAction}
          onFileCardClickPreview={
            canFileCardClickPreview ? onFileCardClickPreview : undefined
          }
          onFileCardClickUpload={
            canFileCardClickUpload ? onFileCardClickUpload : undefined
          }
          onFileCardClickDelete={
            canFileCardClickDelete ? onFileCardClickDelete : undefined
          }
          onFileCardDrop={canFileCardDrop ? onFileCardDrop : undefined}
          onSelectFileCardClick={
            canSelectFileCardClick ? onSelectFileCardClick : undefined
          }
          onSelectFileCardDrop={
            canSelectFileCardDrop ? onSelectFileCardDrop : undefined
          }
        />
      </FormControl>

      <Dialog
        open={isDialogOpen}
        title="Preview"
        content={DialogContent}
        actionsComponent={
          <Button sx={buttonSx} onClick={onDialogClose}>
            Close
          </Button>
        }
        onClose={onDialogClose}
      />
    </>
  );
};

export default memo(MultipartUploadField);
