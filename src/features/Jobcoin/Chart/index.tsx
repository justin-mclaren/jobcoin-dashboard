import React from "react";
import { useGetAddressQuery } from "../jobcoinSlice";
import { chart } from "./Chart.module.css";
import convertToXY from "../../../utils/convert-transactions-to-xy-chart";
import { scaleUtc, scaleLinear } from "@visx/scale";
import { LinearGradient } from "@visx/gradient";
import { LinePath, AreaClosed } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { Axis } from "@visx/axis";
import { extent, max } from "d3-array";
import { ScaleSVG } from "@visx/responsive";
import { Text } from "@visx/text";

const colors = {
  white: "#FFFFFF",
  black: "#1B1B1B",
  gray: "#98A7C0",
  darkGray: "#2A2A2A",
  accent: "#40FEAE",
  darkAccent: "#256769",
};

const height = 400;
const width = 1000;
const padding = 55;

const accessors = {
  xAccessor: (d) => new Date(d.x),
  yAccessor: (d) => d.y,
};

function Chart({ address }: { address: string }) {
  const { balanceOverTime } = useGetAddressQuery(address, {
    selectFromResult: (result) => ({
      balanceOverTime: result?.data?.transactions,
    }),
  });

  let chartData = convertToXY(address, balanceOverTime);

  // We need 2 points to draw a line between. Assume that yesterday the value was 0 if the account has only one transaction.
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (chartData.length === 1) chartData.push({ x: yesterday, y: 0 });

  const xScale = scaleUtc({
    domain: extent(chartData, accessors.xAccessor),
    range: [0 + padding, width - padding],
  });

  const yScale = scaleLinear({
    domain: [0, max(chartData, accessors.yAccessor)],
    range: [height - padding, padding * 2],
  });

  return (
    <figure className={chart}>
      <ScaleSVG height={height} width={width}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          style={{
            fill: colors.black,
          }}
          rx={30}
        />
        <Axis
          scale={xScale}
          top={height - padding}
          orientation="bottom"
          stroke={colors.darkGray}
          strokeWidth={1.5}
          tickStroke={colors.darkGray}
          tickLabelProps={() => ({
            fill: colors.gray,
            textAnchor: "middle",
            verticalAnchor: "middle",
          })}
          tickFormat={(d: Date) =>
            d.toLocaleDateString("en-US", {
              weekday: "short",
              hour: "numeric",
            })
          }
        />
        <Axis
          hideZero
          scale={yScale}
          numTicks={5}
          left={padding}
          orientation="left"
          stroke={colors.darkGray}
          strokeWidth={1.5}
          tickStroke={colors.darkGray}
          tickLabelProps={() => ({
            fill: colors.gray,
            textAnchor: "end",
            verticalAnchor: "middle",
          })}
        />
        <LinearGradient
          id="background-gradient"
          from={colors.darkAccent}
          to={colors.black}
        />
        <LinearGradient
          id="line-gradient"
          from={colors.accent}
          to={colors.darkAccent}
        />
        <LinePath
          data={chartData}
          x={(d) => xScale(new Date(d.x))}
          y={(d) => yScale(d.y)}
          stroke={colors.accent}
          strokeWidth={6}
          curve={curveMonotoneX}
          markerEnd="url(#marker-circle)"
        />
        <AreaClosed
          data={chartData}
          x={(d) => xScale(new Date(d.x))}
          y={(d) => yScale(d.y)}
          yScale={yScale}
          strokeWidth={3}
          fill="url(#background-gradient)"
          curve={curveMonotoneX}
        />
        <Text
          style={{
            fill: colors.white,
            fontSize: 24,
            fontWeight: 600,
          }}
          x={padding / 2}
          y={padding}
        >
          Jobcoin Balance
        </Text>
      </ScaleSVG>
    </figure>
  );
}

export default Chart;
