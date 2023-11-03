import { FC, memo } from "react";
import { BoxProps } from "@mui/material/Box";
import List from "@mui/material/List";
import { useSX } from "@/client/hooks/theme/useSX";
import { MenuTree } from "@/client/hooks/graphql/oa/auth/check/useOaAuthMenusByToken";
import MUIMenuItem from "@mui/material/MenuItem";
import { alpha } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface Props {
  sx?: SX;
  menu: MenuTree[number];
  level: number;
  onClick?: (menuId: string) => void;
  selectId: string;
}

const MenuItem: FC<Props> = ({ sx, menu, level, onClick, selectId }) => {
  const { id, enable, name, children } = menu;

  const menuItemSx = useSX(() => ({ paddingLeft: 1 }), []);

  const iconSx = useSX(
    () => ({ left: level === 1 ? -12 : -4, position: "relative" }),
    [level],
  );

  const listSx = useSX(
    () => (theme) => ({
      marginLeft: 2,
      paddingLeft: 1,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    }),
    [],
  );

  return (
    <>
      <MUIMenuItem
        sx={sx}
        key={id}
        value={id}
        disabled={!enable}
        onClick={() => {
          onClick && onClick(id);
        }}
        selected={selectId === id}
      >
        {children.length > 0 ? (
          <ExpandMoreIcon sx={iconSx} />
        ) : (
          <span style={{ width: 24 }} />
        )}
        {name}
      </MUIMenuItem>

      {children.map((menu: MenuTree[number]) => (
        <List component="div" disablePadding key={menu.id} sx={listSx}>
          <MenuItem
            level={level + 1}
            menu={menu}
            sx={menuItemSx}
            onClick={onClick}
            selectId={selectId}
          />
        </List>
      ))}
    </>
  );
};

export default memo(MenuItem);
