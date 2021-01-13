// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, {
  useEffect,
  useMemo,
  useState,
  Fragment,
  useCallback,
} from "react";
import ReactGridLayout from "react-grid-layout";
import Grid from "@material-ui/core/Grid";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import {
  actionsTray,
  containerForHeader,
} from "../../Common/FormComponents/common/styleLibrary";
import SingleValueWidget from "./Widgets/SingleValueWidget";
import { AutoSizer } from "react-virtualized";
import LinearGraphWidget from "./Widgets/LinearGraphWidget";
import {
  IBarChartConfiguration,
  IDataSRep,
  ILinearGraphConfiguration,
  IPieChartConfiguration,
} from "./Widgets/types";
import BarChartWidget from "./Widgets/BarChartWidget";
import PieChartWidget from "./Widgets/PieChartWidget";
import SingleRepWidget from "./Widgets/SingleRepWidget";
import DateTimePickerWrapper from "../../Common/FormComponents/DateTimePickerWrapper/DateTimePickerWrapper";
import { IDashboardPanel, widgetType } from "./types";
import api from "../../../../common/api";
import {
  getDashboardDistribution,
  getWidgetsWithValue,
  panelsConfiguration,
  saveDashboardDistribution,
} from "./utils";
import { Button } from "@material-ui/core";
import ErrorBlock from "../../../shared/ErrorBlock";

interface IPrDashboard {
  classes: any;
}

const styles = (theme: Theme) =>
  createStyles({
    widgetsContainer: {
      height: "calc(100vh - 250px)",
    },
    ...actionsTray,
    ...containerForHeader(theme.spacing(4)),
  });

const PrDashboard = ({ classes }: IPrDashboard) => {
  const [timeStart, setTimeStart] = useState<any>(null);
  const [timeEnd, setTimeEnd] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [panelInformation, setPanelInformation] = useState<IDashboardPanel[]>(
    panelsConfiguration
  );
  const [error, setError] = useState<string>("");

  const minHeight = 600;

  const panels = useMemo(() => {
    const componentToUse = (value: IDashboardPanel) => {
      switch (value.type) {
        case widgetType.singleValue:
          return (
            <SingleValueWidget
              title={value.title}
              data={value.data as string}
            />
          );
        case widgetType.pieChart:
          return (
            <PieChartWidget
              title={value.title}
              dataInner={value.data as object[]}
              dataOuter={(value.dataOuter as object[]) || null}
              pieChartConfiguration={
                value.widgetConfiguration as IPieChartConfiguration
              }
              middleLabel={value.innerLabel}
            />
          );
        case widgetType.linearGraph:
          return (
            <LinearGraphWidget
              title={value.title}
              data={value.data as object[]}
              linearConfiguration={
                value.widgetConfiguration as ILinearGraphConfiguration[]
              }
              hideYAxis={value.disableYAxis}
              xAxisFormatter={value.xAxisFormatter}
              yAxisFormatter={value.yAxisFormatter}
            />
          );
        case widgetType.barChart:
          return (
            <BarChartWidget
              title={value.title}
              data={value.data as object[]}
              barChartConfiguration={
                value.widgetConfiguration as IBarChartConfiguration[]
              }
            />
          );
        case widgetType.singleRep:
          const fillColor = value.fillColor ? value.fillColor : value.color;
          return (
            <SingleRepWidget
              title={value.title}
              data={value.data as IDataSRep[]}
              label={value.innerLabel as string}
              color={value.color as string}
              fillColor={fillColor as string}
            />
          );
        default:
          return null;
      }
    };

    return panelInformation.map((val, idx) => {
      return <div key={val.layoutIdentifier}>{componentToUse(val)}</div>;
    });
  }, [panelInformation]);

  const fetchUsage = useCallback(() => {
    let stepCalc = 15;

    if (timeStart !== null && timeEnd !== null) {
      const secondsInPeriod = timeEnd.unix() - timeStart.unix();
      const periods = secondsInPeriod / 60;

      stepCalc = periods < 1 ? 15 : periods;
    }

    api
      .invoke(
        "GET",
        `/api/v1/admin/info?step=${stepCalc}&${
          timeStart !== null ? `&start=${timeStart.unix()}` : ""
        }${timeStart !== null && timeEnd !== null ? "&" : ""}${
          timeEnd !== null ? `end=${timeEnd.unix()}` : ""
        }`
      )
      .then((res: any) => {
        if (res.widgets) {
          const widgetsWithValue = getWidgetsWithValue(res.widgets);
          setPanelInformation(widgetsWithValue);
          setError("");
        } else {
          setError(
            "Widget information could not be retrieved at this time. Please try again"
          );
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [timeStart, timeEnd]);

  const triggerLoad = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      fetchUsage();
    }
  }, [loading, fetchUsage]);

  const dashboardDistr = getDashboardDistribution();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        {error !== "" && (
          <Fragment>
            <ErrorBlock errorMessage={error} withBreak={false} />
            <br />
          </Fragment>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        className={`${classes.actionsTray} ${classes.timeContainers}`}
      >
        <span className={classes.label}>Start Time</span>
        <DateTimePickerWrapper value={timeStart} onChange={setTimeStart} />
        <span className={classes.label}>End Time</span>
        <DateTimePickerWrapper value={timeEnd} onChange={setTimeEnd} />
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={triggerLoad}
        >
          Get Information
        </Button>
      </Grid>
      <Grid item xs={12} className={classes.widgetsContainer}>
        <AutoSizer>
          {({ width, height }: any) => {
            const hpanel = height < minHeight ? minHeight : height;
            return (
              <ReactGridLayout
                width={width}
                cols={8}
                containerPadding={[10, 10]}
                onLayoutChange={saveDashboardDistribution}
                layout={dashboardDistr}
                rowHeight={hpanel / 6}
              >
                {panels}
              </ReactGridLayout>
            );
          }}
        </AutoSizer>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(PrDashboard);
