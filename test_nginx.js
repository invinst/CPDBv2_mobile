const request = require('request');
const _ = require('lodash');
require('should');


const baseUrl = `http://${process.env.MOBILE_DOMAIN}`;
const mobileAgentStr = [
  'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 ',
  '(KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
].join('');


describe('nginx config', () => {
  const empty = { expectHeadersNotPresent: [], headers: {} };

  const preventIframe = path => Object.assign({}, empty, {
    path,
    expectedCode: 200,
    headers: {
      'user-agent': mobileAgentStr
    },
    title: `prevent rendering ${path} in iframe`,
    expectedHeaders: { 'x-frame-options': 'SAMEORIGIN' }
  });

  const allowIframe = path => Object.assign({}, empty, {
    path,
    expectedCode: 200,
    headers: {
      'user-agent': mobileAgentStr
    },
    title: `allow rendering ${path} in iframe`,
    expectHeadersNotPresent: ['x-frame-options']
  });

  const desktopRedirect = path => Object.assign({}, empty, {
    path,
    expectedCode: 301,
    title: `mobile redirect for ${path}`,
    expectedHeaders: { 'location': `https://${process.env.DESKTOP_SERVER_NAME}${path}` }
  });

  const redirect = (path, toPath) => Object.assign({}, empty, {
    path,
    title: `redirect from ${path} to ${toPath}`,
    headers: {
      'user-agent': mobileAgentStr
    },
    expectedCode: 301,
    expectedHeaders: { 'location': `http://${process.env.MOBILE_DOMAIN}${toPath}` }
  });

  const notRedirect = (path) => Object.assign({}, empty, {
    path,
    headers: {
      'user-agent': mobileAgentStr
    },
    title: `not redirect from ${path}`,
    expectedCode: 200
  });

  const testCases = [
    preventIframe('/'),
    preventIframe('/officer/123/jerome-finnigan/'),
    preventIframe('/cr/123/'),
    preventIframe('/trr/123/'),
    allowIframe('/embed/top-officers-page/'),
    allowIframe('/embed/officers/'),
    allowIframe('/assets/favicon-16x16.ico'),
    desktopRedirect('/'),
    desktopRedirect('/officer/123/jerome-finnigan/'),
    desktopRedirect('/cr/123/'),
    desktopRedirect('/trr/123/'),
    redirect('/officer/robbin-parker/21860/', '/officer/21860/robbin-parker/'),
    redirect('/documents', '/documents/'),
    redirect('/documents?match=abc', '/documents/?match=abc'),
    notRedirect('/documents/abc.pdf'),
  ];

  const func = testCase => done => {
    request({
      followRedirect: false,
      url: `${baseUrl}${testCase.path}`,
      headers: testCase.headers
    }, (error, response, body) => {
      response.statusCode.should.eql(testCase.expectedCode);
      for (let pair of _.toPairs(testCase.expectedHeaders)) {
        const [header, value] = pair;
        response.headers[header].should.eql(value);
      }
      for (let header of testCase.expectHeadersNotPresent) {
        response.headers.should.not.have.keys(header);
      }
      done();
    });
  };

  for (let testCase of testCases) {
    it(testCase.title, func(testCase));
  }
});
