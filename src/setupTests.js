jest.mock('./services/config.js', () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return { headers: null };
    })
  };
});

jest.mock('react-dropdown', () => ({ options, value, onChange }) => {
  return (
    <select
      data-testid="react-select-mock"
      value={value}
      onChange={(e) => onChange(e.target)}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});
jest.mock('react-flow-renderer');
