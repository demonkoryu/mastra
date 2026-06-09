// Target-type choices shared by the dataset create/edit dialogs. Persisting a dataset's target type
// is what lets the Datasets list classify and filter it as Agent vs Workflow (vs Scorer).
export const DATASET_TARGET_TYPE_OPTIONS = [
  { value: 'agent', label: 'Agent' },
  { value: 'workflow', label: 'Workflow' },
  { value: 'scorer', label: 'Scorer' },
];
