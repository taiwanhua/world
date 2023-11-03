import { FC, useMemo, memo, MouseEvent } from "react";
import { useSX } from "@/client/hooks/theme/useSX";
import Grid, { GridProps } from "@mui/material/Grid";
import { FileUploadInfo } from "./MultipartUploadField";
import SelectFileCard, { Props as SelectFileCardProps } from "./SelectFileCard";
import FileCard from "./FileCard";

export type FileCardDrop = (
  item: HTMLInputElement,
  fileCardIndex: number,
) => void;

export type FileCardClick = (
  event: MouseEvent<HTMLElement>,
  fileCardIndex: number,
) => void;

export interface Props extends GridProps {
  fileUploadInfos: FileUploadInfo[];
  thumbnailHeight: number;
  disabled: boolean | undefined;
  maxFilesCount: number;
  gridItemXs?: GridProps["xs"];
  onFileCardClickAction: FileCardClick;
  onFileCardClickPreview?: FileCardClick;
  onFileCardClickUpload?: FileCardClick;
  onFileCardClickDelete?: FileCardClick;
  onFileCardDrop?: FileCardDrop;
  onSelectFileCardDrop?: SelectFileCardProps["onFileDrop"];
  onSelectFileCardClick?: SelectFileCardProps["onClick"];
  s3EndPoint: string;
  s3Bucket: string;
}

const FileUploadGrid: FC<Props> = ({
  fileUploadInfos,
  thumbnailHeight,
  disabled,
  maxFilesCount,
  gridItemXs,
  onFileCardClickAction,
  onFileCardClickPreview,
  onFileCardClickUpload,
  onFileCardClickDelete,
  onFileCardDrop,
  onSelectFileCardDrop,
  onSelectFileCardClick,
  s3EndPoint,
  s3Bucket,
  sx,
  className,
  ...other
}) => {
  const isMultiple = maxFilesCount !== 1;

  const isShowSelectFileCard = useMemo(() => {
    if (disabled) {
      return false;
    }
    if (maxFilesCount === 0) {
      return true;
    }
    return maxFilesCount > fileUploadInfos.length;
  }, [disabled, fileUploadInfos.length, maxFilesCount]);

  const cardGridContainerSx = useSX(
    () => [{ padding: 1, paddingTop: 2, position: "absolute" }, sx],
    [sx],
  );

  const cardGridXs = useMemo(
    () => gridItemXs ?? (isMultiple ? 6 : 12),
    [isMultiple, gridItemXs],
  );

  return (
    <Grid
      container
      spacing={2}
      className={className}
      sx={cardGridContainerSx}
      {...other}
    >
      {fileUploadInfos.map((fileUploadInfo, index) => (
        <Grid item xs={cardGridXs} key={fileUploadInfo.name}>
          <FileCard
            thumbnailHeight={thumbnailHeight}
            disabled={disabled}
            fileUploadInfo={fileUploadInfo}
            s3EndPoint={s3EndPoint}
            s3Bucket={s3Bucket}
            onFileCardClickAction={(event) => {
              onFileCardClickAction(event, index);
            }}
            onClickPreview={
              onFileCardClickPreview &&
              ((event) => {
                onFileCardClickPreview(event, index);
              })
            }
            onClickUpload={
              onFileCardClickUpload &&
              ((event) => {
                onFileCardClickUpload(event, index);
              })
            }
            onClickDelete={
              onFileCardClickDelete &&
              ((event) => {
                onFileCardClickDelete(event, index);
              })
            }
            onFileDrop={
              onFileCardDrop &&
              ((item) => {
                onFileCardDrop(item, index);
              })
            }
          />
        </Grid>
      ))}
      {isShowSelectFileCard ? (
        <Grid item xs={cardGridXs}>
          <SelectFileCard
            disabled={disabled}
            onFileDrop={onSelectFileCardDrop}
            thumbnailHeight={thumbnailHeight}
            onClick={onSelectFileCardClick}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default memo(FileUploadGrid);
