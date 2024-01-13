import React, { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import "./history.css";
import { formatDate } from "../../utils/formateDate.js";
import { Header, TransactionCard } from "../../components/index.js";

const History = () => {
  const { user } = useContext(Context);

  // Sort transactions in descending order based on the date
  const sortedTransactions = user?.transactions
    ? [...user.transactions].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <div className="history-page">
      <Header />
      <div className="show-history pi-1">
        {sortedTransactions.map((transaction) => (
          <TransactionCard transaction={transaction} key={transaction._id} />
        ))}
      </div>
    </div>
  );
};

export default History;
