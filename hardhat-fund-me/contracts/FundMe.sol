// SPDX-License-Identifier: UNLICENSED
// 1. Pragms
pragma solidity ^0.8.9;

// 2. Imports
import './PriceConverter.sol';

// 3. Error codes
error FundMe__NotOwner();

// Interfaces, Libraries, Contracts

contract FundMe {
    // 1. type declarations
    using PriceConverter for uint256;

    // 2. State variables
    uint256 public constant MIN_USD = 10 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    address public immutable i_owner;
    AggregatorV3Interface public priceFeed;

    // 3. Events

    // 4. Modifiers
    modifier olnyOwner() {
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        _;
    }

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate(priceFeed) >= MIN_USD,
            'Didnt send ehough'
        ); // == 1 * 10 ** 18 == 1 eth
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public olnyOwner {
        for (uint256 funderIdx = 0; funderIdx < funders.length; funderIdx++) {
            address funder = funders[funderIdx];
            addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }('');
        require(callSuccess, 'Call failed((((');
    }
}
