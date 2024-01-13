import React from "react";
import { formatDate } from "../../utils/formateDate";

const TransactionCard = ({ transaction }) => {
  return (
    <div className="transaction-card p-1 flex-col br-5 bg-clr-gray-4 gap-4 mt-8">
      <div className="flex-between">
        <p>
          <span className="medium">{transaction.description}</span>
        </p>
        <p>
          <span className="bold clr-blue">{transaction.amount}₹</span>
        </p>
      </div>
      <p className="regular clr-gray-1 fs-14">{formatDate(transaction.createdAt)}</p>
      {!transaction.isPersonalExpense && (
        <div className="flex flex-wrap fs-14">
          <span className="medium">Paid For:</span>
          <p className="flex gap-8 flex-wrap">
            {transaction.paidFor.map((each, index) => (
              <span>
                {each.name}:{each.share}
                {index === transaction.paidFor.length - 1 ? "." : ","}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
