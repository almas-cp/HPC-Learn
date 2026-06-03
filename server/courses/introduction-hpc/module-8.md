---
{
  "id": "performance-optimization",
  "title": "Performance Optimization",
  "description": "Measurement, profiling, roofline thinking, scaling studies, I/O tuning, and optimization workflow.",
  "order": 8,
  "estimatedMinutes": 68,
  "color": "#0ea5a5",
  "dependencies": ["monitoring-security"],
  "outcomes": ["Profile before optimizing", "Interpret scaling curves", "Apply a disciplined optimization loop"],
  "lessons": [
    {
      "id": "optimization-method",
      "title": "Measure Before You Tune",
      "overview": "Optimization starts with a reproducible baseline, representative inputs, clear metrics, and evidence from profilers or counters.",
      "lessonType": "text",
      "order": 1,
      "estimatedMinutes": 22,
      "learningObjectives": ["Build an optimization baseline", "Avoid premature tuning", "Select meaningful metrics"],
      "content": [
        { "type": "paragraph", "body": "The first optimization step is to define what matters: time to solution, throughput, cost, energy, memory footprint, queue wait, or accuracy. A change that improves kernel speed but increases total workflow time may not be a real win." },
        { "type": "paragraph", "body": "Use representative datasets, fixed software versions, repeatable launch scripts, and recorded hardware placement. Without a stable baseline, performance changes can be noise from the scheduler, file system, or input size." },
        { "type": "diagram", "title": "Optimization Loop", "nodes": ["Baseline", "Profile", "Hypothesize", "Change one thing", "Measure", "Document"] },
        { "type": "example", "body": "Before rewriting a solver, a team profiles it and discovers 60 percent of wall time is spent reading small files during startup. The highest-impact fix is data layout, not math kernels." }
      ],
      "summary": "Reliable tuning is a controlled experiment. Measure the whole workflow, change one thing, and keep evidence.",
      "quiz": [
        { "id": "q-opt-1", "question": "What should come before tuning?", "choices": ["A reproducible baseline and measurement", "Changing random flags", "Deleting logs", "Buying storage without evidence"], "answer": 0, "explanation": "Optimization needs a baseline and evidence." },
        { "id": "q-opt-2", "question": "Why use representative inputs?", "choices": ["Small toy inputs may hide real bottlenecks", "They make syntax irrelevant", "They avoid all need for profiling", "They guarantee perfect scaling"], "answer": 0, "explanation": "Performance behavior can change with realistic problem sizes." }
      ],
      "flashcards": [
        { "id": "fc-opt-1", "front": "Optimization baseline", "back": "A reproducible reference run used to compare tuning changes." },
        { "id": "fc-opt-2", "front": "Optimization loop", "back": "Baseline, profile, hypothesize, change one thing, measure, document." }
      ]
    },
    {
      "id": "optimization-scaling-roofline",
      "title": "Scaling and Roofline Thinking",
      "overview": "Strong scaling, weak scaling, and roofline analysis help explain whether performance is limited by compute, memory, or communication.",
      "lessonType": "interactive-diagram",
      "order": 2,
      "estimatedMinutes": 24,
      "learningObjectives": ["Compare strong and weak scaling", "Interpret roofline concepts", "Recognize diminishing returns"],
      "content": [
        { "type": "paragraph", "body": "Strong scaling keeps the problem size fixed while increasing resources. Weak scaling grows the problem size with resources. Strong scaling eventually hits limits because each worker gets less useful work while communication and synchronization remain." },
        { "type": "paragraph", "body": "Roofline analysis relates arithmetic intensity to attainable performance. Low arithmetic intensity workloads are often memory-bandwidth bound; high intensity workloads can approach compute ceilings if they vectorize and use hardware well." },
        { "type": "code", "language": "text", "body": "arithmetic_intensity = floating_point_operations / bytes_moved" },
        { "type": "diagram", "title": "Scaling Questions", "nodes": ["Fixed problem?", "Growing problem?", "Memory traffic?", "Network traffic?", "Compute ceiling?"] }
      ],
      "summary": "Scaling studies reveal parallel limits, while roofline thinking separates compute-bound and memory-bound behavior.",
      "quiz": [
        { "id": "q-scale-1", "question": "What is strong scaling?", "choices": ["Fixed problem size with increasing resources", "Increasing problem size with resources", "Changing only the file name", "Using no communication"], "answer": 0, "explanation": "Strong scaling measures speedup for a fixed workload." },
        { "id": "q-scale-2", "question": "What does arithmetic intensity compare?", "choices": ["Operations to bytes moved", "Users to passwords", "Jobs to flashcards", "Files to dashboards"], "answer": 0, "explanation": "Roofline uses operations per byte moved." }
      ],
      "flashcards": [
        { "id": "fc-scale-1", "front": "Strong scaling", "back": "Increasing resources for a fixed problem size." },
        { "id": "fc-scale-2", "front": "Weak scaling", "back": "Increasing resources while growing the problem size proportionally." }
      ]
    },
    {
      "id": "optimization-io-workflow",
      "title": "I/O and Workflow Tuning",
      "overview": "End-to-end performance includes file formats, checkpoint cadence, staging, metadata behavior, scheduler efficiency, and visualization pipelines.",
      "lessonType": "code",
      "order": 3,
      "estimatedMinutes": 22,
      "learningObjectives": ["Identify I/O bottlenecks", "Tune checkpoint and output patterns", "Optimize whole workflows instead of isolated kernels"],
      "content": [
        { "type": "paragraph", "body": "I/O tuning is often about reducing avoidable operations: fewer tiny files, better collective writes, appropriate stripe counts, local scratch for temporary data, and data formats designed for parallel access." },
        { "type": "paragraph", "body": "Workflow tuning looks at the path from input staging to final analysis. A simulation that runs faster but produces output that takes days to analyze may shift the bottleneck rather than remove it." },
        { "type": "code", "language": "bash", "body": "# Example checklist\n# 1. batch small outputs into larger files\n# 2. write checkpoints at measured intervals\n# 3. stage hot input on node-local scratch\n# 4. postprocess near the data" },
        { "type": "example", "body": "Switching from per-rank text logs to aggregated structured output can reduce metadata load and make downstream analysis faster." }
      ],
      "summary": "The best optimization target is the bottleneck in the full workflow, not necessarily the most visible kernel.",
      "quiz": [
        { "id": "q-io-1", "question": "What can reduce metadata pressure?", "choices": ["Aggregating many tiny outputs into fewer larger files", "Creating more tiny files", "Disabling all monitoring", "Ignoring checkpoint size"], "answer": 0, "explanation": "Fewer larger files can reduce metadata load." },
        { "id": "q-io-2", "question": "Why optimize the whole workflow?", "choices": ["A local speedup can move the bottleneck elsewhere", "Kernels never matter", "Storage is always free", "Schedulers cannot affect runtime"], "answer": 0, "explanation": "End-to-end time matters to users." }
      ],
      "flashcards": [
        { "id": "fc-io-1", "front": "Metadata bottleneck", "back": "A slowdown caused by too many file create, stat, open, or close operations." },
        { "id": "fc-io-2", "front": "Workflow tuning", "back": "Improving end-to-end time across staging, compute, output, analysis, and archive." }
      ]
    }
  ]
}
---
