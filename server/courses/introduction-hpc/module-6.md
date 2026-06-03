---
{
  "id": "ai-on-hpc",
  "title": "AI on HPC",
  "description": "Training and inference on clusters, distributed deep learning, data pipelines, and hybrid scientific AI workflows.",
  "order": 6,
  "estimatedMinutes": 62,
  "color": "#7c4dff",
  "dependencies": ["parallel-programming"],
  "outcomes": ["Map AI workflows to HPC resources", "Explain distributed training", "Identify data and checkpoint bottlenecks"],
  "lessons": [
    {
      "id": "ai-training-inference",
      "title": "AI Workloads on Clusters",
      "overview": "AI workloads use HPC clusters for large-scale training, inference, simulation surrogates, foundation models, and analysis pipelines.",
      "lessonType": "video",
      "videoUrl": "https://www.youtube.com/results?search_query=AI+on+HPC+distributed+training",
      "order": 1,
      "estimatedMinutes": 20,
      "learningObjectives": ["Distinguish training and inference", "Recognize GPU resource needs", "Connect AI to scientific workflows"],
      "content": [
        { "type": "paragraph", "body": "Training adjusts model parameters using data and optimization. Inference uses a trained model to produce predictions. Both can require GPUs, but training usually has higher communication, memory, and checkpoint demands." },
        { "type": "paragraph", "body": "HPC centers increasingly support AI for simulation surrogates, workflow steering, data reduction, model fine-tuning, and foundation model training. These jobs share cluster resources with traditional simulations." },
        { "type": "diagram", "title": "AI Workflow", "nodes": ["Curate data", "Train", "Validate", "Checkpoint", "Infer", "Analyze"] },
        { "type": "example", "body": "A climate model may generate simulation data, train a neural surrogate for a subgrid process, then run the surrogate inside future simulations." }
      ],
      "summary": "AI on HPC combines accelerator-heavy training or inference with scientific data pipelines and traditional simulation workflows.",
      "quiz": [
        { "id": "q-ai-1", "question": "What is inference?", "choices": ["Using a trained model to make predictions", "Updating all model weights from scratch", "Installing operating systems", "Scheduling storage repairs"], "answer": 0, "explanation": "Inference applies a trained model." },
        { "id": "q-ai-2", "question": "Why can AI training stress storage?", "choices": ["Large datasets and frequent checkpoints", "Because it never reads files", "Because models contain no data", "Because GPUs replace storage"], "answer": 0, "explanation": "Training pipelines move large datasets and checkpoint states." }
      ],
      "flashcards": [
        { "id": "fc-ai-1", "front": "Training", "back": "Optimizing model parameters from data." },
        { "id": "fc-ai-2", "front": "Inference", "back": "Applying a trained model to produce predictions or embeddings." }
      ]
    },
    {
      "id": "ai-distributed-training",
      "title": "Distributed Training",
      "overview": "Distributed training coordinates many GPUs through data, tensor, pipeline, and expert parallel patterns.",
      "lessonType": "interactive-diagram",
      "order": 2,
      "estimatedMinutes": 22,
      "learningObjectives": ["Explain data parallelism", "Identify collective communication", "Recognize scaling bottlenecks"],
      "content": [
        { "type": "paragraph", "body": "In data parallel training, each GPU processes a different mini-batch and gradients are synchronized with collectives such as all-reduce. Larger models may also need tensor, pipeline, or expert parallelism to split model state across devices." },
        { "type": "paragraph", "body": "Training efficiency depends on GPU utilization, input pipeline speed, communication overlap, checkpoint cadence, and failure recovery. A job can have many GPUs idle while waiting for data or collectives." },
        { "type": "diagram", "title": "Training Loop", "nodes": ["Load batch", "Forward pass", "Backward pass", "All-reduce gradients", "Optimizer step"] },
        { "type": "code", "language": "bash", "body": "torchrun --nnodes=8 --nproc_per_node=8 train.py --data /scratch/dataset --checkpoint /campaign/run42" }
      ],
      "summary": "Distributed training is a communication-heavy parallel workload where data pipelines and collectives determine scaling.",
      "quiz": [
        { "id": "q-ddp-1", "question": "What does all-reduce commonly synchronize in data-parallel training?", "choices": ["Gradients", "User passwords", "File names only", "Browser routes"], "answer": 0, "explanation": "Data parallel workers combine gradients before updating model weights." },
        { "id": "q-ddp-2", "question": "What can leave GPUs idle during training?", "choices": ["Slow input pipelines or communication waits", "Too much available memory only", "Having a scheduler", "Using notes"], "answer": 0, "explanation": "Bottlenecks outside the GPU compute kernels can starve devices." }
      ],
      "flashcards": [
        { "id": "fc-ddp-1", "front": "Data parallel training", "back": "Each worker processes different data and synchronizes gradients." },
        { "id": "fc-ddp-2", "front": "All-reduce", "back": "A collective operation that combines values from all workers and returns the result to all workers." }
      ]
    },
    {
      "id": "ai-data-checkpoints",
      "title": "Data Pipelines and Checkpoints",
      "overview": "Large AI jobs need careful data layout, caching, checkpoint strategy, and recovery planning.",
      "lessonType": "text",
      "order": 3,
      "estimatedMinutes": 20,
      "learningObjectives": ["Explain checkpoint purpose", "Identify data loader bottlenecks", "Plan storage-friendly AI runs"],
      "content": [
        { "type": "paragraph", "body": "Training jobs read many samples repeatedly. Data should be sharded, cached, and staged to avoid creating small-file storms. Formats that support large sequential reads often outperform millions of individual files." },
        { "type": "paragraph", "body": "Checkpoints save model state so jobs can resume after wall-time limits, preemption, or failures. The checkpoint interval balances lost work against I/O overhead and storage usage." },
        { "type": "diagram", "title": "Storage-Friendly Training", "nodes": ["Shard data", "Prefetch", "Train", "Checkpoint", "Resume"] },
        { "type": "example", "body": "Instead of 80 million tiny images on a shared file system, a team may convert data into larger shards and cache hot shards on local NVMe." }
      ],
      "summary": "AI performance often depends as much on data engineering and checkpoint discipline as on GPU count.",
      "quiz": [
        { "id": "q-check-1", "question": "Why write checkpoints?", "choices": ["To resume training after limits or failures", "To delete all training data", "To avoid model validation", "To replace the scheduler"], "answer": 0, "explanation": "Checkpoints preserve recoverable training state." },
        { "id": "q-check-2", "question": "Why avoid millions of tiny files for training input?", "choices": ["Metadata overhead can bottleneck the file system", "GPUs cannot read numbers", "It prevents Python imports", "It changes model accuracy automatically"], "answer": 0, "explanation": "Tiny-file workloads can overload metadata services." }
      ],
      "flashcards": [
        { "id": "fc-check-1", "front": "Checkpoint", "back": "Saved model and optimizer state used to resume training." },
        { "id": "fc-check-2", "front": "Training data sharding", "back": "Packing samples into larger chunks to improve throughput and reduce metadata load." }
      ]
    }
  ]
}
---
