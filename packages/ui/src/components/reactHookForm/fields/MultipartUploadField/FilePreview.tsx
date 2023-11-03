import { FC, memo } from "react";
import { images, videos } from "@/client/constant/s3Upload";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import ImgCardMedia from "@/client/components/cards/cardMedias/ImgCardMedia/ImgCardMedia";

import Tooltip from "@mui/material/Tooltip";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { useSX } from "@/client/hooks/theme/useSX";

export const getFileType = (name: string) => {
  const fileExtend = name.split(".").pop();
  if (!fileExtend) {
    return "unknown";
  }
  if (images.includes(fileExtend)) {
    return "image";
  }
  if (videos.includes(fileExtend)) {
    return "video";
  }
  return "unknown";
};

export interface Props {
  name: string;
  url: string;
  thumbnailHeight?: number;
}

const FilePreview: FC<Props> = ({ name, url, thumbnailHeight }) => {
  const typographySx = useSX(
    () => ({
      display: "flex",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    }),
    [],
  );

  return (
    <>
      {getFileType(name) === "image" ? (
        <Tooltip title={name}>
          <ImgCardMedia
            height={thumbnailHeight}
            src={url}
            loading="lazy"
            alt={name ?? url}
          />
        </Tooltip>
      ) : null}

      {getFileType(name) === "video" ? (
        <Tooltip title={name}>
          <video
            width="100%"
            height={thumbnailHeight}
            controls
            style={{
              objectFit: "fill",
              display: "flex",
            }}
          >
            <source src={url} />
          </video>
        </Tooltip>
      ) : null}

      {getFileType(name) === "unknown" ? (
        <CardContent sx={{ height: thumbnailHeight }}>
          <Tooltip title={name}>
            <Typography sx={typographySx} variant="body2">
              <FilePresentIcon color="success" fontSize="large" />
            </Typography>
          </Tooltip>
        </CardContent>
      ) : null}
    </>
  );
};

export default memo(FilePreview);
