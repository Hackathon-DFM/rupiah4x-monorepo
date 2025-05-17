import {
  FILL_DEADLINE,
  GaslessCrossChainOrder,
  OnchainCrossChainOrder,
  OrderData,
  OrderEncoder,
  addressToBytes32,
  ask,
  sleep,
  writeJson,
} from '../utils';
import {
  Address,
  createPublicClient,
  createWalletClient,
  http,
  zeroHash,
  erc20Abi,
  maxUint256,
  parseEther,
  parseUnits,
  parseSignature,
  toBytes,
  keccak256,
  encodeAbiParameters,
  parseAbiParameters,
  concat,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { arbitrumSepolia } from 'viem/chains';
import {
  DESTINATION_ROUTER_ADDRESS,
  INTOKEN_ADDRESS,
  ORIGIN_ROUTER_ADDRESS,
  OUTTOKEN_ADDRESS,
  RECIPIENT_ADDRESS,
  SENDER_PK,
  ORIGIN_DOMAIN,
  DESTINATION_DOMAIN,
  PERMIT2_ADDRESS,
} from '../config';
import routerAbi from '../abis/Hyperlane7683.json';
import permit2Abi from '../abis/IPermit2Abi.json';

import { PermitBatchTransferFrom } from '@uniswap/permit2-sdk';

type Output = {
  token: `0x${string}` | `0x${string}`; // assumed bytes32
  amount: bigint;
  recipient: `0x${string}`; // assumed bytes32
  chainId: bigint; // uint64
};

type FillInstruction = {
  destinationChainId: bigint; // uint64
  destinationSettler: `0x${string}`; // bytes32
  originData: `0x${string}`; // bytes
};

export type ResolvedCrossChainOrder = {
  user: `0x${string}`; // address
  originChainId: bigint; // uint64
  openDeadline: number; // uint32
  fillDeadline: number; // uint32
  maxSpent: Output[];
  minReceived: Output[];
  fillInstructions: FillInstruction[];
};

const walletAccount = privateKeyToAccount(SENDER_PK as Address);
const walletClient = createWalletClient({
  account: walletAccount,
  chain: arbitrumSepolia,
  transport: http(),
});

const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
});

const approveToken = async (
  token: Address,
  spender: Address,
  amount: bigint,
): Promise<string> => {
  const txHash = await walletClient.writeContract({
    address: token,
    abi: erc20Abi,
    functionName: 'approve',
    args: [spender, amount],
  });

  return txHash;
};

export const createSignature = async () => {
  // swap 8 FOO to 11 BAR
  const { timestamp } = await publicClient.getBlock();
  // const permitNonce = timestamp;
  const nonce = BigInt(11);

  const rawOrderData: OrderData = {
    sender: walletAccount.address,
    recipient: RECIPIENT_ADDRESS as Address,
    inputToken: INTOKEN_ADDRESS as Address,
    outputToken: OUTTOKEN_ADDRESS as Address,
    amountIn: BigInt(parseEther('10')),
    amountOut: BigInt(parseEther('10')),
    senderNonce: nonce,
    originDomain: ORIGIN_DOMAIN,
    destinationDomain: DESTINATION_DOMAIN,
    destinationSettler: DESTINATION_ROUTER_ADDRESS as Address,
    fillDeadline: FILL_DEADLINE,
    data: '0x',
  };

  console.log('rawOrderData: ', rawOrderData);

  const orderData: OrderData = {
    ...rawOrderData,
    sender: addressToBytes32(rawOrderData.sender),
    recipient: addressToBytes32(rawOrderData.recipient),
    inputToken: addressToBytes32(rawOrderData.inputToken),
    outputToken: addressToBytes32(rawOrderData.outputToken),
    destinationSettler: addressToBytes32(rawOrderData.destinationSettler),
  };

  const order: GaslessCrossChainOrder = {
    originSettler: ORIGIN_ROUTER_ADDRESS as Address,
    user: rawOrderData.sender,
    nonce: nonce,
    originChainId: BigInt(rawOrderData.originDomain),
    openDeadline: orderData.fillDeadline,
    fillDeadline: orderData.fillDeadline,
    orderDataType: OrderEncoder.orderDataType(),
    orderData: OrderEncoder.encode(orderData),
  };

  console.log('order: ', order);

  await approveToken(
    INTOKEN_ADDRESS as Address,
    PERMIT2_ADDRESS as Address,
    maxUint256,
  );

  const resolvedOrder = await publicClient.readContract({
    address: ORIGIN_ROUTER_ADDRESS as Address,
    abi: routerAbi,
    functionName: 'resolveFor',
    args: [order, '0x'],
  });

  const getSignature = async () => {
    const signature = await walletClient.signTypedData({
      domain: {
        name: 'Permit2',
        chainId: ORIGIN_DOMAIN, // replace with actual chainId
        verifyingContract: '0x000000000022D473030F116dDEE9F6B43aC78BA3', // mainnet Permit2 address
      },
      types: {
        PermitBatchWitnessTransferFrom: [
          { name: 'permitted', type: 'TokenPermissions[]' },
          { name: 'spender', type: 'address' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
          { name: 'witness', type: 'ResolvedCrossChainOrder' },
        ],
        TokenPermissions: [
          { name: 'token', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
        ResolvedCrossChainOrder: [
          { name: 'user', type: 'address' },
          { name: 'originChainId', type: 'uint64' },
          { name: 'openDeadline', type: 'uint32' },
          { name: 'fillDeadline', type: 'uint32' },
          { name: 'maxSpent', type: 'Output[]' },
          { name: 'minReceived', type: 'Output[]' },
          { name: 'fillInstructions', type: 'FillInstruction[]' },
        ],
        Output: [
          { name: 'token', type: 'bytes32' },
          { name: 'amount', type: 'uint256' },
          { name: 'recipient', type: 'bytes32' },
          { name: 'chainId', type: 'uint64' },
        ],
        FillInstruction: [
          { name: 'destinationChainId', type: 'uint64' },
          { name: 'destinationSettler', type: 'bytes32' },
          { name: 'originData', type: 'bytes' },
        ],
      },
      primaryType: 'PermitBatchWitnessTransferFrom',
      message: {
        spender: ORIGIN_ROUTER_ADDRESS as Address,
        permitted: [
          {
            token: rawOrderData.inputToken as Address,
            amount: BigInt(rawOrderData.amountIn),
          },
        ],
        nonce: nonce,
        deadline: BigInt(rawOrderData.fillDeadline),
        witness: resolvedOrder as ResolvedCrossChainOrder,
      },
    });
    return signature;
  };

  const createSignatureHardWay = async () => {
    const spender = ORIGIN_ROUTER_ADDRESS as Address;
    const resolveForResult = await publicClient.readContract({
      address: ORIGIN_ROUTER_ADDRESS as Address,
      abi: routerAbi,
      functionName: 'resolveFor',
      args: [order, zeroHash],
    });
    const witness = await publicClient.readContract({
      address: ORIGIN_ROUTER_ADDRESS as Address,
      abi: routerAbi,
      functionName: 'witnessHash',
      args: [resolveForResult],
    });
    const token = INTOKEN_ADDRESS as Address;
    const permitNonce = nonce;
    const amount = BigInt(rawOrderData.amountIn);
    const deadline = BigInt(rawOrderData.fillDeadline);
    const signaturePk = SENDER_PK;

    const permitted = [
      {
        token: token,
        amount: amount,
      },
    ];
    const permit = {
      permitted,
      nonce: permitNonce,
      deadline,
    };

    const TOKEN_PERMISSIONS_TYPEHASH = keccak256(
      toBytes('TokenPermissions(address token,uint256 amount)'),
    );
    const FULL_WITNESS_TYPEHASH = keccak256(
      toBytes(
        'PermitWitnessTransferFrom(TokenPermissions permitted,address spender,uint256 nonce,uint256 deadline,ResolvedCrossChainOrder witness)' +
          'ResolvedCrossChainOrder(address user, uint64 originChainId, uint32 openDeadline, uint32 fillDeadline, Output[] maxSpent, Output[] minReceived, FillInstruction[] fillInstructions)' +
          'Output(bytes32 token, uint256 amount, bytes32 recipient, uint64 chainId)' +
          'FillInstruction(uint64 destinationChainId, bytes32 destinationSettler, bytes originData)',
      ),
    );
    const FULL_WITNESS_BATCH_TYPEHASH = keccak256(
      toBytes(
        'PermitBatchWitnessTransferFrom(TokenPermissions[] permitted,address spender,uint256 nonce,uint256 deadline,ResolvedCrossChainOrder witness)' +
          'ResolvedCrossChainOrder(address user, uint64 originChainId, uint32 openDeadline, uint32 fillDeadline, Output[] maxSpent, Output[] minReceived, FillInstruction[] fillInstructions)' +
          'Output(bytes32 token, uint256 amount, bytes32 recipient, uint64 chainId)' +
          'FillInstruction(uint64 destinationChainId, bytes32 destinationSettler, bytes originData)' +
          'TokenPermissions(address token,uint256 amount)',
      ),
    );

    // 1. Hash each TokenPermission struct
    const tokenPermissions = permit.permitted.map(({ token, amount }) =>
      keccak256(
        encodeAbiParameters(parseAbiParameters('bytes32,address,uint256'), [
          TOKEN_PERMISSIONS_TYPEHASH,
          token,
          amount,
        ]),
      ),
    );

// 2. Pack and hash TokenPermissions[]
const tokenPermissionsHash = keccak256(
  concat(tokenPermissions.map((p) => toBytes(p)))
);

// 3. Encode and hash full struct (EIP-712-style with typeHash prefix)
const structHash = keccak256(
  concat([
    toBytes(FULL_WITNESS_BATCH_TYPEHASH), // prepend the type hash
    encodeAbiParameters(
      parseAbiParameters(
        'bytes32,address,uint256,uint256,bytes32'
      ),
      [tokenPermissionsHash, spender, permit.nonce, permit.deadline, witness as Address]
    ),
  ])
);
    // 4. Create EIP-712 digest
    const DOMAIN_SEPARATOR = await publicClient.readContract({
      address: PERMIT2_ADDRESS as Address,
      abi: permit2Abi,
      functionName: 'DOMAIN_SEPARATOR',
    });

    const msgHash = keccak256(
      concat([
        toBytes('\x19\x01'),
        toBytes(DOMAIN_SEPARATOR as Address),
        toBytes(structHash),
      ]),
    );

    // 5. Sign digest using private key
    const signer = privateKeyToAccount(signaturePk as `0x${string}`);
    const signature = await signer.signMessage({ message: msgHash });

    console.log('signer: ', signer);
    console.log("msgHash: ", msgHash);
    console.log("signature: ", signature);

    return signature;
  };

  await createSignatureHardWay();

  const signature = await getSignature();
  const { v, r, s } = parseSignature(signature);

  console.log('resolvedOrder: ', resolvedOrder);
  console.log('signature: ', signature);
  console.log({ v, r, s });

  return {
    order,
    signature,
  };
};
