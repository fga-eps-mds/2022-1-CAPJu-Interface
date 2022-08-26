jest.mock('./services/config.js', () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return { headers: null };
    })
  };
});
