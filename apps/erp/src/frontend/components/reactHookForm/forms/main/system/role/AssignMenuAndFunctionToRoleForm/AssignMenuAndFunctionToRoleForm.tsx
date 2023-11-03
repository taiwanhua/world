import {
  FC,
  memo,
  SyntheticEvent,
  useState,
  useCallback,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import Box from "@mui/material/Box";
import { SX } from "@/frontend/hooks/theme/useSX";
import Grid from "@mui/material/Grid";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/client/hooks/text/useTranslation";
import MenusCheckboxTreeView from "@/client/components/treeViews/MenusCheckboxTreeView/MenusCheckboxTreeView";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "@mui/material/Card";
import { useSX } from "@/client/hooks/theme/useSX";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { Divider } from "@mui/material";
import { useOaAuthRelevanceSummary } from "@/client/hooks/graphql/oa/auth/oaAuthRelevance/useOaAuthRelevanceSummary";
import { selectByCheckboxHandler } from "@/client/components/tables/FixedColumnTable/FixedColumnTable";
import {
  MenuTree,
  MenuWithChildren,
  OaAuthFunctionInMenu,
} from "@/client/hooks/graphql/oa/auth/check/useOaAuthMenusByToken";
import { RelevanceType } from "@maya-oa/core/dist/graphql/types";
import { useMenusByTokenStore } from "@/client/hooks/zustand/useMenusByTokenStore";

export type TabValue = "menu" | "function";

export interface AssignMenuAndFunctionToRoleInput {
  roleMenuIds: string[];
  roleFunctionIds: string[];
}

export interface AssignFunctionCheckboxGroup {
  label: string;
  checkboxes: OaAuthFunctionInMenu[];
}

export interface Props {
  sx?: SX;
  onSubmit: SubmitHandler<AssignMenuAndFunctionToRoleInput>;
  methods: UseFormReturn<AssignMenuAndFunctionToRoleInput>;
  disabled?: boolean;
  roleId?: string;
}

const AssignMenuAndFunctionToRoleForm: FC<Props> = ({
  sx,
  onSubmit,
  methods,
  // disabled,
  roleId = "",
}) => {
  const { t } = useTranslation();

  const [selectedRoleMenuIds, setSelectedRoleMenuIds] = useState<string[]>([]);
  const [selectedRoleFunctionIds, setSelectedRoleFunctionIds] = useState<
    string[]
  >([]);

  const { menusByToken, menusTreeByToken: menusTree } = useMenusByTokenStore();

  const menuIds = (menusByToken ?? []).map(({ id }) => id);

  const { relevanceSecondIds: roleMenuIds } = useOaAuthRelevanceSummary({
    input: { limit: 0, firstId: roleId, type: "RoleMenu" as RelevanceType },
  });

  const { relevanceSecondIds: roleFunctionIds } = useOaAuthRelevanceSummary({
    input: { limit: 0, firstId: roleId, type: "RoleFunction" as RelevanceType },
  });

  const [tabValue, setTabValue] = useState<TabValue>("menu");

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setTabValue(newValue as TabValue);
    },
    [],
  );

  const handleMenuSelect = useCallback(
    (event: SyntheticEvent, nodeId: string[]) => {
      const nextValue = selectByCheckboxHandler(
        nodeId[0],
        selectedRoleMenuIds,
        (id) => id,
      );

      methods.setValue("roleMenuIds", nextValue);
      setSelectedRoleMenuIds(nextValue);
    },
    [methods, selectedRoleMenuIds],
  );

  const handleFunctionSelect = useCallback<
    NonNullable<CheckboxProps["onChange"]>
  >(
    ({ target: { name } }) => {
      const nextValue = selectByCheckboxHandler(
        name,
        selectedRoleFunctionIds,
        (id) => id,
      );

      methods.setValue("roleFunctionIds", nextValue);
      setSelectedRoleFunctionIds(nextValue);
    },
    [methods, selectedRoleFunctionIds],
  );

  useEffect(() => {
    methods.setValue("roleMenuIds", roleMenuIds);
    setSelectedRoleMenuIds(roleMenuIds);
  }, [methods, roleMenuIds]);

  useEffect(() => {
    methods.setValue("roleFunctionIds", roleFunctionIds);
    setSelectedRoleFunctionIds(roleFunctionIds);
  }, [methods, roleFunctionIds]);

  const TabPanelSX = useSX(() => ({ padding: 0 }), []);

  const cardSX = useSX(
    () => ({
      minWidth: 300,
      width: "100%",
      height: "100%",
      padding: 1,
      overflow: "auto",
    }),
    [],
  );

  const renderFunctionWithLabels = useCallback(
    (
      node: MenuTree | MenuWithChildren,
      assignFunctionCheckboxGroup: AssignFunctionCheckboxGroup[],
      inheritName = "",
    ) => {
      if (Array.isArray(node)) {
        node.forEach((element) =>
          renderFunctionWithLabels(
            element,
            assignFunctionCheckboxGroup,
            inheritName ? `${inheritName} > ${element.name}` : element.name,
          ),
        );
        return assignFunctionCheckboxGroup;
      }

      if (node.oaAuthFunctions.length) {
        assignFunctionCheckboxGroup.push({
          label: inheritName,
          checkboxes: node.oaAuthFunctions,
        });
      }

      if (node.children.length) {
        renderFunctionWithLabels(
          node.children,
          assignFunctionCheckboxGroup,
          inheritName,
        );
      }

      return assignFunctionCheckboxGroup;
    },
    [],
  );

  const functionWithLabels = useMemo(
    () => renderFunctionWithLabels(menusTree, []),
    [menusTree, renderFunctionWithLabels],
  );

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        sx={sx}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <TabContext value={tabValue}>
          <TabList value={tabValue} onChange={handleChange}>
            <Tab label={t("tab.menuAndFunction.menu")} value="menu" />
            <Tab label={t("tab.menuAndFunction.function")} value="function" />
          </TabList>

          <TabPanel value="menu" sx={TabPanelSX}>
            <Grid container spacing={3} minWidth={480} height="50vh">
              <Grid item xs={12} height="100%">
                {menusTree?.[0] ? (
                  <MenusCheckboxTreeView
                    multiSelect
                    onNodeSelect={handleMenuSelect}
                    // onNodeToggle={handleToggle}
                    expanded={menuIds}
                    selected={selectedRoleMenuIds}
                    data={menusTree}
                  />
                ) : null}
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="function" sx={TabPanelSX}>
            <Grid container spacing={3} minWidth={480} height="50vh">
              <Grid item xs={12} height="100%">
                <Card sx={cardSX}>
                  {functionWithLabels.map(({ label, checkboxes }) => {
                    return (
                      <Fragment key={label}>
                        <Typography marginTop={1}>{label}</Typography>
                        <FormGroup>
                          {checkboxes.map(({ id, name, showName }) => (
                            <FormControlLabel
                              key={id}
                              control={
                                <Checkbox
                                  checked={selectedRoleFunctionIds.includes(id)}
                                  onChange={handleFunctionSelect}
                                  name={id}
                                  size="small"
                                  sx={{
                                    position: "relative",
                                    padding: 0,
                                    paddingLeft: 2,
                                  }}
                                />
                              }
                              label={`${name} / ${showName}`}
                            />
                          ))}
                        </FormGroup>
                        <Divider sx={{ marginTop: 1 }} />
                      </Fragment>
                    );
                  })}
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </FormProvider>
  );
};

export default memo(AssignMenuAndFunctionToRoleForm);
