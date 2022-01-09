import http from 'k6/http';

// post method
export function post(url, headers = {}, body = {}) {
	// headers set
	let new_headers = {
		'Content-Type': 'application/json'
	};
	Object.assign(new_headers, headers);
	
	// request
	let res =  http.post(url, JSON.stringify(body), {headers: new_headers});
	let resBodyJson = JSON.parse(res.body);
	return resBodyJson;
}

export function news() {
    http.get('https://test.k6.io/news.php', { tags: { my_custom_tag: 'news' } });
  }