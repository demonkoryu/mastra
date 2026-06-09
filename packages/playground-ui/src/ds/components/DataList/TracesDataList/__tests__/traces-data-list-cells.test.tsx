// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TracesDataListEntityCell } from '../traces-data-list-cells';

afterEach(cleanup);

// The stored `EntityType` enum is lowercase (`agent`, `workflow_run`). The icon switch used to
// match only uppercase, so real traces rendered no Agent/Workflow icon. These guard the casing fix.
describe('TracesDataListEntityCell entity icon', () => {
  const renderCell = (entityType: string) => render(<TracesDataListEntityCell entityType={entityType} entityName="x" />);

  it('renders an icon for the lowercase stored value "agent"', () => {
    expect(renderCell('agent').container.querySelector('svg')).not.toBeNull();
  });

  it('renders an icon for the lowercase stored value "workflow_run"', () => {
    expect(renderCell('workflow_run').container.querySelector('svg')).not.toBeNull();
  });

  it('still renders an icon for legacy uppercase values', () => {
    expect(renderCell('AGENT').container.querySelector('svg')).not.toBeNull();
    expect(renderCell('WORKFLOW').container.querySelector('svg')).not.toBeNull();
  });

  it('renders no icon for entity types that are neither agent nor workflow', () => {
    expect(renderCell('memory').container.querySelector('svg')).toBeNull();
  });
});
