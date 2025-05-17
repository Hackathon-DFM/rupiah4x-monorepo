'use client';

import { ApprovalState } from '@/lib/crossChainSwap/types';
import { createContext, useContext, useState, ReactNode } from 'react';

// Creating a context for search term
const ApprovalContext = createContext<
  | {
      approvalState: ApprovalState;
      setApprovalState: (
        value: ApprovalState | ((prev: ApprovalState) => ApprovalState)
      ) => void;
    }
  | undefined
>(undefined);

export function ApprovalProvider({ children }: { children: ReactNode }) {
  const [approvalState, setApprovalState] = useState<ApprovalState>({
    tokenAddress: '',
    approvedAmount: '0',
    isApproved: false,
  });

  return (
    <ApprovalContext.Provider value={{ approvalState, setApprovalState }}>
      {children}
    </ApprovalContext.Provider>
  );
}

// Custom hook to use the search context
export const useApprove = () => {
  const context = useContext(ApprovalContext);
  if (!context)
    throw new Error('useApprove must be used within ApprovalProvider');
  return context;
};
