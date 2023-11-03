import { FC, memo, useCallback, useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { SX } from "@/frontend/hooks/theme/useSX";
import Grid from "@mui/material/Grid";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/client/hooks/text/useTranslation";
import TextField from "@mui/material/TextField";
// import { QueryOaAuthRoleSummaryInput, Role } from "@/client/graphql/oa/types";
import FixedColumnTable, {
  Column,
  Pagination,
  selectByCheckboxHandler,
} from "@/client/components/tables/FixedColumnTable/FixedColumnTable";
import { useSX } from "@/client/hooks/theme/useSX";
import Chip from "@mui/material/Chip";
import FullPageProgressCircle from "@/client/components/progress/FullPageProgressCircle/FullPageProgressCircle";
import { useOaAuthRoleSummary } from "@/client/hooks/graphql/oa/auth/oaAuthRole/useOaAuthRoleSummary";
import {
  OaAuthRoleSummaryQueryResultData,
  QueryOaAuthRoleSummaryInput,
} from "@/client/graphql/oa/query/auth/oaAuthRole/oaAuthRoleSummary";
import uniqBy from "lodash/uniqBy";

export type Row = OaAuthRoleSummaryQueryResultData;

export interface Values {
  roles: Row[];
}

export interface Props {
  sx?: SX;
  onSubmit: SubmitHandler<Values>;
  methods: UseFormReturn<Values>;
  userId: string;
  disabled?: boolean;
}

const AssignUserToRoleForm: FC<Props> = ({
  sx,
  onSubmit,
  methods,
  userId,
  disabled,
}) => {
  const { t } = useTranslation();

  const [select, setSelect] = useState<Row[]>([]);

  const { roles: rolesByUser } = useOaAuthRoleSummary({
    input: { limit: 0, userIds: [userId] },
  });

  const [userSummaryQuery, setUserSummaryQuery] =
    useState<QueryOaAuthRoleSummaryInput>({ isByToken: true });

  const { roles: roleSummaryByToken, isValidating } = useOaAuthRoleSummary({
    input: { isByToken: true },
  });

  const data = useMemo(() => {
    return (
      roleSummaryByToken?.result ?? {
        count: 0,
        pageCount: 0,
        page: 0,
        limit: 10,
        start: 0,
        data: [],
      }
    );
  }, [roleSummaryByToken?.result]);

  const tableSX = useSX(() => {
    return {
      height: "100%",
    };
  }, []);

  const gridKeySX = useSX(() => {
    return {
      margin: "auto 0",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    };
  }, []);

  const boxSX = useSX(() => {
    return {
      wordWrap: "break-word",
    };
  }, []);

  const tableColumns = useMemo<Column<Row>[]>(
    () => [
      {
        dataKey: "id",
        label: t("table.column.id.default"),
        valueResolver: (row) => (
          <Grid container>
            <Grid item xs sx={gridKeySX} title={row.id}>
              {row.id}
            </Grid>
          </Grid>
        ),
        minWidth: 150,
        fixed: "left",
      },
      {
        dataKey: "name",
        label: t("table.column.name.default"),
        valueResolver: (row) => <Box sx={boxSX}>{row.name}</Box>,
        minWidth: 150,
      },
      {
        dataKey: "enable",
        label: t("table.column.enable"),
        valueResolver: (row) => (
          <Chip
            color={row.enable ? "success" : "error"}
            label={
              row.enable ? t("table.column.enable") : t("table.column.disable")
            }
          />
        ),
        minWidth: 120,
      },
    ],
    [t, gridKeySX, boxSX],
  );

  const tablePagination = useMemo<Pagination>(
    () => ({
      count: data.count,
      onChangeRowsPerPage: (rowsPerPage) => {
        const nextQuery = {
          ...userSummaryQuery,
          limit: rowsPerPage,
          start: 0,
        };
        setUserSummaryQuery(nextQuery);
      },
      onPageChange: (nwePage) => {
        const nextQuery = {
          ...userSummaryQuery,
          start: nwePage * (userSummaryQuery.limit ?? data.limit),
        };

        setUserSummaryQuery(nextQuery);
      },
      page: data.page,
      rowsPerPage: userSummaryQuery.limit ?? data.limit,
    }),
    [data, setUserSummaryQuery, userSummaryQuery],
  );

  const rowPrimaryKeyResolver = useCallback((row: Row) => row.id, []);

  const selectedKeys = useMemo(
    () => select.map(rowPrimaryKeyResolver),
    [rowPrimaryKeyResolver, select],
  );

  const selectedDisplayName = useMemo(
    () => select.map(({ name }) => name).join(", "),
    [select],
  );

  useEffect(() => {
    if (rolesByUser?.result) {
      const roles = rolesByUser.result.data;
      methods.setValue("roles", roles);
      setSelect(roles);
    }
  }, [methods, rolesByUser]);

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        sx={sx}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={3} minWidth={480}>
          <Grid item xs={12}>
            <TextField
              label={t("textField.label.selectedRoleNames")}
              value={selectedDisplayName}
              fullWidth
              disabled
              multiline
              minRows={3}
              maxRows={3}
            />
          </Grid>

          <Grid item xs height={400}>
            <FixedColumnTable
              rowPrimaryKeyResolver={rowPrimaryKeyResolver}
              tableContainerMinWidth={500}
              tableContainerMaxHeight="calc(100% - 52px)"
              tableContainerMinHeight="calc(100% - 52px)"
              sx={tableSX}
              columns={tableColumns}
              rows={data.data}
              pagination={tablePagination}
              rowSelection={
                disabled
                  ? undefined
                  : {
                      type: "checkbox",
                      selectedKeys,
                      onSelect: (selectedRow) => {
                        const nextState = selectByCheckboxHandler(
                          selectedRow,
                          select,
                          rowPrimaryKeyResolver,
                        );
                        setSelect(nextState);
                        methods.setValue("roles", nextState);
                      },
                      onSelectAll: (event, checked) => {
                        const nextSelected = checked
                          ? uniqBy([...select, ...data.data], "id")
                          : [];
                        setSelect(nextSelected);
                        methods.setValue("roles", nextSelected);
                      },
                      canSelectByRow: true,
                    }
              }
            />
            <FullPageProgressCircle loading={isValidating} />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default memo(AssignUserToRoleForm);
