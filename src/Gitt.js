import React, { useEffect, useState } from 'react';

const Gitt= () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetch('/github/callback')
      .then((response) => response.json())
      .then((data) => setRepositories(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>GitHub Repositories</h1>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Gitt;
