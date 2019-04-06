const initialData = {
  cards: {
    'card-1': { id: 'card-1', content: 'lecture1.pdf', type: 'pdf' },
    'card-2': { id: 'card-2', content: 'lecture2.pdf', type: 'pdf' },
    'card-3': { id: 'card-3', content: 'lecture3.pdf', type: 'pdf' },
    'card-4': { id: 'card-4', content: 'lecture4.pdf', type: 'pdf' },
    'card-5': { id: 'card-5', content: 'lecture5.pdf', type: 'pdf' },
    'card-6': { id: 'card-6', content: '-MZ8guTxcFU', type: 'video' },
    'card-7': { id: 'card-7', content: 'e-9aaLDIb_Y', type: 'video' },
    'card-8': { id: 'card-8', content: 'xx3RoYg651I', type: 'video' },
    'card-9': { id: 'card-9', content: '1.jpg', type: 'image' },
    'card-10': { id: 'card-10', content: '2.jpg', type: 'image' },
    'card-11': { id: 'card-11', content: '3.jpg', type: 'image' }
  },
  flows: {
    'flow-1': {
      id: 'flow-1',
      title: 'New Flow',
      cardIds: ['card-1', 'card-2']
    },
    'flow-1-1': {
      id: 'flow-1-1',
      title: 'Video',
      cardIds: ['card-6']
    },
    'flow-1-2': {
      id: 'flow-1-2',
      title: 'Image',
      cardIds: ['card-9']
    },
    'flow-2': {
      id: 'flow-2',
      title: 'New Flow',
      cardIds: ['card-3', 'card-4']
    },
    'flow-2-1': {
      id: 'flow-2-1',
      title: 'Video',
      cardIds: ['card-7']
    },
    'flow-2-2': {
      id: 'flow-2-2',
      title: 'Image',
      cardIds: ['card-10']
    },
    'flow-3': {
      id: 'flow-3',
      title: 'New Flow',
      cardIds: ['card-5']
    },
    'flow-3-1': {
      id: 'flow-3-1',
      title: 'Video',
      cardIds: ['card-8']
    },
    'flow-3-2': {
      id: 'flow-3-2',
      title: 'Image',
      cardIds: ['card-11']
    }
  },
  flowOrder: ['flow-1', 'flow-2', 'flow-3']
};

export default initialData;
