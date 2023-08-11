/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DpidRegistry, DpidRegistryInterface } from "../DpidRegistry";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "entryId",
        type: "uint256",
      },
    ],
    name: "Register",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "registrant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "tokenGate",
        type: "address[]",
      },
    ],
    name: "RegisterOrganization",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "registrant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "tokenGate",
        type: "address[]",
      },
    ],
    name: "UpdateOrganization",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "entryId",
        type: "uint256",
      },
    ],
    name: "exists",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "entryId",
        type: "uint256",
      },
    ],
    name: "get",
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
    inputs: [],
    name: "getFee",
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
    inputs: [],
    name: "getOrgFee",
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
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
    ],
    name: "getOrganization",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
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
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "organizations",
    outputs: [
      {
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "registrant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "entry",
        type: "uint256",
      },
    ],
    name: "put",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
    ],
    name: "registerOrg",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
      {
        internalType: "address[]",
        name: "tokenGate",
        type: "address[]",
      },
    ],
    name: "registerOrgWithGate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gweiFee",
        type: "uint256",
      },
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gweiFee",
        type: "uint256",
      },
    ],
    name: "setOrgFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "source",
        type: "string",
      },
    ],
    name: "stringToBytes32",
    outputs: [
      {
        internalType: "bytes32",
        name: "result",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
      {
        internalType: "address[]",
        name: "tokenGate",
        type: "address[]",
      },
    ],
    name: "updateOrg",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "prefix",
        type: "bytes32",
      },
    ],
    name: "validateCharacters",
    outputs: [
      {
        internalType: "bool",
        name: "valid",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50620000226200002860201b60201c565b620001d2565b600060019054906101000a900460ff16156200007b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000729062000126565b60405180910390fd5b60ff801660008054906101000a900460ff1660ff1614620000ec5760ff6000806101000a81548160ff021916908360ff1602179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860ff604051620000e3919062000148565b60405180910390a15b565b6000620000fd60278362000165565b91506200010a8262000183565b604082019050919050565b620001208162000176565b82525050565b600060208201905081810360008301526200014181620000ee565b9050919050565b60006020820190506200015f600083018462000115565b92915050565b600082825260208201905092915050565b600060ff82169050919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320696e69746960008201527f616c697a696e6700000000000000000000000000000000000000000000000000602082015250565b61230880620001e26000396000f3fe6080604052600436106101145760003560e01c80638129fc1c116100a0578063ced72f8711610064578063ced72f871461037f578063cef25dbc146103aa578063cfb51928146103c6578063da4a984214610403578063f2fde38b1461043357610114565b80638129fc1c146102aa57806381e104ca146102c15780638da5cb5b146102ec578063a40a990b14610317578063ba51b14e1461034057610114565b80634b22d5d0116100e75780634b22d5d0146101c75780634fb6020e146102045780635cb316351461022d57806369fe0e2d1461026a578063715018a61461029357610114565b80631785b6771461011957806318ae19c21461013557806322b3cd4e146101725780633ccfd60b146101b0575b600080fd5b610133600480360381019061012e9190611889565b61045c565b005b34801561014157600080fd5b5061015c60048036038101906101579190611906565b6104d8565b6040516101699190611e0a565b60405180910390f35b34801561017e57600080fd5b5061019960048036038101906101949190611889565b610568565b6040516101a7929190611e25565b60405180910390f35b3480156101bc57600080fd5b506101c561060e565b005b3480156101d357600080fd5b506101ee60048036038101906101e99190611889565b61066c565b6040516101fb9190611bfb565b60405180910390f35b34801561021057600080fd5b5061022b60048036038101906102269190611983565b610845565b005b34801561023957600080fd5b50610254600480360381019061024f9190611906565b610857565b6040516102619190611bfb565b60405180910390f35b34801561027657600080fd5b50610291600480360381019061028c9190611983565b6108d8565b005b34801561029f57600080fd5b506102a86108ea565b005b3480156102b657600080fd5b506102bf6108fe565b005b3480156102cd57600080fd5b506102d6610cfa565b6040516102e39190611e0a565b60405180910390f35b3480156102f857600080fd5b50610301610d04565b60405161030e9190611be0565b60405180910390f35b34801561032357600080fd5b5061033e600480360381019061033991906118b2565b610d2e565b005b34801561034c57600080fd5b5061036760048036038101906103629190611889565b610e52565b60405161037693929190611c6f565b60405180910390f35b34801561038b57600080fd5b50610394610e9c565b6040516103a19190611e0a565b60405180910390f35b6103c460048036038101906103bf91906118b2565b610ea6565b005b3480156103d257600080fd5b506103ed60048036038101906103e89190611942565b610f41565b6040516103fa9190611c16565b60405180910390f35b61041d60048036038101906104189190611906565b610f6b565b60405161042a9190611e0a565b60405180910390f35b34801561043f57600080fd5b5061045a60048036038101906104559190611860565b611227565b005b6104d581600067ffffffffffffffff8111156104a1577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156104cf5781602001602082028036833780820191505090505b50610ea6565b50565b600082606560008581526020019081526020016000206000015414610532576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052990611d6a565b60405180910390fd5b60006065600085815260200190815260200160002090508060030160008481526020019081526020016000205491505092915050565b600080826065600085815260200190815260200160002060000154146105c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ba90611d6a565b60405180910390fd5b600060656000858152602001908152602001600020905080600401548160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250925050915091565b6106166112ab565b6000610620610d04565b90508073ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610668573d6000803e3d6000fd5b5050565b600080600090506000806040518060600160405280602781526020016122ac60279139905060005b602060ff1681101561082357600060f81b8682602081106106de577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141561071257809250610823565b60005b825181101561080f57828181518110610757577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168783602081106107bd577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614156107fc5784806107f490611fcb565b95505061080f565b808061080790611fcb565b915050610715565b50808061081b90611fcb565b915050610694565b50818310156108385760009350505050610840565b600193505050505b919050565b61084d6112ab565b8060678190555050565b6000826065600085815260200190815260200160002060000154146108b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a890611d6a565b60405180910390fd5b60006065600085815260200190815260200160002090508060040154831091505092915050565b6108e06112ab565b8060668190555050565b6108f26112ab565b6108fc6000611329565b565b60008060019054906101000a900460ff1615905080801561092f5750600160008054906101000a900460ff1660ff16105b8061095c575061093e306113ef565b15801561095b5750600160008054906101000a900460ff1660ff16145b5b61099b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099290611d8a565b60405180910390fd5b60016000806101000a81548160ff021916908360ff16021790555080156109d8576001600060016101000a81548160ff0219169083151502179055505b6601c6bf526340006066819055506706f05b59d3b2000060678190555060008067ffffffffffffffff811115610a37577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015610a655781602001602082028036833780820191505090505b509050610a73600082611412565b610a9d7f647069640000000000000000000000000000000000000000000000000000000082611412565b610ac77f646369746500000000000000000000000000000000000000000000000000000082611412565b610af17f646576000000000000000000000000000000000000000000000000000000000082611412565b610b1b7f737461676500000000000000000000000000000000000000000000000000000082611412565b610b457f626574610000000000000000000000000000000000000000000000000000000082611412565b610b6f7f646573636900000000000000000000000000000000000000000000000000000082611412565b610b997f6e6f64650000000000000000000000000000000000000000000000000000000082611412565b610bc37f6e6f64657300000000000000000000000000000000000000000000000000000082611412565b610bed7f646f69000000000000000000000000000000000000000000000000000000000082611412565b610c177f610000000000000000000000000000000000000000000000000000000000000082611412565b610c417f640000000000000000000000000000000000000000000000000000000000000082611412565b610c6b7f780000000000000000000000000000000000000000000000000000000000000082611412565b610c957f7a0000000000000000000000000000000000000000000000000000000000000082611412565b610c9d6115a5565b508015610cf75760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024986001604051610cee9190611ccf565b60405180910390a15b50565b6000606754905090565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b81610d376115fe565b73ffffffffffffffffffffffffffffffffffffffff166065600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610dda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dd190611d4a565b60405180910390fd5b600060656000858152602001908152602001600020905082816002019080519060200190610e09929190611667565b507f2f78800ab5b47f6617eaf3124043ced0ee3ae49c0b4a77167ee4cd2fbc674f0484610e346115fe565b85604051610e4493929190611c31565b60405180910390a150505050565b60656020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060040154905083565b6000606654905090565b606754341015610eeb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ee290611dea565b60405180910390fd5b610ef48261066c565b610f33576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f2a90611d6a565b60405180910390fd5b610f3d8282611412565b5050565b600080829050600081511415610f5d576000801b915050610f66565b60208301519150505b919050565b6000606654341015610fb2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fa990611dea565b60405180910390fd5b8260656000858152602001908152602001600020600001541461100a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161100190611d6a565b60405180910390fd5b60006065600085815260200190815260200160002090506000816002018054905011156111a6576000816002018054905090506000805b82811015611162576000846002018281548110611087577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008173ffffffffffffffffffffffffffffffffffffffff166370a082316110da6115fe565b6040518263ffffffff1660e01b81526004016110f69190611be0565b60206040518083038186803b15801561110e57600080fd5b505afa158015611122573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061114691906119ac565b1115611156576001925050611162565b81600101915050611041565b50806111a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161119a90611d2a565b60405180910390fd5b50505b60008160040154905083826003016000838152602001908152602001600020819055507fd5fa0e9a716b3ec4895a48223ad309e2d3fa5e27f04d8dc9b3c33cc738a50eb085826040516111fa929190611ca6565b60405180910390a181600401600081548092919061121790611fcb565b9190505550809250505092915050565b61122f6112ab565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561129f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129690611d0a565b60405180910390fd5b6112a881611329565b50565b6112b36115fe565b73ffffffffffffffffffffffffffffffffffffffff166112d1610d04565b73ffffffffffffffffffffffffffffffffffffffff1614611327576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161131e90611daa565b60405180910390fd5b565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000801b606560008481526020019081526020016000206000015414801561149c5750600073ffffffffffffffffffffffffffffffffffffffff166065600084815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b6114db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114d290611cea565b60405180910390fd5b60006065600084815260200190815260200160002090506114fa6115fe565b8160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508281600001819055508181600201908051906020019061155d929190611667565b507f1603286ac6b9f753cbc1a1d33146ab15a401314d80d8553aa8fb1473df47f3ec836115886115fe565b8460405161159893929190611c31565b60405180910390a1505050565b600060019054906101000a900460ff166115f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115eb90611dca565b60405180910390fd5b6115fc611606565b565b600033905090565b600060019054906101000a900460ff16611655576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161164c90611dca565b60405180910390fd5b6116656116606115fe565b611329565b565b8280548282559060005260206000209081019282156116e0579160200282015b828111156116df5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190611687565b5b5090506116ed91906116f1565b5090565b5b8082111561170a5760008160009055506001016116f2565b5090565b600061172161171c84611e73565b611e4e565b9050808382526020820190508285602086028201111561174057600080fd5b60005b85811015611770578161175688826117b8565b845260208401935060208301925050600181019050611743565b5050509392505050565b600061178d61178884611e9f565b611e4e565b9050828152602081018484840111156117a557600080fd5b6117b0848285611f8b565b509392505050565b6000813590506117c781612266565b92915050565b600082601f8301126117de57600080fd5b81356117ee84826020860161170e565b91505092915050565b6000813590506118068161227d565b92915050565b600082601f83011261181d57600080fd5b813561182d84826020860161177a565b91505092915050565b60008135905061184581612294565b92915050565b60008151905061185a81612294565b92915050565b60006020828403121561187257600080fd5b6000611880848285016117b8565b91505092915050565b60006020828403121561189b57600080fd5b60006118a9848285016117f7565b91505092915050565b600080604083850312156118c557600080fd5b60006118d3858286016117f7565b925050602083013567ffffffffffffffff8111156118f057600080fd5b6118fc858286016117cd565b9150509250929050565b6000806040838503121561191957600080fd5b6000611927858286016117f7565b925050602061193885828601611836565b9150509250929050565b60006020828403121561195457600080fd5b600082013567ffffffffffffffff81111561196e57600080fd5b61197a8482850161180c565b91505092915050565b60006020828403121561199557600080fd5b60006119a384828501611836565b91505092915050565b6000602082840312156119be57600080fd5b60006119cc8482850161184b565b91505092915050565b60006119e183836119ed565b60208301905092915050565b6119f681611f1a565b82525050565b611a0581611f1a565b82525050565b6000611a1682611ee0565b611a208185611ef8565b9350611a2b83611ed0565b8060005b83811015611a5c578151611a4388826119d5565b9750611a4e83611eeb565b925050600181019050611a2f565b5085935050505092915050565b611a7281611f2c565b82525050565b611a8181611f38565b82525050565b611a9081611f79565b82525050565b6000611aa3600c83611f09565b9150611aae82612083565b602082019050919050565b6000611ac6602683611f09565b9150611ad1826120ac565b604082019050919050565b6000611ae9601883611f09565b9150611af4826120fb565b602082019050919050565b6000611b0c601283611f09565b9150611b1782612124565b602082019050919050565b6000611b2f600e83611f09565b9150611b3a8261214d565b602082019050919050565b6000611b52602e83611f09565b9150611b5d82612176565b604082019050919050565b6000611b75602083611f09565b9150611b80826121c5565b602082019050919050565b6000611b98602b83611f09565b9150611ba3826121ee565b604082019050919050565b6000611bbb600c83611f09565b9150611bc68261223d565b602082019050919050565b611bda81611f62565b82525050565b6000602082019050611bf560008301846119fc565b92915050565b6000602082019050611c106000830184611a69565b92915050565b6000602082019050611c2b6000830184611a78565b92915050565b6000606082019050611c466000830186611a78565b611c5360208301856119fc565b8181036040830152611c658184611a0b565b9050949350505050565b6000606082019050611c846000830186611a78565b611c9160208301856119fc565b611c9e6040830184611bd1565b949350505050565b6000604082019050611cbb6000830185611a78565b611cc86020830184611bd1565b9392505050565b6000602082019050611ce46000830184611a87565b92915050565b60006020820190508181036000830152611d0381611a96565b9050919050565b60006020820190508181036000830152611d2381611ab9565b9050919050565b60006020820190508181036000830152611d4381611adc565b9050919050565b60006020820190508181036000830152611d6381611aff565b9050919050565b60006020820190508181036000830152611d8381611b22565b9050919050565b60006020820190508181036000830152611da381611b45565b9050919050565b60006020820190508181036000830152611dc381611b68565b9050919050565b60006020820190508181036000830152611de381611b8b565b9050919050565b60006020820190508181036000830152611e0381611bae565b9050919050565b6000602082019050611e1f6000830184611bd1565b92915050565b6000604082019050611e3a6000830185611bd1565b611e4760208301846119fc565b9392505050565b6000611e58611e69565b9050611e648282611f9a565b919050565b6000604051905090565b600067ffffffffffffffff821115611e8e57611e8d612043565b5b602082029050602081019050919050565b600067ffffffffffffffff821115611eba57611eb9612043565b5b611ec382612072565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b6000611f2582611f42565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000611f8482611f6c565b9050919050565b82818337600083830152505050565b611fa382612072565b810181811067ffffffffffffffff82111715611fc257611fc1612043565b5b80604052505050565b6000611fd682611f62565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561200957612008612014565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f5072656669782074616b656e0000000000000000000000000000000000000000600082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f556e617574686f72697a65643a20546f6b656e20676174650000000000000000600082015250565b7f4f6e6c79206f776e657220757064617465730000000000000000000000000000600082015250565b7f496e76616c696420707265666978000000000000000000000000000000000000600082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b7f4665652072657175697265640000000000000000000000000000000000000000600082015250565b61226f81611f1a565b811461227a57600080fd5b50565b61228681611f38565b811461229157600080fd5b50565b61229d81611f62565b81146122a857600080fd5b5056fe6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392d5f2ea26469706673582212207c25d9512574d2ab9200fc90e75289f1e4f1e604292bf5bb3225fb8817102ca164736f6c63430008040033";

type DpidRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DpidRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DpidRegistry__factory extends ContractFactory {
  constructor(...args: DpidRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "DpidRegistry";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DpidRegistry> {
    return super.deploy(overrides || {}) as Promise<DpidRegistry>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DpidRegistry {
    return super.attach(address) as DpidRegistry;
  }
  connect(signer: Signer): DpidRegistry__factory {
    return super.connect(signer) as DpidRegistry__factory;
  }
  static readonly contractName: "DpidRegistry";
  public readonly contractName: "DpidRegistry";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DpidRegistryInterface {
    return new utils.Interface(_abi) as DpidRegistryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DpidRegistry {
    return new Contract(address, _abi, signerOrProvider) as DpidRegistry;
  }
}
