import { Activity, ArrowRight, Clock, Target } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatTime } from "../../lib/selectors.js";

export default function MasteryPanel({ analytics }) {
  const moduleData = analytics?.moduleCompletion?.map((module) => ({
    name: module.title.replace(" & ", " "),
    mastery: module.mastery
  })) || [];

  const mastery = analytics?.masteryScore || 0;

  return (
    <div className="side-card">
      <div className="card-heading"><Target className="h-5 w-5 text-blue" /> Mastery Analytics</div>
      <div className="mastery-grid">
        <ResponsiveContainer width="100%" height={148}>
          <PieChart>
            <Pie data={[{ name: "Mastery", value: mastery }, { name: "Remaining", value: 100 - mastery }]} innerRadius={42} outerRadius={62} dataKey="value" startAngle={90} endAngle={-270}>
              <Cell fill="#52ad46" />
              <Cell fill="#e7edf5" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="mastery-number">
          <strong>{mastery}%</strong>
          <span>{mastery >= 80 ? "Strong" : mastery >= 55 ? "Building" : "Early"}</span>
        </div>
      </div>

      <div className="metric-row"><Activity className="h-4 w-4 text-blue" /> Quiz accuracy <strong>{analytics?.quizAccuracy || 0}%</strong></div>
      <div className="metric-row"><Clock className="h-4 w-4 text-amber" /> Time spent <strong>{formatTime(analytics?.timeSpentSeconds || 0)}</strong></div>

      <div className="mini-chart">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={moduleData} layout="vertical" margin={{ left: 0, right: 12, top: 4, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis dataKey="name" type="category" width={92} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="mastery" fill="#1f6feb" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="recommendation">
        <span>Recommended next</span>
        <strong>{analytics?.recommendedLesson?.title || "Start the course"}</strong>
        <small>{analytics?.weakAreas?.length ? `Review: ${analytics.weakAreas.join(", ")}` : "No weak areas yet."}</small>
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}
