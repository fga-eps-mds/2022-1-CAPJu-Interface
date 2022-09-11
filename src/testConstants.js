export const flowsResponse = {
  Flows: [
    {
      __v: 0,
      _id: '62fd4b16006730249d33b19d',
      createdAt: '2022-08-17T20:09:58.530Z',
      deleted: false,
      name: 'fluxo 1',
      sequences: [
        {
          from: '62fd4ac0006730249d33b185',
          to: '62fd4ac5006730249d33b188'
        },
        {
          from: '62fd4ac5006730249d33b188',
          to: '62fd4acb006730249d33b18b'
        }
      ],
      stages: [
        '62fd4ac0006730249d33b185',
        '62fd4ac5006730249d33b188',
        '62fd4acb006730249d33b18b'
      ],
      updatedAt: '2022-08-17T20:09:58.530Z'
    },
    {
      __v: 0,
      _id: '62fff77dd588ebd8c101a12a',
      createdAt: '2022-08-19T20:50:05.831Z',
      deleted: false,
      name: 'outro Fluxo',
      sequences: [
        {
          from: '62fd4ac0006730249d33b185',
          to: '62fd4ac5006730249d33b188'
        },
        {
          from: '62fd4ac5006730249d33b188',
          to: '62fd4acb006730249d33b18b'
        }
      ],
      stages: [
        '62fd4ac0006730249d33b185',
        '62fd4ac5006730249d33b188',
        '62fd4acb006730249d33b18b'
      ],
      updatedAt: '2022-08-19T20:50:05.831Z'
    }
  ]
};
export const processResponse = {
  processes: [
    {
      _id: '62fd4b7f006730249d33b1ab',
      registro: '1111',
      apelido: 'sdlkfja',
      etapas: [],
      arquivado: false,
      etapaAtual: '62fd4ac0006730249d33b185',
      fluxoId: '62fd4b16006730249d33b19d',
      createdAt: '1660767103499',
      updatedAt: '1660767103499',
      __v: 0
    }
  ]
};

export const stagesResponse = {
  Stages: [
    {
      _id: '62fd4ac0006730249d33b185',
      name: 'etpa c1',
      time: '10',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '62fd4ac5006730249d33b188',
      name: 'etpa c2',
      time: '15',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '62fd4acb006730249d33b18b',
      name: 'etpa c3',
      time: '15',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    },
    {
      _id: '62fd4acb006730249d33b18c',
      name: 'etpa c4',
      time: '12',
      deleted: false,
      createdAt: '2022-08-17T20:08:32.382+00:00',
      updatedAt: '2022-08-17T20:08:32.382+00:00',
      __v: 0
    }
  ]
};
