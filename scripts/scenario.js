import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    shopping: {
      executor: 'constant-vus',
      exec: 'contacts',
      vus: 50,
      duration: '20s',
    },
    news: {
      executor: 'per-vu-iterations',
      exec: 'news',
      vus: 50,
      iterations: 100,
      startTime: '10s',
      maxDuration: '1m',
    },
  },
};

options.scenarios.shopping.duration = '23s';

export function contacts() {
  testContact();
}

export function news() {
  http.get('https://test.k6.io/news.php', { tags: { my_custom_tag: 'news' } });
}

function testContact () {
  http.get('https://test.k6.io/contacts.php', {
    tags: { my_custom_tag: 'contacts' },
  });
}