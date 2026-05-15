import React, { useState } from "react";
import { Brain, Calculator, MessageSquare } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

const GaugeChart = ({ score, color }) => {
  const value = Math.min(Math.max(score || 0, 0), 100);
  const data = [
    { name: "score", value },
    { name: "rest", value: 100 - value },
  ];
  const COLORS = [color, "#E2E8F0"];
  const needleAngle = (value / 100) * 180;

  return (
    <div className="relative flex flex-col items-center mb-3">
      <div className="relative">
        <PieChart width={160} height={100}>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="100%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
        </PieChart>

        <div
          className="absolute w-1 h-20 origin-bottom"
          style={{
            background: "#0F172A",
            bottom: "0px",
            left: "50%",
            transform: `translateX(-50%) rotate(${needleAngle - 90}deg)`,
            transformOrigin: "bottom center",
          }}
        />
        <div
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: "#0F172A",
            bottom: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      <div>
        <span
          className="absolute bottom-2 text-sm font-semibold"
          style={{ color: "#0F172A" }}
        >
          {score || 0}%
        </span>
      </div>
    </div>
  );
};

const ATestCard = ({ name, score, category, color, index }) => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1"
      style={{
        border: "0.5px solid #E2E8F0",
        background: "white",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
      }}
    >
      <h4 className="text-sm font-semibold mb-2" style={{ color: "#0F172A" }}>
        {name}
      </h4>
      <GaugeChart score={score} color={color} />
      <div
        className="inline-flex items-center justify-center w-full px-4 py-1.5 rounded-full text-sm font-semibold"
        style={{
          border: `1.5px solid ${color}`,
          color: color,
          background: "transparent",
        }}
      >
        <div className="flex items-center">
          <div
            className="w-2 h-2 rounded-full mr-2"
            style={{ background: color }}
          />
          {category}
        </div>
      </div>
    </div>
  );
};

const ATestCards = ({ aTestResults, sessionId, onTraitClick }) => {
  const mockResults = {
    numerical_ability_score: 75,
    numerical_ability: "High",
    verbal_ability_score: 60,
    verbal_ability: "Moderate",
    logical_reasoning_score: 45,
    logical_reasoning: "Low Moderate",
  };
  const results = aTestResults || mockResults;

  const iconMap = {
    "Numerical Ability": Calculator,
    "Verbal Ability": MessageSquare,
    "Logical Reasoning": Brain,
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState(null);

  const categoryColors = {
    High: "#15803D",
    Moderate: "#B45309",
    "Low Moderate": "#FBBF24",
    "Low-Moderate": "#FBBF24",
    Low: "#DC2626",
  };

  const getCategoryColor = (category) => {
    if (!category) return "#2563EB";
    return categoryColors[category.trim()] || "#2563EB";
  };

  const data = [
    {
      name: "Verbal Ability",
      score: results.verbal_ability_score,
      category: results.verbal_ability,
      color: getCategoryColor(results.verbal_ability),
    },
    {
      name: "Numerical Ability",
      score: results.numerical_ability_score,
      category: results.numerical_ability,
      color: getCategoryColor(results.numerical_ability),
    },
    {
      name: "Logical Reasoning",
      score: results.logical_reasoning_score,
      category: results.logical_reasoning,
      color: getCategoryColor(results.logical_reasoning),
    },
  ];

  const handleTraitClick = (name, sessionId) => {
    const trait = data.find((item) => item.name === name);
    setSelectedTrait(trait);
    setModalOpen(true);
    if (onTraitClick) onTraitClick(name, sessionId);
  };

  return (
    <div
      className="bg-white rounded-2xl xl:p-7 lg:p-6 md:p-5 p-4"
      style={{
        border: "0.5px solid #E2E8F0",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
      }}
    >
      <h3
        className="text-base md:text-lg font-semibold mb-4 text-center sm:text-left"
        style={{ color: "#0F172A" }}
      >
        Your Aptitude Analysis
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleTraitClick(item.name, sessionId)}
          >
            <ATestCard
              name={item.name}
              category={item.category}
              score={item.score}
              color={item.color}
              icon={iconMap[item.name]}
              index={index}
            />
          </div>
        ))}
      </div>

      <div className="pt-6 mt-6" style={{ borderTop: "1px solid #E2E8F0" }}>
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#15803D" }}
            ></div>
            <span style={{ color: "#475569" }}>High (≥70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#B45309" }}
            ></div>
            <span style={{ color: "#475569" }}>Moderate (45-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#FBBF24" }}
            ></div>
            <span style={{ color: "#475569" }}>Low Moderate (30-45%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#DC2626" }}
            ></div>
            <span style={{ color: "#475569" }}>Low (&lt;30%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATestCards;
