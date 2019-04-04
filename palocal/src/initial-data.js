const initialData = {
  cards: {
    'card-1': { id: 'card-1', content: 'lecture1' },
    'card-2': { id: 'card-2', content: 'lecture2' },
    'card-3': { id: 'card-3', content: 'lecture3' },
    'card-4': { id: 'card-4', content: 'lecture4' },
    'card-5': { id: 'card-5', content: 'lecture5' }
  },
  flows: {
    'flow-1': {
      id: 'flow-1',
      title: 'Flow 1',
      cardIds: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5']
    },
    'flow-2': {
      id: 'flow-2',
      title: 'Flow 2',
      cardIds: []
    },
    'flow-3': {
      id: 'flow-3',
      title: 'New Flow',
      cardIds: []
    }
  },
  flowOrder: ['flow-1', 'flow-2', 'flow-3']
};

export default initialData;
