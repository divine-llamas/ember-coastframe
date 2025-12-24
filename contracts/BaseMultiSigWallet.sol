// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseMultiSigWallet {
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public requiredApprovals;

    struct Transaction {
        address to;
        uint256 value;
        bool executed;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    Transaction[] public transactions;

    event TransactionCreated(uint256 indexed txIndex, address indexed creator, address to, uint256 value);
    event TransactionApproved(uint256 indexed txIndex, address indexed approver);
    event TransactionExecuted(uint256 indexed txIndex);

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    modifier txExists(uint256 txIndex) {
        require(txIndex < transactions.length, "Transaction does not exist");
        _;
    }

    modifier notExecuted(uint256 txIndex) {
        require(!transactions[txIndex].executed, "Transaction already executed");
        _;
    }

    modifier notApproved(uint256 txIndex) {
        require(!transactions[txIndex].approvals[msg.sender], "Transaction already approved by you");
        _;
    }

    constructor(address[] memory _owners, uint256 _requiredApprovals) {
        require(_owners.length > 0, "At least one owner required");
        require(_requiredApprovals > 0 && _requiredApprovals <= _owners.length, "Invalid required approvals");

        for (uint256 i = 0; i < _owners.length; i++) {
            isOwner[_owners[i]] = true;
        }

        owners = _owners;
        requiredApprovals = _requiredApprovals;
    }

    function createTransaction(address to, uint256 value) external onlyOwner {
        uint256 txIndex = transactions.length;
        transactions.push();
        Transaction storage tx = transactions[txIndex];
        tx.to = to;
        tx.value = value;

        emit TransactionCreated(txIndex, msg.sender, to, value);
    }

    function approveTransaction(uint256 txIndex)
        external
        onlyOwner
        txExists(txIndex)
        notExecuted(txIndex)
        notApproved(txIndex)
    {
        Transaction storage tx = transactions[txIndex];
        tx.approvals[msg.sender] = true;
        tx.approvalCount++;

        emit TransactionApproved(txIndex, msg.sender);

        if (tx.approvalCount >= requiredApprovals) {
            executeTransaction(txIndex);
        }
    }

    function executeTransaction(uint256 txIndex)
        internal
        txExists(txIndex)
        notExecuted(txIndex)
    {
        Transaction storage tx = transactions[txIndex];
        tx.executed = true;

        payable(tx.to).transfer(tx.value);
        emit TransactionExecuted(txIndex);
    }

    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }

    receive() external payable {}
}
