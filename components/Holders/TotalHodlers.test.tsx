import { screen, render } from '@testing-library/react';
import snapshotDiff from 'snapshot-diff';
import TotalHodlers from './TotalHodlers';
import { testData } from './test.fixture';

test('render total holders with loading pre-screen', async () => {
  const { asFragment, rerender } = render(<TotalHodlers loading />);
  const firstRender = asFragment();
  expect(firstRender).toMatchSnapshot('loading');
  rerender(
    <TotalHodlers loading={false} data={{ dailyHoldersStates: testData }} />
  );
  await screen.findByText('6,341');
  await screen.findByText('-0.02%');
  await screen.findByText('+0.02%');
  await screen.findByText('+0.89%');
  expect(snapshotDiff(firstRender, asFragment())).toMatchSnapshot('loaded');
});
