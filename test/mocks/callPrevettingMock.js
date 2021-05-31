const success = {
  mock: {
    ok: true,
    status: 200,
    data: {
      messages: [],
      result: {
        reason: 'Eligible for placing another application.',
        elligibleForVetting: true
      },
      successful: false,
      code: 0
    }
  },
  expected: {
    data: {
      partyCharacteristic: [
        {
          name: 'reason',
          value: 'Eligible for placing another application.'
        },
        {
          name: 'elligibleForVetting',
          value: true
        },
        {
          name: 'successful',
          value: false
        },
        {
          name: 'code',
          value: 0
        }
      ]
    }
  }
};

const failure = {
  mock: {
    ok: false,
    error: {
      response: {
        status: 400,
        statusText: 'Bad Request'
      }
    }
  },
  expected: {
    result: {
      status: 400,
      error: 'Bad Request',
      message: 'Bad Request'
    }
  }
};

module.exports = {
  success,
  failure
};
