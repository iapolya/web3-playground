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
    address[] private s_funders;
    mapping(address => uint256) private s_addressToAmountFunded;
    address private immutable i_owner;
    AggregatorV3Interface private s_priceFeed;

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
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MIN_USD,
            'Didnt send ehough'
        ); // == 1 * 10 ** 18 == 1 eth
        s_funders.push(msg.sender);
        s_addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public olnyOwner {
        // используем memory, чтобы уменьшить gas price, расходующийся при обращении к storage
        address[] memory funders = s_funders;

        for (uint256 funderIdx = 0; funderIdx < funders.length; funderIdx++) {
            address funder = funders[funderIdx];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }('');
        require(callSuccess, 'Call failed((((');
    }

    function getFunder(uint256 idx) public view returns (address) {
        return s_funders[idx];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getAmountByAddress(address funder) public view returns (uint256) {
        return s_addressToAmountFunded[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
