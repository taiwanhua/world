import { FC, useMemo, memo, MouseEvent } from "react";
import { useSX } from "@/client/hooks/theme/useSX";
import Grid, { GridProps } from "@mui/material/Grid";
import { FileUploadInfo } from "./ImageUploadField";
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
  gridItemXs?: GridProps["xs"];
  onFileCardClickAction: FileCardClick;
  onFileCardClickPreview?: FileCardClick;
  onFileCardClickUpload?: FileCardClick;
  onFileCardClickRevert?: FileCardClick;
  onFileCardDrop?: FileCardDrop;
  onSelectFileCardDrop?: SelectFileCardProps["onFileDrop"];
  onSelectFileCardClick?: SelectFileCardProps["onClick"];
  name: string;
}

const FileUploadGrid: FC<Props> = ({
  fileUploadInfos,
  thumbnailHeight,
  disabled,
  gridItemXs,
  onFileCardClickAction,
  onFileCardClickPreview,
  onFileCardClickUpload,
  onFileCardClickRevert,
  onFileCardDrop,
  onSelectFileCardDrop,
  onSelectFileCardClick,
  sx,
  className,
  name,
  ...other
}) => {
  const isShowSelectFileCard = useMemo(() => {
    if (disabled) {
      return false;
    }
    return fileUploadInfos.length === 0;
  }, [disabled, fileUploadInfos.length]);

  const cardGridContainerSx = useSX(
    () => [{ padding: 1, paddingTop: 2, position: "absolute" }, sx],
    [sx],
  );

  const cardGridXs = useMemo(() => gridItemXs ?? 12, [gridItemXs]);

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
            onClickRevert={
              onFileCardClickRevert &&
              ((event) => {
                onFileCardClickRevert(event, index);
              })
            }
            onFileDrop={
              onFileCardDrop &&
              ((item) => {
                onFileCardDrop(item, index);
              })
            }
            name={name}
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
