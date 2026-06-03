import { Box, Maximize2, Minus, Plus, Shield, Workflow } from "lucide-react";
import { useLmsStore } from "../store/useLmsStore.js";

const stackSections = [
  {
    id: "applications",
    title: "Applications & Tools",
    color: "#1f6feb",
    icon: Box,
    groups: [
      { title: "HPC Workloads", items: ["MPI / OpenMP", "GPU Programming", "I/O Intensive"] },
      { title: "AI / Data / ML", items: ["Distributed Training", "Inference", "Feature Engineering"] },
      { title: "Visualization & Dev Tools", items: ["ParaView", "Jupyter", "Debuggers"] },
      { title: "Domain Applications", items: ["CFD", "Climate", "Seismic Imaging"] }
    ]
  },
  {
    id: "middleware-resource-management",
    title: "Middleware & Resource Management",
    color: "#e96922",
    icon: Workflow,
    groups: [
      { title: "Job Scheduling", items: ["Slurm", "PBS", "Fairshare"] },
      { title: "Resource Management", items: ["cgroups", "Namespaces", "Node Health"] },
      { title: "Communication Libraries", items: ["MPI", "UCX", "SHMEM"] },
      { title: "Storage & Workflow", items: ["Lustre", "GPFS", "Flux"] }
    ]
  },
  {
    id: "system-software",
    title: "Base System Software",
    color: "#3f8f35",
    icon: Box,
    groups: [
      { title: "Operating Systems", items: ["Linux", "Drivers", "Runtimes"] },
      { title: "Compilers & Toolchains", items: ["GCC", "LLVM", "HIP/CUDA"] },
      { title: "Math & HPC Libraries", items: ["BLAS", "FFT", "Solvers"] },
      { title: "Parallel File Systems", items: ["Lustre", "BeeGFS", "GPFS"] }
    ]
  }
];

const sidePillars = [
  { title: "Monitoring", color: "#d6a52d", items: ["Metrics", "Logs", "Traces", "Alerts"] },
  { title: "Privacy, Safety & Security", color: "#d6a52d", items: ["Access Control", "Encryption", "Isolation", "Audit"] }
];

const hardware = ["Compute Nodes", "Interconnects", "Memory Hierarchy", "Storage", "Networking"];

export default function LearningMap() {
  const { course, activeLayerId, activeLessonId, zoom, setZoom, selectLayer, selectLesson } = useLmsStore();
  const activeLayer = course.modules.find((layer) => layer.id === activeLayerId);

  return (
    <section className="architecture-panel">
      <div className="architecture-toolbar">
        <div className="legend">
          <span><i className="done" /> Selected</span>
          <span><i className="blue" /> Applications</span>
          <span><i className="orange" /> Middleware</span>
          <span><i className="green" /> Base Software</span>
        </div>
        <div className="zoom-controls">
          <button onClick={() => setZoom(zoom - 0.08)} aria-label="Zoom out"><Minus className="h-4 w-4" /></button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(zoom + 0.08)} aria-label="Zoom in"><Plus className="h-4 w-4" /></button>
          <button onClick={() => setZoom(1)} aria-label="Fit map"><Maximize2 className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="architecture-canvas">
        <div className="architecture-inner" style={{ transform: `scale(${zoom})` }}>
          {stackSections.map((section) => {
            const Icon = section.icon;
            const active = section.id === activeLayerId;
            return (
              <section
                key={section.id}
                className={`stack-band ${active ? "active" : ""}`}
                style={{ "--band-color": section.color }}
                onClick={() => section.id !== "applications" && selectLayer(section.id)}
              >
                <h2><Icon className="h-5 w-5" /> {section.title}</h2>
                <div className="stack-groups">
                  {section.groups.map((group) => (
                    <div key={group.title} className="stack-group">
                      <strong>{group.title}</strong>
                      <div>
                        {group.items.map((item) => (
                          <button key={item} onClick={(event) => event.stopPropagation()}>{item}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          <section className="foundation-band">
            <h2>Hardware Foundation</h2>
            <div>
              {hardware.map((item) => <span key={item}>{item}</span>)}
            </div>
          </section>

          <div className="pillar-row">
            {sidePillars.map((pillar) => (
              <section key={pillar.title} className="side-pillar" style={{ "--pillar-color": pillar.color }}>
                <h3><Shield className="h-4 w-4" /> {pillar.title}</h3>
                {pillar.items.map((item) => <span key={item}>{item}</span>)}
              </section>
            ))}
          </div>

          <section className="map-topic-strip">
            <h3>{activeLayer?.title}</h3>
            <div>
              {activeLayer?.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className={lesson.id === activeLessonId ? "active" : ""}
                  onClick={() => selectLesson(lesson.id)}
                >
                  {lesson.title}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
