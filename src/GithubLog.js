import React, { useEffect } from 'react';
import axios from 'axios';

const GithubLog = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // Exchange code for access token
      const requestData = {
        client_id: 'ffabbc45dc50b14659c8',
        client_secret: 'd9672c49ec5c50fad186d27307298290da428634',
        code,
      };

      const config = {
        headers: {
          'Accept': 'application/json',
        },
      };

      axios
        .post('https://github.com/login/oauth/access_token', requestData, config)
        .then((response) => {
          const accessToken = new URLSearchParams(response.data).get('access_token');
          // Now you can use the access token for GitHub API requests
          console.log('GitHub Access Token:', accessToken);
        })
        .catch((error) => {
          console.error('GitHub access token error:', error);
        });
    }
  }, []);

  return <div>GithubLog</div>;
};

export default GithubLog;
