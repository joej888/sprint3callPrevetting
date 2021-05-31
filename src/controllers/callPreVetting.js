const config = require('config');
const { Sentry } = require('vod-npm-sentry');
const sentryCategory = config.get('sentry.categories.callPrevetting');
const { vettingService } = require('vod-npm-services');
const prometheusClient = require('restify-prom-bundle').client;

const generateCallPrevettingErr = new prometheusClient.Counter({
  name: 'app_call_prevetting_error_count',
  help: 'vod-ms-vetting authentication error'
});

exports.handler = async function callPrevetting(req, res, next) {
  Sentry.info('Beginning callPrevetting...', {}, sentryCategory);

  const params = {
    headers: req.headers,
    idNumber: req.query.idNumber,
    idType: req.query.idType
  };

  const response = await vettingService.validateCustomer(req, params);

  if (!response.ok) {
    generateCallPrevettingErr.inc();
    return next(response.error);
  }

  res.status(response.status);
  res.json({
    partyCharacteristic: [
      {
        name: 'reason',
        value: response.data.result.reason
      },
      {
        name: 'elligibleForVetting',
        value: response.data.result.elligibleForVetting
      },
      {
        name: 'successful',
        value: response.data.successful
      },
      {
        name: 'code',
        value: response.data.code
      }
    ]
  });
  return next();
};
