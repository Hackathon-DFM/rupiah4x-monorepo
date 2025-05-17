'use client';

interface DisconnectConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DisconnectConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DisconnectConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Disconnect Wallet
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Are you sure you want to disconnect your wallet?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};
