import { render } from '@testing-library/react';
import Header from '../components/Header';
import renderer from 'react-test-renderer';

test('renders header correctly', () => {
  render(<Header />);
  const tree = renderer.create(<Header/>).toJSON();
  expect(tree).toMatchSnapshot();
});