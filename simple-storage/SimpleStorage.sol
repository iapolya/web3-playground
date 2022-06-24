// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    uint256 favNumber;

    struct People {
        uint256 favNumber;
        string name;
    }

    mapping(string => uint256) public nameToFavNum;
    People[] public persons;

    function addPerson(string memory _name, uint256 _favNumber) public {
        // Data location must be "storage", "memory" or "calldata" for return parameter in function, but none was given.
        persons.push(People(_favNumber, _name));

        nameToFavNum[_name] = _favNumber;
    }

    function store(uint256 _favNumber) public {
        favNumber = _favNumber;
    }

    // view, pure === просто читаем данные и не тратим gas, так как не меняем блокчейн
    // тратим только если вызываем в storе(), например
    function retrieve() public view returns (uint256) {
        return favNumber;
    }

    function retrieve2() public pure returns (uint256) {
        return 1 + 1;
    }
}
