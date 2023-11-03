import { FC, memo, useEffect, useMemo, useState } from "react";
import Card, { CardProps } from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import PreviewIcon from "@mui/icons-material/Preview";
// import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DangerousIcon from "@mui/icons-material/Dangerous";
// import FindInPageIcon from "@mui/icons-material/FindInPage";
import { FileUploadInfo } from "./MultipartUploadField";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useSX } from "@/client/hooks/theme/useSX";
import { Props as FileUploadGridProps } from "./FileUploadGrid";
import CircularProgressWithLabel from "@/client/components/progress/CircularProgressWithLabel/CircularProgressWithLabel";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import FilePreview from "./FilePreview";

export type FileCardPickFromFileUploadGridProps = Pick<
  FileUploadGridProps,
  "thumbnailHeight" | "disabled"
>;
export interface Props extends FileCardPickFromFileUploadGridProps, CardProps {
  fileUploadInfo: FileUploadInfo;
  onFileCardClickAction: NonNullable<IconButtonProps["onClick"]>;
  onClickPreview?: IconButtonProps["onClick"];
  onClickUpload?: IconButtonProps["onClick"];
  onClickDelete?: IconButtonProps["onClick"];
  onFileDrop?: (item: HTMLInputElement) => void;
  actionLabel?: string;
  s3EndPoint: string;
  s3Bucket: string;
}

const FileCard: FC<Props> = ({
  thumbnailHeight,
  disabled,
  fileUploadInfo,
  onFileCardClickAction,
  onClickPreview,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClickUpload,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClickDelete,
  onFileDrop,
  sx,
  className,
  actionLabel,
  s3EndPoint,
  s3Bucket,
  ...other
}) => {
  const { name, uploader } = fileUploadInfo;
  const url = `${s3EndPoint}/${s3Bucket}/temp/${name}`;
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
    () => ({ height: thumbnailHeight }),
    [thumbnailHeight],
  );

  const buttonSx = useSX(() => ({ margin: 0 }), []);

  useEffect(() => {
    if (uploader) {
      console.log(uploader);
      uploader.onInitialled(() => setProgress(0));
      uploader.onStart(() => {
        /*setProgress(0)*/
      });
      uploader.onProgress(setProgress);
      uploader.onPartsUploaded(() => setProgress(101));
      uploader.onFinalize(() => setProgress(102));
      uploader.initialize();
    }
  }, [uploader]);

  if (uploader) {
    const fileUploadStatus = uploader.getFileUploadStatus();

    return (
      <Card className={className} sx={cardSx} {...other}>
        <Tooltip title={name}>
          <span>
            <CircularProgressWithLabel
              variant={
                fileUploadStatus === "abort" ||
                fileUploadStatus === "finalizing"
                  ? "indeterminate"
                  : "determinate"
              }
              value={progress}
              sx={circularProgressSx}
            />
          </span>
        </Tooltip>

        <CardActions disableSpacing>
          {!disabled && fileUploadStatus === "initialled" ? (
            <Tooltip title="Start Upload">
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
          (fileUploadStatus === "initialled" ||
            fileUploadStatus === "partsUploading" ||
            fileUploadStatus === "partsUploadSucceed") ? (
            <Tooltip title="Abort Upload">
              <IconButton
                onClick={(event) => {
                  onFileCardClickAction(event);
                  uploader.abortUpload();
                }}
                color="error"
                sx={buttonSx}
              >
                <DangerousIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          {!disabled && fileUploadStatus === "partsUploadSucceed" ? (
            <Tooltip title="Finish Upload">
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
          <div style={divStyle} />
        </CardActions>
      </Card>
    );
  }

  return (
    <Card className={className} sx={cardSx} {...other}>
      <Box ref={drop} sx={cardMediaSx}>
        <FilePreview name={name} url={url} thumbnailHeight={thumbnailHeight} />
      </Box>
      <CardActions disableSpacing>
        {onClickPreview ? (
          <Tooltip title="Preview">
            <IconButton onClick={onClickPreview} sx={buttonSx}>
              <PreviewIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {/* {editable && onClickUpload ? (
          <Tooltip title="Select File">
            <IconButton onClick={onClickUpload} sx={buttonSx}>
              <FindInPageIcon />
            </IconButton>
          </Tooltip>
        ) : null} */}
        {/* {editable && onClickDelete ? (
          <Tooltip title="Delete File">
            <IconButton onClick={onClickDelete} color="error" sx={buttonSx}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null} */}
        {actionLabel}
        <div style={divStyle} />
      </CardActions>
    </Card>
  );
};

export default memo(FileCard);
