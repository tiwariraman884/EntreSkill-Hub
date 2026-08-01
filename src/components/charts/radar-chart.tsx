"use client";

import React from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface ChartDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

interface RadarChartProps {
  data: ChartDataPoint[];
}

function RadarChart({ data }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="rgba(0,0,0,0.1)" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#6B6156" }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name="Your Score"
          dataKey="A"
          stroke="#4F46E5"
          fill="#4F46E5"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            padding: "8px 12px",
          }}
          itemStyle={{ color: "#4F46E5", fontWeight: 600 }}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}

export default React.memo(RadarChart);
