/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC721Upgradeable,
  ERC721UpgradeableInterface,
} from "../ERC721Upgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612206806100206000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb46514610224578063b88d4fde14610240578063c87b56dd1461025c578063e985e9c51461028c576100cf565b80636352211e146101a657806370a08231146101d657806395d89b4114610206576100cf565b806301ffc9a7146100d457806306fdde0314610104578063081812fc14610122578063095ea7b31461015257806323b872dd1461016e57806342842e0e1461018a575b600080fd5b6100ee60048036038101906100e9919061184f565b6102bc565b6040516100fb9190611b60565b60405180910390f35b61010c61039e565b6040516101199190611b7b565b60405180910390f35b61013c600480360381019061013791906118a1565b610430565b6040516101499190611af9565b60405180910390f35b61016c60048036038101906101679190611813565b610476565b005b6101886004803603810190610183919061170d565b61058e565b005b6101a4600480360381019061019f919061170d565b6105ee565b005b6101c060048036038101906101bb91906118a1565b61060e565b6040516101cd9190611af9565b60405180910390f35b6101f060048036038101906101eb91906116a8565b610695565b6040516101fd9190611cbd565b60405180910390f35b61020e61074d565b60405161021b9190611b7b565b60405180910390f35b61023e600480360381019061023991906117d7565b6107df565b005b61025a6004803603810190610255919061175c565b6107f5565b005b610276600480360381019061027191906118a1565b610857565b6040516102839190611b7b565b60405180910390f35b6102a660048036038101906102a191906116d1565b6108bf565b6040516102b39190611b60565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061038757507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610397575061039682610953565b5b9050919050565b6060606580546103ad90611e27565b80601f01602080910402602001604051908101604052809291908181526020018280546103d990611e27565b80156104265780601f106103fb57610100808354040283529160200191610426565b820191906000526020600020905b81548152906001019060200180831161040957829003601f168201915b5050505050905090565b600061043b826109bd565b6069600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006104818261060e565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156104f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e990611c7d565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16610511610a08565b73ffffffffffffffffffffffffffffffffffffffff161480610540575061053f8161053a610a08565b6108bf565b5b61057f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161057690611c9d565b60405180910390fd5b6105898383610a10565b505050565b61059f610599610a08565b82610ac9565b6105de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d590611b9d565b60405180910390fd5b6105e9838383610b5e565b505050565b610609838383604051806020016040528060008152506107f5565b505050565b60008061061a83610e58565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561068c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068390611c5d565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610706576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fd90611c3d565b60405180910390fd5b606860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606066805461075c90611e27565b80601f016020809104026020016040519081016040528092919081815260200182805461078890611e27565b80156107d55780601f106107aa576101008083540402835291602001916107d5565b820191906000526020600020905b8154815290600101906020018083116107b857829003601f168201915b5050505050905090565b6107f16107ea610a08565b8383610e95565b5050565b610806610800610a08565b83610ac9565b610845576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083c90611b9d565b60405180910390fd5b61085184848484611002565b50505050565b6060610862826109bd565b600061086c61105e565b9050600081511161088c57604051806020016040528060008152506108b7565b8061089684611075565b6040516020016108a7929190611ad5565b6040516020818303038152906040525b915050919050565b6000606a60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6109c681611199565b610a05576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fc90611c5d565b60405180910390fd5b50565b600033905090565b816069600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610a838361060e565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610ad58361060e565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610b175750610b1681856108bf565b5b80610b5557508373ffffffffffffffffffffffffffffffffffffffff16610b3d84610430565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610b7e8261060e565b73ffffffffffffffffffffffffffffffffffffffff1614610bd4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bcb90611bdd565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c44576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3b90611bfd565b60405180910390fd5b610c5183838360016111da565b8273ffffffffffffffffffffffffffffffffffffffff16610c718261060e565b73ffffffffffffffffffffffffffffffffffffffff1614610cc7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cbe90611bdd565b60405180910390fd5b6069600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001606860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001606860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816067600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4610e5383838360016111e0565b505050565b60006067600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610f04576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610efb90611c1d565b60405180910390fd5b80606a60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610ff59190611b60565b60405180910390a3505050565b61100d848484610b5e565b611019848484846111e6565b611058576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161104f90611bbd565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b6060600060016110848461137d565b01905060008167ffffffffffffffff8111156110c9577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156110fb5781602001600182028036833780820191505090505b509050600082602001820190505b60011561118e578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581611178577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b04945060008514156111895761118e565b611109565b819350505050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166111bb83610e58565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b50505050565b50505050565b60006112078473ffffffffffffffffffffffffffffffffffffffff166115b4565b15611370578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611230610a08565b8786866040518563ffffffff1660e01b81526004016112529493929190611b14565b602060405180830381600087803b15801561126c57600080fd5b505af192505050801561129d57506040513d601f19601f8201168201806040525081019061129a9190611878565b60015b611320573d80600081146112cd576040519150601f19603f3d011682016040523d82523d6000602084013e6112d2565b606091505b50600081511415611318576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161130f90611bbd565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611375565b600190505b949350505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611401577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816113f7577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611464576d04ee2d6d415b85acef8100000000838161145a577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506020810190505b662386f26fc1000083106114b957662386f26fc1000083816114af577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506010810190505b6305f5e1008310611508576305f5e10083816114fe577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506008810190505b6127108310611553576127108381611549577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506004810190505b6064831061159c5760648381611592577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b0492506002810190505b600a83106115ab576001810190505b80915050919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60006115ea6115e584611cfd565b611cd8565b90508281526020810184848401111561160257600080fd5b61160d848285611de5565b509392505050565b60008135905061162481612174565b92915050565b6000813590506116398161218b565b92915050565b60008135905061164e816121a2565b92915050565b600081519050611663816121a2565b92915050565b600082601f83011261167a57600080fd5b813561168a8482602086016115d7565b91505092915050565b6000813590506116a2816121b9565b92915050565b6000602082840312156116ba57600080fd5b60006116c884828501611615565b91505092915050565b600080604083850312156116e457600080fd5b60006116f285828601611615565b925050602061170385828601611615565b9150509250929050565b60008060006060848603121561172257600080fd5b600061173086828701611615565b935050602061174186828701611615565b925050604061175286828701611693565b9150509250925092565b6000806000806080858703121561177257600080fd5b600061178087828801611615565b945050602061179187828801611615565b93505060406117a287828801611693565b925050606085013567ffffffffffffffff8111156117bf57600080fd5b6117cb87828801611669565b91505092959194509250565b600080604083850312156117ea57600080fd5b60006117f885828601611615565b92505060206118098582860161162a565b9150509250929050565b6000806040838503121561182657600080fd5b600061183485828601611615565b925050602061184585828601611693565b9150509250929050565b60006020828403121561186157600080fd5b600061186f8482850161163f565b91505092915050565b60006020828403121561188a57600080fd5b600061189884828501611654565b91505092915050565b6000602082840312156118b357600080fd5b60006118c184828501611693565b91505092915050565b6118d381611d71565b82525050565b6118e281611d83565b82525050565b60006118f382611d2e565b6118fd8185611d44565b935061190d818560208601611df4565b61191681611ee8565b840191505092915050565b600061192c82611d39565b6119368185611d55565b9350611946818560208601611df4565b61194f81611ee8565b840191505092915050565b600061196582611d39565b61196f8185611d66565b935061197f818560208601611df4565b80840191505092915050565b6000611998602d83611d55565b91506119a382611ef9565b604082019050919050565b60006119bb603283611d55565b91506119c682611f48565b604082019050919050565b60006119de602583611d55565b91506119e982611f97565b604082019050919050565b6000611a01602483611d55565b9150611a0c82611fe6565b604082019050919050565b6000611a24601983611d55565b9150611a2f82612035565b602082019050919050565b6000611a47602983611d55565b9150611a528261205e565b604082019050919050565b6000611a6a601883611d55565b9150611a75826120ad565b602082019050919050565b6000611a8d602183611d55565b9150611a98826120d6565b604082019050919050565b6000611ab0603d83611d55565b9150611abb82612125565b604082019050919050565b611acf81611ddb565b82525050565b6000611ae1828561195a565b9150611aed828461195a565b91508190509392505050565b6000602082019050611b0e60008301846118ca565b92915050565b6000608082019050611b2960008301876118ca565b611b3660208301866118ca565b611b436040830185611ac6565b8181036060830152611b5581846118e8565b905095945050505050565b6000602082019050611b7560008301846118d9565b92915050565b60006020820190508181036000830152611b958184611921565b905092915050565b60006020820190508181036000830152611bb68161198b565b9050919050565b60006020820190508181036000830152611bd6816119ae565b9050919050565b60006020820190508181036000830152611bf6816119d1565b9050919050565b60006020820190508181036000830152611c16816119f4565b9050919050565b60006020820190508181036000830152611c3681611a17565b9050919050565b60006020820190508181036000830152611c5681611a3a565b9050919050565b60006020820190508181036000830152611c7681611a5d565b9050919050565b60006020820190508181036000830152611c9681611a80565b9050919050565b60006020820190508181036000830152611cb681611aa3565b9050919050565b6000602082019050611cd26000830184611ac6565b92915050565b6000611ce2611cf3565b9050611cee8282611e59565b919050565b6000604051905090565b600067ffffffffffffffff821115611d1857611d17611eb9565b5b611d2182611ee8565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b6000611d7c82611dbb565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015611e12578082015181840152602081019050611df7565b83811115611e21576000848401525b50505050565b60006002820490506001821680611e3f57607f821691505b60208210811415611e5357611e52611e8a565b5b50919050565b611e6282611ee8565b810181811067ffffffffffffffff82111715611e8157611e80611eb9565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b61217d81611d71565b811461218857600080fd5b50565b61219481611d83565b811461219f57600080fd5b50565b6121ab81611d8f565b81146121b657600080fd5b50565b6121c281611ddb565b81146121cd57600080fd5b5056fea26469706673582212202f7b2fd5f5fb817d11da474310f8a74f241de1affa108feff76ca522ada23f2c64736f6c63430008040033";

type ERC721UpgradeableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721UpgradeableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721Upgradeable__factory extends ContractFactory {
  constructor(...args: ERC721UpgradeableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC721Upgradeable";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721Upgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC721Upgradeable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC721Upgradeable {
    return super.attach(address) as ERC721Upgradeable;
  }
  connect(signer: Signer): ERC721Upgradeable__factory {
    return super.connect(signer) as ERC721Upgradeable__factory;
  }
  static readonly contractName: "ERC721Upgradeable";
  public readonly contractName: "ERC721Upgradeable";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721UpgradeableInterface {
    return new utils.Interface(_abi) as ERC721UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC721Upgradeable;
  }
}
