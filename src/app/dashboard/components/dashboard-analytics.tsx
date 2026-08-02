"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name?: string }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-xl border border-border/60 rounded-xl px-3 py-2 shadow-premium">
        <p className="text-xs font-semibold text-thread mb-1">{label}</p>
        <p className="text-sm font-bold text-indigo">{payload[0].value} min</p>
      </div>
    );
  }
  return null;
}

interface WeeklyData {
  day: string;
  minutes: number;
}

interface SkillData {
  subject: string;
  A: number;
}

export default function DashboardAnalytics({
  weeklyData,
  skillData,
}: {
  weeklyData: WeeklyData[];
  skillData: SkillData[];
}) {
  return (
    <Card className="rounded-2xl bg-card border-border/40 shadow-premium hoverable">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="size-5 text-indigo" />
          Analytics Overview
        </CardTitle>
        <Badge variant="secondary">This Week</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Area Chart — Learning Activity */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Learning Activity</p>
            <p className="text-xs text-muted-foreground mb-3">Minutes spent this week</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={weeklyData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="areaIndigoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2B3A67" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2B3A67" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#6B6156" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#6B6156" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="minutes" stroke="#2B3A67" strokeWidth={2.5} fill="url(#areaIndigoGrad)" dot={{ fill: "#2B3A67", strokeWidth: 2, r: 3 }} activeDot={{ r: 5, fill: "#2B3A67" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart — Skill Proficiency */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Skill Proficiency</p>
            <p className="text-xs text-muted-foreground mb-3">Based on your assessment</p>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="rgba(0,0,0,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "#6B6156" }} />
                <Radar name="Skills" dataKey="A" stroke="#E8A33D" fill="#E8A33D" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
