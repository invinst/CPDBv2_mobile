const mockToasts = [
  {
    name: 'OFFICER',
    template: '{full_name} {action_type} pinboard',
  },
  {
    name: 'CR',
    template: 'CR #{crid} {action_type} pinboard',
  },
  {
    name: 'TRR',
    template: 'TRR #{id} {action_type} pinboard',
  },
];

module.exports = {
  mockToasts: mockToasts,
};
