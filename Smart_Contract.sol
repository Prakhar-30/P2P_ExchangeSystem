// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TokenExchange is ReentrancyGuard {
    struct Listing {
        address token;
        uint256 amount;
        uint256 price;
    }

    mapping(address => Listing[]) public listings;
    mapping(address => mapping(address => uint256)) public lockedTokens;

    event TokenListed(address indexed lister, address indexed token, uint256 amount, uint256 price);
    event TradeExecuted(address indexed buyer, address indexed seller, address tokenBought, address tokenSold, uint256 amountBought, uint256 amountSold);

    function listToken(address _token, uint256 _amount, uint256 _price) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(_price > 0, "Price must be greater than 0");

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        
        listings[msg.sender].push(Listing({
            token: _token,
            amount: _amount,
            price: _price
        }));

        lockedTokens[msg.sender][_token] += _amount;

        emit TokenListed(msg.sender, _token, _amount, _price);
    }

    function executeTrade(address _lister, uint256 _listingIndex, address _tokenToSell, uint256 _amountToSell) external nonReentrant {
        Listing storage listing = listings[_lister][_listingIndex];
        require(listing.amount > 0, "Listing not found or empty");

        uint256 amountToBuy = (_amountToSell * listing.price) / (10**18);
        require(amountToBuy <= listing.amount, "Not enough tokens in the listing");

        IERC20(_tokenToSell).transferFrom(msg.sender, _lister, _amountToSell);
        IERC20(listing.token).transfer(msg.sender, amountToBuy);

        listing.amount -= amountToBuy;
        lockedTokens[_lister][listing.token] -= amountToBuy;

        // Update price using x*y=k formula
        uint256 k = listing.amount * listing.price;
        listing.price = k / (listing.amount - amountToBuy);

        emit TradeExecuted(msg.sender, _lister, listing.token, _tokenToSell, amountToBuy, _amountToSell);
    }

    function removeListing(uint256 _listingIndex) external {
        require(_listingIndex < listings[msg.sender].length, "Invalid listing index");

        Listing storage listingToRemove = listings[msg.sender][_listingIndex];
        uint256 amountToReturn = listingToRemove.amount;

        IERC20(listingToRemove.token).transfer(msg.sender, amountToReturn);
        lockedTokens[msg.sender][listingToRemove.token] -= amountToReturn;

        listings[msg.sender][_listingIndex] = listings[msg.sender][listings[msg.sender].length - 1];
        listings[msg.sender].pop();
    }

    function getListingsCount(address _lister) external view returns (uint256) {
        return listings[_lister].length;
    }

    function getListing(address _lister, uint256 _listingIndex) external view returns (Listing memory) {
        require(_listingIndex < listings[_lister].length, "Invalid listing index");
        return listings[_lister][_listingIndex];
    }
}