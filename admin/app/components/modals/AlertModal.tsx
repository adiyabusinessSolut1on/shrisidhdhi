// components/AlertModal.js

import { useRouter } from "next/navigation";

interface AlertModalType {
  url: string;
  closeModal: () => void;
}
const AlertModal = ({ url, closeModal }: AlertModalType) => {
  // const router = useRouter();

  // const handleNavigate = () => {
  //   router.push(url);
  // };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6">Navigate to Website</h2>
        <p className="mb-2">You are about to visit:</p>
        <p className="mb-6 text-blue-600 underline">
          {url.slice(url.indexOf("//") + 2, url.lastIndexOf(".com"))}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-md"
            onClick={closeModal}
          >
            Cancel
          </button>
          {/* <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleNavigate}
          >
            Go to Website
          </button> */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
