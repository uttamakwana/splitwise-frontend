import React, { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import "./history.css";
import { formatDate } from "../../utils/formateDate.js";
import { Header, TransactionCard } from "../../components/index.js";
import { useNavigate } from "react-router-dom";

const History = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  // Sort transactions in descending order based on the date
  const sortedTransactions = user?.transactions
    ? [...user.transactions].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <div className="history-page">
      <Header />
      {user?.transactions?.length > 0 ? (
        <div className="show-history pi-1">
          {sortedTransactions.map((transaction) => (
            <TransactionCard transaction={transaction} key={transaction._id} />
          ))}
        </div>
      ) : (
        <>
          <p className="text-center clr-blue medium mb-1 fs-1">
            No transaction found!
          </p>
          <button
            onClick={() => navigate("/transaction")}
            className="p-1 margin-auto bg-clr-blue clr-white bold b-none cursor-pointer br-5 flex-center"
          >
            Add Transaction
          </button>
        </>
      )}
    </div>
  );
};

export default History;
