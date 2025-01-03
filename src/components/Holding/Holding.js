import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../Loader/loading';
import axios from 'axios';

const Holding = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const walletAddress = '0x51a1449b3B6D635EddeC781cD47a99221712De97';
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImVjOGQyZjVjLTMyMDgtNDFmNC05YmQ1LWJlZjczNWZkZTU2NCIsIm9yZ0lkIjoiNDIyODU3IiwidXNlcklkIjoiNDM0ODk1IiwidHlwZUlkIjoiOTQyYzAzZTYtMzAzYy00YjU0LTkxYTItYmM5YzlmMzM5NmE5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzUzMTc5NzUsImV4cCI6NDg5MTA3Nzk3NX0.WQBFahs7ROROD8Oq4Fvk89-dUUJPE5w0abfNmZc8Tls'; // Replace with your actual API key
  const apiUrl = `https://deep-index.moralis.io/api/v2.2/${walletAddress}/erc20`;

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'X-API-Key': apiKey,
          },
        });
        setHoldings(response.data);
      } catch (err) {
        setError('Failed to fetch holdings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [apiUrl, apiKey]);

  if (loading) return <LoadingSpinner/>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ERC-20 Token Holdings</h2>
      <ul style={styles.list}>
        {holdings.map((token) => (
          <li key={token.token_address} style={styles.listItem}>
            <span style={styles.tokenName}>
              <strong>{token.name}</strong> ({token.symbol})
            </span>
            <span style={styles.tokenBalance}>
              {token.balance / Math.pow(10, token.decimals)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  tokenName: {
    fontWeight: 'bold',
    color: '#555',
  },
  tokenBalance: {
    color: '#007BFF',
  },
  loading: {
    textAlign: 'center',
    color: '#007BFF',
    marginTop: '50px',
    fontSize: '18px',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: '50px',
    fontSize: '18px',
  },
};

export default Holding;
