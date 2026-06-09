import type { DatasetRecord } from '@mastra/client-js';

export const DATASET_TARGET_OPTIONS = [
  { value: 'all', label: 'All targets' },
  { value: 'agent', label: 'Agent' },
  { value: 'workflow', label: 'Workflow' },
] as const;

export const DATASET_EXPERIMENT_OPTIONS = [
  { value: 'all', label: 'All datasets' },
  { value: 'with', label: 'With experiments' },
  { value: 'without', label: 'Without experiments' },
] as const;

/** A dataset's `targetType` is the source of truth, but no create/import path populates it today,
 *  so it's almost always null. When absent, fall back to the distinct target type(s) of the
 *  dataset's experiments so the Target column and the Agent/Workflow filter can still classify it.
 *  Returns one type when known, several for a dataset whose experiments span both. */
export function getDatasetTargetTypes(
  targetType: string | null | undefined,
  experiments: Array<{ targetType?: string | null }>,
): string[] {
  if (targetType) return [targetType];
  return Array.from(new Set(experiments.map(e => e.targetType).filter((t): t is string => Boolean(t))));
}

export function getDatasetTagOptions(datasets: DatasetRecord[]) {
  const tagSet = new Set<string>();

  for (const dataset of datasets) {
    if (!Array.isArray(dataset.tags)) continue;

    for (const tag of dataset.tags as string[]) {
      tagSet.add(tag);
    }
  }

  return [
    { value: 'all', label: 'All tags' },
    ...Array.from(tagSet)
      .sort()
      .map(tag => ({ value: tag, label: tag })),
  ];
}
