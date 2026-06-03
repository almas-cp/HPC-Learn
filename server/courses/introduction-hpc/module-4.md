---
{
  "id": "middleware-resource-management",
  "title": "Middleware & Resource Management",
  "description": "Schedulers, queues, job arrays, workflow engines, provisioning, and data movement services.",
  "order": 4,
  "estimatedMinutes": 63,
  "color": "#e96922",
  "dependencies": ["system-software"],
  "outcomes": ["Submit batch jobs", "Read queue states", "Understand workflow and provisioning layers"],
  "lessons": [
    {
      "id": "middleware-schedulers",
      "title": "Schedulers and Batch Queues",
      "overview": "Schedulers allocate shared cluster resources according to policies, priorities, dependencies, reservations, and fairshare.",
      "lessonType": "code",
      "order": 1,
      "estimatedMinutes": 22,
      "learningObjectives": ["Write a basic batch script", "Explain queue states", "Understand fairshare and limits"],
      "content": [
        { "type": "paragraph", "body": "Users usually do not SSH into compute nodes directly. They submit jobs to a scheduler such as Slurm or PBS. The scheduler decides when and where the job runs based on requested resources, queue policy, priority, reservations, and current cluster state." },
        { "type": "code", "language": "bash", "body": "#!/bin/bash\n#SBATCH --job-name=mpi-demo\n#SBATCH --nodes=4\n#SBATCH --ntasks-per-node=64\n#SBATCH --time=00:30:00\n#SBATCH --partition=cpu\nmodule load openmpi\nsrun ./simulation" },
        { "type": "diagram", "title": "Job Lifecycle", "nodes": ["Submit", "Pending", "Running", "Completing", "Finished"] },
        { "type": "example", "body": "A job may remain pending because requested nodes are unavailable, the account has fairshare limits, or a dependency has not completed." }
      ],
      "summary": "Schedulers turn shared cluster resources into an orderly service with policies, accounting, and reproducible job execution.",
      "quiz": [
        { "id": "q-sch-1", "question": "Why submit jobs through a scheduler?", "choices": ["To allocate shared resources according to policy", "To edit images", "To bypass accounting", "To remove all wait time"], "answer": 0, "explanation": "Schedulers coordinate multi-user resource allocation." },
        { "id": "q-sch-2", "question": "What does a Slurm time limit specify?", "choices": ["Maximum wall-clock runtime", "Number of source files", "User password age", "Storage block size"], "answer": 0, "explanation": "The time limit controls wall-clock allocation." }
      ],
      "flashcards": [
        { "id": "fc-sch-1", "front": "Pending job", "back": "A submitted job waiting for resources, policy priority, or dependencies." },
        { "id": "fc-sch-2", "front": "Fairshare", "back": "A policy mechanism that balances resource access across users or projects." }
      ]
    },
    {
      "id": "middleware-workflows",
      "title": "Workflows and Job Arrays",
      "overview": "Complex studies combine many jobs with dependencies, parameter sweeps, data staging, and post-processing.",
      "lessonType": "text",
      "order": 2,
      "estimatedMinutes": 20,
      "learningObjectives": ["Use job arrays conceptually", "Explain workflow dependencies", "Recognize data staging needs"],
      "content": [
        { "type": "paragraph", "body": "Many scientific campaigns are not one job. They are pipelines of preprocessing, simulation, analysis, visualization, and archival steps. Workflow tools capture these dependencies so work can resume after failures and use resources efficiently." },
        { "type": "paragraph", "body": "Job arrays are useful when the same program runs many times with different inputs. They reduce scheduler overhead and make parameter sweeps easier to manage." },
        { "type": "code", "language": "bash", "body": "#SBATCH --array=1-500\nPARAM=$(sed -n \"${SLURM_ARRAY_TASK_ID}p\" params.txt)\nsrun ./model --config \"$PARAM\"" },
        { "type": "diagram", "title": "Workflow Shape", "nodes": ["Prepare data", "Run array", "Aggregate results", "Visualize", "Archive"] }
      ],
      "summary": "Workflows express dependencies and repeatable campaigns, while job arrays efficiently handle many similar tasks.",
      "quiz": [
        { "id": "q-wf-1", "question": "When is a job array useful?", "choices": ["Running many similar jobs with different parameters", "Replacing a file system", "Installing a CPU", "Creating a user password"], "answer": 0, "explanation": "Arrays are built for repeated job patterns." },
        { "id": "q-wf-2", "question": "What is a workflow dependency?", "choices": ["A rule that one step waits for another", "A GPU memory size", "A network cable type", "A compiler license"], "answer": 0, "explanation": "Dependencies order pipeline stages." }
      ],
      "flashcards": [
        { "id": "fc-wf-1", "front": "Job array", "back": "A scheduler feature for running many similar tasks under one job definition." },
        { "id": "fc-wf-2", "front": "Workflow engine", "back": "Software that coordinates multi-step computational pipelines and dependencies." }
      ]
    },
    {
      "id": "middleware-provisioning-data",
      "title": "Provisioning and Data Movement",
      "overview": "Cluster middleware also handles node imaging, configuration, health checks, data staging, and policy enforcement.",
      "lessonType": "text",
      "order": 3,
      "estimatedMinutes": 21,
      "learningObjectives": ["Explain provisioning", "Describe data movement tools", "Connect health checks to scheduler availability"],
      "content": [
        { "type": "paragraph", "body": "Provisioning systems install operating system images, configure services, apply security settings, and return nodes to a known good state. This is essential for repeatable operations at thousands of nodes." },
        { "type": "paragraph", "body": "Data movement services move datasets between archive, object storage, campaign storage, and scratch. Good workflows stage data close to compute and avoid repeatedly reading cold storage." },
        { "type": "diagram", "title": "Operational Middleware", "nodes": ["Provision", "Configure", "Health check", "Drain or resume", "Stage data"] },
        { "type": "example", "body": "If a GPU health check fails, automation can drain the node from the scheduler, open an incident, and keep user jobs away until repair." }
      ],
      "summary": "Operational middleware keeps clusters consistent, healthy, and ready for scheduled workloads.",
      "quiz": [
        { "id": "q-prov-1", "question": "What does provisioning do?", "choices": ["Installs and configures nodes into a known state", "Writes quiz questions", "Draws charts only", "Replaces all user code"], "answer": 0, "explanation": "Provisioning prepares nodes for operation." },
        { "id": "q-prov-2", "question": "Why drain an unhealthy node?", "choices": ["To keep jobs from running on unreliable hardware", "To make it faster for all jobs", "To remove it from inventory permanently", "To change course content"], "answer": 0, "explanation": "Draining protects user jobs from known bad nodes." }
      ],
      "flashcards": [
        { "id": "fc-prov-1", "front": "Provisioning", "back": "Automated installation and configuration that returns nodes to a known state." },
        { "id": "fc-prov-2", "front": "Node drain", "back": "Marking a node unavailable for new jobs, often due to health or maintenance." }
      ]
    }
  ]
}
---
