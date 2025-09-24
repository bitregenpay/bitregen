
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BitReGenToken.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BRGPaymentGateway is ReentrancyGuard, Ownable {
    BitReGenToken public immutable brgToken;
    
    // Payment gateway fee (in basis points, e.g., 200 = 2%)
    uint256 public processingFee = 200; // 2%
    address public feeRecipient;
    
    struct Payment {
        address merchant;
        address customer;
        uint256 amount;
        uint256 fee;
        string orderId;
        uint256 timestamp;
        bool completed;
    }
    
    mapping(string => Payment) public payments;
    mapping(address => bool) public verifiedMerchants;
    mapping(address => uint256) public merchantEarnings;
    
    event PaymentProcessed(
        string indexed orderId,
        address indexed merchant,
        address indexed customer,
        uint256 amount,
        uint256 fee
    );
    
    event MerchantVerified(address indexed merchant);
    event FeeUpdated(uint256 newFee);
    
    constructor(address _brgToken, address _feeRecipient) {
        brgToken = BitReGenToken(_brgToken);
        feeRecipient = _feeRecipient;
        _transferOwnership(msg.sender);
    }
    
    function processPayment(
        string calldata orderId,
        address merchant,
        uint256 amount
    ) external nonReentrant {
        require(verifiedMerchants[merchant], "Merchant not verified");
        require(payments[orderId].merchant == address(0), "Order already exists");
        require(amount > 0, "Amount must be > 0");
        
        uint256 fee = (amount * processingFee) / 10000;
        uint256 merchantAmount = amount - fee;
        
        // Transfer BRG from customer to contract
        require(brgToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        // Transfer merchant amount to merchant
        require(brgToken.transfer(merchant, merchantAmount), "Merchant transfer failed");
        
        // Transfer fee to fee recipient
        if (fee > 0) {
            require(brgToken.transfer(feeRecipient, fee), "Fee transfer failed");
        }
        
        // Record payment
        payments[orderId] = Payment({
            merchant: merchant,
            customer: msg.sender,
            amount: amount,
            fee: fee,
            orderId: orderId,
            timestamp: block.timestamp,
            completed: true
        });
        
        merchantEarnings[merchant] += merchantAmount;
        
        emit PaymentProcessed(orderId, merchant, msg.sender, amount, fee);
    }
    
    function verifyMerchant(address merchant) external onlyOwner {
        verifiedMerchants[merchant] = true;
        emit MerchantVerified(merchant);
    }
    
    function updateProcessingFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        processingFee = newFee;
        emit FeeUpdated(newFee);
    }
    
    function updateFeeRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "Invalid address");
        feeRecipient = newRecipient;
    }
    
    function getPayment(string calldata orderId) external view returns (Payment memory) {
        return payments[orderId];
    }
    
    function getMerchantEarnings(address merchant) external view returns (uint256) {
        return merchantEarnings[merchant];
    }
}
