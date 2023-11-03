import {
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  Fragment,
} from "react";
import { useSX } from "@/client/hooks/theme/useSX";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
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
import { ResizeImageUploader } from "@/client/utils/s3/resizeImageUploader";
import FilePreview from "./FilePreview";
import useDidMount from "@/client/hooks/lifecycle/useDidMount";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "@/client/hooks/text/useTranslation";
import set from "lodash/set";
import get from "lodash/get";
import { isNil } from "lodash-es";
import ImgCardMedia from "@/client/components/cards/cardMedias/ImgCardMedia/ImgCardMedia";
import { useSnackbarAlert } from "@/client/hooks/components/alerts/useSnackbarAlert";
import SnackbarAlert from "@/client/components/alerts/SnackbarAlert";

export interface FileUploadInfo {
  name: string;
  uploader?: ResizeImageUploader;
}

export interface Props extends Omit<OutlinedInputProps, "name"> {
  /** default thumbnail name*/
  name: string;
  /** then name of value pass to api */
  keyName: string;
  /** if pass resizeName means have default photoUrl with different size */
  resizeName?: string;
  acceptTypes?: AcceptType[];
  // onInputChange: (files: FileList | null, helpers: Helpers) => Promise<void>;
  canFileCardClickPreview?: boolean;
  canFileCardClickUpload?: boolean;
  canFileCardClickRevert?: boolean;
  canFileCardDrop?: boolean;
  canSelectFileCardClick?: boolean;
  canSelectFileCardDrop?: boolean;
  thumbnailHeight?: number;
  thumbnailWidth?: number;
  /** unit is MB, 0 means no max size  */
  maxFileSize?: number;
  helperText?: string;
  previewSort?: string[];
}

const defaultThumbnailHeight = 192;
const defaultThumbnailWidth = 192;

const ImageUploadField = ({
  className,
  sx,
  name,
  keyName,
  resizeName,
  disabled,
  acceptTypes = ["*"], //["video/*", "image/*"],
  // onInputChange,
  canFileCardClickPreview = true,
  canFileCardClickUpload = true,
  canFileCardClickRevert = true,
  canFileCardDrop = true,
  canSelectFileCardClick = true,
  canSelectFileCardDrop = true,
  thumbnailHeight = defaultThumbnailHeight,
  thumbnailWidth = defaultThumbnailWidth,
  maxFileSize = 0,
  helperText,
  previewSort = ["small", "large"],
  ...other
}: Props) => {
  const { t } = useTranslation();

  const { showSnackbarAlert, snackbarAlertProps } = useSnackbarAlert();

  const initialValue = useRef<string>("");
  const inputRef = useRef<HTMLInputElement | null>();
  const {
    field: { /** onChange */ onBlur, value = "", ref },
    fieldState: { error },
  } = useController({ name });

  const { getValues, reset, setValue } = useFormContext();

  const [fileUploadInfos, setFileUploadInfos] = useState<FileUploadInfo[]>([]);

  useDidMount(() => {
    if (value) {
      setFileUploadInfos([{ name: value }]);
      initialValue.current = value;
    }
  });

  const inputMinHeight = useMemo(() => thumbnailHeight + 66, [thumbnailHeight]);

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
          "The current selected file has a duplicate name with the already selected file",
        );
        return;
      }

      if (maxFileSize > 0 && files[0].size > maxFileSize * 1024 * 1024) {
        showSnackbarAlert({
          message: `The file size must less then ${maxFileSize} MB`,
          severity: "error",
        });
        return;
      }

      const options = {
        fileName: files[0].name,
        file: files[0],
      };

      const uploader = new ResizeImageUploader(options);

      uploader.onFinalize(() => {
        setFileUploadInfos(() => {
          const { key = "no-key", tempUrl = "no-temp" } =
            uploader.getPreSignedUrlsResponse() ?? {};

          setValue(name, tempUrl, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
          setValue(keyName, key, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });

          return [{ name: tempUrl }];
        });
      });

      setFileUploadInfos([
        {
          name: options.fileName,
          uploader,
        },
      ]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [fileUploadInfos, keyName, maxFileSize, name, setValue, showSnackbarAlert],
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
      //
    });
  };

  const DialogContent = useMemo(() => {
    const isUploaded = Boolean(get(getValues(), keyName));

    if (isUploaded) {
      return (
        <Card>
          <FilePreview
            name={fileUploadInfos[0]?.name ?? value}
            url={value ?? ""}
          />
        </Card>
      );
    }

    const cmsChannelImage = resizeName
      ? get(getValues(), resizeName) ?? {}
      : {};

    const posterByTypeEntries = Object.entries(cmsChannelImage).sort((a, b) => {
      const aIndex = previewSort.indexOf(a[0]);
      const bIndex = previewSort.indexOf(b[0]);
      return aIndex - bIndex;
    });

    return (
      <Card sx={{ overflow: "initial", width: "fit-content" }}>
        {posterByTypeEntries.map(([size, info]) => {
          return (
            <Fragment key={size}>
              <CardHeader title={size} />
              <ImgCardMedia
                src={get(info, "photoUrl") ?? ""}
                alt={size}
                sx={{ width: "auto", padding: "0 16px 8px" }}
              />
            </Fragment>
          );
        })}
      </Card>
    );
  }, [fileUploadInfos, getValues, keyName, previewSort, resizeName, value]);

  const onFileCardClickAction = useCallback<FileCardClick>(() => {
    //
  }, []);

  const onFileCardClickPreview = useCallback<FileCardClick>(() => {
    handleDialogOpen();
  }, [handleDialogOpen]);

  const onFileCardClickUpload = useCallback<FileCardClick>(() => {
    selectFileHandler();
  }, [selectFileHandler]);

  const onFileCardClickRevert = useCallback<FileCardClick>(() => {
    const nextValues = { ...getValues() };
    set(nextValues, keyName, undefined);
    set(
      nextValues,
      name,
      initialValue.current ? initialValue.current : undefined,
    );
    reset(nextValues);
    const currentValue = initialValue.current;
    if (isNil(currentValue)) {
      setFileUploadInfos([]);
    } else {
      setFileUploadInfos([{ name: currentValue }]);
    }
  }, [getValues, keyName, name, reset]);

  // TODO: if need replace, there should fix
  const onFileCardDrop = useCallback<FileCardDrop>(
    (item) => {
      changeHandler({
        target: { files: item.files },
      } as ChangeEvent<HTMLInputElement>);
    },
    [changeHandler],
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

  const formControlSx = useSX(
    () => [{ width: thumbnailWidth + 18 }, sx],
    [sx, thumbnailWidth],
  );

  const dialogSX = useSX(
    () => ({
      "& .MuiDialog-paper": {
        maxWidth: "initial",
      },
      "& .MuiDialogContent-root": {
        paddingBottom: 0,
      },
    }),
    [],
  );

  return (
    <>
      <Box sx={canDropBackdrop} ref={drop} />
      <FormControl
        className={className}
        sx={formControlSx}
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
        <FormHelperText>
          {error?.message ? error.message : helperText}
        </FormHelperText>
        <FileUploadGrid
          disabled={disabled}
          fileUploadInfos={fileUploadInfos}
          thumbnailHeight={thumbnailHeight}
          onFileCardClickAction={onFileCardClickAction}
          onFileCardClickPreview={
            canFileCardClickPreview ? onFileCardClickPreview : undefined
          }
          onFileCardClickUpload={
            canFileCardClickUpload ? onFileCardClickUpload : undefined
          }
          onFileCardClickRevert={
            canFileCardClickRevert ? onFileCardClickRevert : undefined
          }
          onFileCardDrop={canFileCardDrop ? onFileCardDrop : undefined}
          onSelectFileCardClick={
            canSelectFileCardClick ? onSelectFileCardClick : undefined
          }
          onSelectFileCardDrop={
            canSelectFileCardDrop ? onSelectFileCardDrop : undefined
          }
          name={name}
        />
      </FormControl>

      <Dialog
        open={isDialogOpen}
        title={t("dialog.title.preview")}
        content={DialogContent}
        actionsComponent={
          <Button sx={buttonSx} onClick={onDialogClose}>
            {t("button.close")}
          </Button>
        }
        onClose={onDialogClose}
        sx={dialogSX}
      />

      <SnackbarAlert {...snackbarAlertProps} />
    </>
  );
};

export default memo(ImageUploadField);
