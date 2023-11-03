import { FC, memo } from "react";
import { useSX } from "@/client/hooks/theme/useSX";
import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Typography from "@mui/material/Typography";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Props as FileUploadGridProps } from "./FileUploadGrid";
import { lighten, darken } from "@mui/material/styles";

export type FileCardPickFromFileUploadGridProps = Pick<
  FileUploadGridProps,
  "thumbnailHeight" | "disabled"
>;

export type NonNullableCardPropsOnClick = NonNullable<CardProps["onClick"]>;
export interface Props
  extends FileCardPickFromFileUploadGridProps,
    Omit<CardProps, "onClick"> {
  onFileDrop?: (item: HTMLInputElement) => void;
  onClick?: CardProps["onClick"];
}

const SelectFileCard: FC<Props> = ({
  thumbnailHeight,
  disabled,
  onFileDrop,
  onClick,
  sx,
  className,
  ...other
}) => {
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

  const typographySx = useSX(
    () => ({
      display: "flex",
      height: thumbnailHeight + 10,
      justifyContent: "center",
      alignItems: "center",
      border: isCanDrop ? "1px dashed" : undefined,
      opacity: isDroppable ? 0.3 : undefined,
      background: (theme) =>
        theme.palette.mode === "dark"
          ? lighten(theme.palette.background.default, 0.1)
          : darken(theme.palette.background.default, 0.1),
      "&:hover": {
        border: onClick ? "1px dashed" : undefined,
      },
    }),
    [isCanDrop, isDroppable, onClick, thumbnailHeight],
  );

  const cardSx = useSX(
    () => [
      {
        cursor: "pointer",
        border: isCanDrop ? "1px solid" : "1px solid transparent",
      },
      sx,
    ],
    [isCanDrop, sx],
  );

  return (
    <Card
      className={className}
      ref={drop}
      sx={cardSx}
      onClick={!disabled && onClick ? onClick : undefined}
      {...other}
    >
      <CardContent>
        <Tooltip title="Select Or Drag File">
          <Typography sx={typographySx} variant="body2">
            <UploadFileIcon />
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default memo(SelectFileCard);
