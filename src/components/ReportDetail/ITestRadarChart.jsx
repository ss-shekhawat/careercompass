import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { useMediaQuery } from "react-responsive";

const InterestBarChart = ({ interestData }) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isLarge = useMediaQuery({ minWidth: 1024 });

  const formattedData = [
    {
      name: "Logical & Investigative",
      score: interestData?.investigative_score || 0,
      indicator: interestData?.investigative || "",
    },
    {
      name: "People-centric & Humanitarian",
      score: interestData?.social_score || 0,
      indicator: interestData?.social || "",
    },
    {
      name: "Conventional and Detail-oriented",
      score: interestData?.conventional_score || 0,
      indicator: interestData?.conventional || "",
    },
    {
      name: "Creative and Imaginative",
      score: interestData?.artistic_score || 0,
      indicator: interestData?.artistic || "",
    },
    {
      name: "Practical and Hands-on",
      score: interestData?.realistic_score || 0,
      indicator: interestData?.realistic || "",
    },
    {
      name: "Entrepreneurial and Persuasive",
      score: interestData?.enterprising_score || 0,
      indicator: interestData?.enterprising || "",
    },
  ];

  const cardStyle = {
    border: "0.5px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6" style={cardStyle}>
      <h3
        className="text-base md:text-lg font-semibold mb-4 text-center sm:text-left"
        style={{ color: "#0F172A" }}
      >
        Your Interest Analysis
      </h3>

      <div className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{
              top: isLarge ? 30 : 20,
              right: isLarge ? 40 : 20,
              left: 0,
              bottom: isMobile ? 100 : isLarge ? 70 : 60,
            }}
          >
            <XAxis
              dataKey="name"
              interval={0}
              angle={isMobile ? -50 : -40}
              height={isMobile ? 55 : 90}
              tickMargin={isMobile ? 10 : 45}
              dx={isMobile ? 0 : -50}
              textAnchor={isMobile ? "end" : "middle"}
              tick={{
                fontSize: isMobile ? 9 : isLarge ? 13 : 12,
                fill: "#475569",
              }}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(val) => `${val}%`}
              tick={{ fontSize: 12, fill: "#475569" }}
            />
            <Tooltip
              formatter={(val) => `${val}%`}
              contentStyle={{
                background: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="score"
              radius={[6, 6, 0, 0]}
              barSize={isMobile ? 20 : isLarge ? 36 : 32}
            >
              {formattedData.map((entry, index) => {
                const indicator = entry.indicator?.toLowerCase();
                let fillColor = "#94A3B8";
                if (indicator?.includes("high")) fillColor = "#15803D";
                else if (indicator?.includes("moderate")) fillColor = "#FBBF24";
                else if (indicator?.includes("low")) fillColor = "#DC2626";
                return <Cell key={index} fill={fillColor} />;
              })}
              <LabelList
                dataKey="score"
                position="top"
                formatter={(val) => `${val}%`}
                fontSize={isMobile ? 10 : isLarge ? 13 : 12}
                fill="#475569"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2 text-sm" style={{ color: "#475569" }}>
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-2 rounded-sm"
            style={{ background: "#15803D" }}
          />
          <span>
            <strong>(High)</strong> indicates areas of notably stronger
            interest.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-2 rounded-sm"
            style={{ background: "#FBBF24" }}
          />
          <span>
            <strong>(Moderate)</strong> reflects interests that fall within the
            mid-range.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-2 rounded-sm"
            style={{ background: "#DC2626" }}
          />
          <span>
            <strong>(Low)</strong> highlights areas of relatively lower
            interest.
          </span>
        </div>
      </div>
    </div>
  );
};

export default InterestBarChart;
