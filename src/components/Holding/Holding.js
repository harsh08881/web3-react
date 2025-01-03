import React, { useEffect, useState } from "react";
import LoadingSpinner from "../Loader/loading";
import "./hold.css";
import axios from "axios";

const Holding = ({ isDarkMode }) => {
  console.log(isDarkMode);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const walletAddress = "0x51a1449b3B6D635EddeC781cD47a99221712De97";
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImVjOGQyZjVjLTMyMDgtNDFmNC05YmQ1LWJlZjczNWZkZTU2NCIsIm9yZ0lkIjoiNDIyODU3IiwidXNlcklkIjoiNDM0ODk1IiwidHlwZUlkIjoiOTQyYzAzZTYtMzAzYy00YjU0LTkxYTItYmM5YzlmMzM5NmE5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzUzMTc5NzUsImV4cCI6NDg5MTA3Nzk3NX0.WQBFahs7ROROD8Oq4Fvk89-dUUJPE5w0abfNmZc8Tls";
  const apiUrl = `https://deep-index.moralis.io/api/v2.2/${walletAddress}/erc20`;

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "X-API-Key": apiKey,
          },
        });
        setHoldings(response.data);
      } catch (err) {
        setError("Failed to fetch holdings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [apiUrl, apiKey]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className={isDarkMode ? "error-dark" : "error"}>{error}</div>;

  return (
    <div className={isDarkMode ? "container-dark" : "container"}>
      <h2 className={isDarkMode ? "title-dark" : "title"}>
        ERC-20 Token Holdings
      </h2>
      <ul className={isDarkMode ? "list-dark" : "list"}>
        {holdings.map((token) => (
          <li
            key={token.token_address}
            className={isDarkMode ? "list-item-dark" : "list-item"}
          >
            <span className={isDarkMode ? "token-name-dark" : "token-name"}>
              <strong>{token.name}</strong> ({token.symbol})
            </span>
            <span
              className={isDarkMode ? "token-balance-dark" : "token-balance"}
            >
              {(token.balance / Math.pow(10, token.decimals)).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Holding;
