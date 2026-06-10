const RedeemModal = ({
  open,
  reward,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold">
          Redeem Reward
        </h2>

        <p className="mt-4">
          Redeem{" "}
          <strong>
            {reward?.name}
          </strong>
          ?
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-green-700 text-white py-3 rounded-xl"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedeemModal;