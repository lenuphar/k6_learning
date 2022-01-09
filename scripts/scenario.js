import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  scenarios: {
    example_scenario: {
      executor: 'shared-iterations',
      startTime: '0s'
    },
    another_scenario: {
      executor: 'shared-iterations',
      startTime: '5s'
    },
  },
};

export default function () {
  const res = http.get('http://test.k6.io');

  sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
    'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
  });
}