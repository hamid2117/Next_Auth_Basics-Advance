const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'hamid2117',
        mongodb_password: 'hamid2117',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'learningNext',
      },
    }
  }
  return {
    env: {
      mongodb_username: 'hamid2117',
      mongodb_password: 'hamid2117',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'learningNext',
    },
  }
}
