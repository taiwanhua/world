import { FC, memo } from "react";
import ImgCardMedia from "@/client/components/cards/cardMedias/ImgCardMedia/ImgCardMedia";
import Tooltip from "@mui/material/Tooltip";

export interface Props {
  name: string;
  url: string;
  thumbnailHeight?: number;
}

const FilePreview: FC<Props> = ({ name, url, thumbnailHeight }) => {
  return (
    <>
      <Tooltip title={name}>
        <ImgCardMedia
          height={thumbnailHeight}
          src={url}
          loading="lazy"
          alt={name ?? url}
        />
      </Tooltip>
    </>
  );
};

export default memo(FilePreview);
