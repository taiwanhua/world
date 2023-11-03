import { CSSProperties, FC, memo, useEffect, useMemo, useState } from "react";
import Card, { CardProps } from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import PreviewIcon from "@mui/icons-material/Preview";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import UndoIcon from "@mui/icons-material/Undo";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { FileUploadInfo } from "./ImageUploadField";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useSX } from "@/client/hooks/theme/useSX";
import { Props as FileUploadGridProps } from "./FileUploadGrid";
import CircularProgressWithLabel from "@/client/components/progress/CircularProgressWithLabel/CircularProgressWithLabel";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import FilePreview from "./FilePreview";
import { useOaGraphql } from "@/client/hooks/graphql/oa/useOaGraphql";
import SnackbarAlert from "@/client/components/alerts/SnackbarAlert";
import { useSnackbarAlert } from "@/client/hooks/components/alerts/useSnackbarAlert";
import { useTranslation } from "@/client/hooks/text/useTranslation";
import { CircularProgress } from "@mui/material";
import { useController } from "react-hook-form";

export type FileCardPickFromFileUploadGridProps = Pick<
  FileUploadGridProps,
  "thumbnailHeight" | "disabled"
>;
export interface Props extends FileCardPickFromFileUploadGridProps, CardProps {
  fileUploadInfo: FileUploadInfo;
  onFileCardClickAction: NonNullable<IconButtonProps["onClick"]>;
  onClickPreview?: IconButtonProps["onClick"];
  onClickUpload?: IconButtonProps["onClick"];
  onClickRevert?: IconButtonProps["onClick"];
  onFileDrop?: (item: HTMLInputElement) => void;
  actionLabel?: string;
  name: string;
}

const FileCard: FC<Props> = ({
  thumbnailHeight,
  disabled,
  fileUploadInfo,
  onFileCardClickAction,
  onClickPreview,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClickUpload,
  onClickRevert,
  onFileDrop,
  sx,
  className,
  actionLabel,
  name,
  ...other
}) => {
  const {
    fieldState: { isDirty },
  } = useController({ name });

  const { oaGraphql } = useOaGraphql();

  const { t } = useTranslation();

  const { showSnackbarAlert, snackbarAlertProps } = useSnackbarAlert();

  const { name: fileNameOrUrl, uploader } = fileUploadInfo;

  const [progress, setProgress] = useState<number | undefined>(undefined);

  const [{ isCanDrop, isDroppable }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      canDrop: () => {
        return Boolean(!disabled && onFileDrop);
      },
      drop(item: HTMLInputElement) {
        if (onFileDrop) {
          onFileDrop(item);
        }
      },
      collect: (monitor: DropTargetMonitor) => ({
        isDroppable: monitor.canDrop() && monitor.isOver(),
        isCanDrop: monitor.canDrop(),
      }),
    }),
    [onFileDrop, disabled],
  );

  const cardSx = useSX(
    () => [
      {
        border: isCanDrop ? "1px solid" : "1px solid transparent",
        position: "relative",
      },
      sx,
    ],
    [isCanDrop, sx],
  );
  const divStyle = useMemo(
    () => ({ height: "34px", display: "inline-block" }),
    [],
  );

  const cardMediaSx = useSX(
    () => ({
      border: isCanDrop ? "1px dashed" : undefined,
      opacity: isDroppable ? 0.3 : "unset",
    }),
    [isCanDrop, isDroppable],
  );

  const circularProgressSx = useSX(
    () => ({
      height: thumbnailHeight,
      position: "absolute",
      width: "100%",
      top: 0,
    }),
    [thumbnailHeight],
  );

  const buttonSx = useSX(() => ({ margin: 0 }), []);

  const boxSx = useSX(
    () => ({
      height: thumbnailHeight + 30,
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    }),
    [thumbnailHeight],
  );

  useEffect(() => {
    if (!uploader) {
      return;
    }

    const status = uploader.getFileUploadStatus();
    if (status === "empty") {
      uploader.onInitialled(async () => {
        const res = await oaGraphql.mutation.generateUploadPresignedUrls({
          count: 1,
        });

        if (res.errors.length > 0 || !res.result?.[0]) {
          showSnackbarAlert({
            message: t("message.error.create.default"),
            severity: "error",
          });
          return null;
        }
        setProgress(0);
        return res.result?.[0];
      });
      uploader.onStart(() => {
        setProgress(10);
      });
      uploader.onFinalizing(() => {
        setProgress(102);
      });
      uploader.initialize();
    }

    if (status === "uploading") {
      const timer = setInterval(() => {
        if (progress && progress < 95) {
          setProgress(progress + 5);
        }
      }, 150);
      return () => {
        clearInterval(timer);
      };
    }
  }, [oaGraphql.mutation, progress, showSnackbarAlert, t, uploader]);

  if (uploader) {
    const fileUploadStatus = uploader.getFileUploadStatus();

    return (
      <Card className={className} sx={cardSx} {...other}>
        {progress === undefined ? (
          <Box sx={boxSx}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <FilePreview
              name={fileNameOrUrl}
              url={URL.createObjectURL(uploader.getFile())}
              thumbnailHeight={thumbnailHeight}
            />
            <Tooltip title={fileNameOrUrl}>
              <span style={circularProgressSx as CSSProperties}>
                <CircularProgressWithLabel
                  variant={
                    fileUploadStatus === "uploadFailed"
                      ? "indeterminate"
                      : "determinate"
                  }
                  value={progress}
                  sx={circularProgressSx}
                />
              </span>
            </Tooltip>
          </>
        )}
        <CardActions disableSpacing>
          {!disabled && fileUploadStatus === "initialled" ? (
            <Tooltip title={t("tooltip.iconButton.startUpload")}>
              <IconButton
                onClick={(event) => {
                  onFileCardClickAction(event);
                  uploader.start();
                }}
                color="info"
                sx={buttonSx}
              >
                <FileUploadIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          {!disabled &&
          fileUploadStatus !== "empty" &&
          fileUploadStatus !== "initialling" ? (
            <Tooltip title={t("tooltip.iconButton.revert")}>
              <IconButton
                onClick={(event) => {
                  onClickRevert && onClickRevert(event);
                }}
                color="error"
                sx={buttonSx}
              >
                <UndoIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          {/* {!disabled && fileUploadStatus === "uploadSucceed" ? (
            <Tooltip title={t("tooltip.iconButton.finishUpload")}>
              <IconButton
                onClick={(event) => {
                  onFileCardClickAction(event);
                  uploader.finalize();
                }}
                color="success"
                sx={buttonSx}
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          {actionLabel}
          <div style={divStyle} /> */}
        </CardActions>
      </Card>
    );
  }

  return (
    <Card className={className} sx={cardSx} {...other}>
      <Box ref={drop} sx={cardMediaSx}>
        <FilePreview
          name={fileNameOrUrl}
          url={fileNameOrUrl}
          thumbnailHeight={thumbnailHeight}
        />
      </Box>
      <CardActions disableSpacing>
        {onClickPreview ? (
          <Tooltip title={t("tooltip.iconButton.preview")}>
            <IconButton onClick={onClickPreview} sx={buttonSx}>
              <PreviewIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {!disabled && onClickUpload ? (
          <Tooltip title="Select File">
            <IconButton onClick={onClickUpload} sx={buttonSx}>
              <FindInPageIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {!disabled && isDirty && onClickRevert ? (
          <Tooltip title={t("tooltip.iconButton.revert")}>
            <IconButton onClick={onClickRevert} color="error" sx={buttonSx}>
              <UndoIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {actionLabel}
        <div style={divStyle} />
      </CardActions>
      <SnackbarAlert {...snackbarAlertProps} />
    </Card>
  );
};

export default memo(FileCard);
