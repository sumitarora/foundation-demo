/* Load test is primarily used to determine the performance of the service in terms of number of concurrent users it can handle or response time.
This is a good test to find out the initial benchmarks that can be used for stress and spike testing

Load test is used to:
- Detarmine service's current performance under typical and peak load
- Determine if you are continuously meeting performance standards as you make changes

*/

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '5s', target: 100 }, // ramp up users to 100 in 1 minute
        { duration: '10s', target: 200 }, // stay at 100 users for 3 minutes
        { duration: '5m', target: 0 }, // ramp down to 0 users in 2 minutes

    ],
    thresholds: {
        http_req_duration: ['p(95)<150'], // 99% of requests should complete within 150ms
    }, 
};

//const API_BASE_URL = 'https://52.226.230.63';

export default () => {

    let response = http.get('https://52.226.230.63/foundations-repo-template/');
    
    sleep(1);
};