import { FC, memo, ReactNode, useCallback, useMemo } from "react";
import MUITextField, { BaseTextFieldProps } from "@mui/material/TextField";
import { useController } from "react-hook-form";
import { isNil } from "lodash-es";
import List from "@mui/material/List";
import { MenuTree } from "@/client/hooks/graphql/oa/auth/check/useOaAuthMenusByToken";
import MenuItem from "./MenuItem/MenuItem";
import { useSX } from "@/client/hooks/theme/useSX";
import { OaAuthMenuSummaryQueryResultData } from "@/client/graphql/oa/query/auth/oaAuthMenu/oaAuthMenuSummary";

export interface Props extends Omit<BaseTextFieldProps, "name"> {
  name: string;
  menuTree: MenuTree;
  menusData: OaAuthMenuSummaryQueryResultData[];
}

const SelectMenuTreeField: FC<Props> = ({
  sx,
  name,
  disabled,
  children,
  menuTree,
  menusData,
  ...other
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name });

  const isNotNilValue = useMemo(() => (isNil(value) ? "" : value), [value]);

  const renderValue = useCallback(
    (value: unknown): ReactNode => {
      return menusData.find((menu) => menu.id === value)?.name ?? "";
    },
    [menusData],
  );

  const listSx = useSX(() => ({ marginLeft: 2, paddingLeft: 1 }), []);

  return (
    <MUITextField
      select
      sx={sx}
      // onChange={onChange}
      onBlur={onBlur}
      value={isNotNilValue}
      name={name}
      inputRef={ref}
      error={Boolean(error)}
      helperText={error?.message}
      disabled={disabled}
      SelectProps={{
        displayEmpty: true,
        renderValue,
      }}
      {...other}
    >
      {children}
      <List sx={listSx}>
        {menuTree.map((menu: MenuTree[number]) => (
          <MenuItem
            level={1}
            key={menu.name}
            menu={menu}
            onClick={onChange}
            selectId={isNotNilValue}
          />
        ))}
      </List>
    </MUITextField>
  );
};

export default memo(SelectMenuTreeField);
