import React from 'react';

interface WarningNotificationProps {
  message: string;
  onClose: () => void;
}

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const WarningNotification: React.FC<WarningNotificationProps> = ({ message, onClose }) => {
  return (
    <div className="w-full bg-yellow-500/20 backdrop-blur-md border border-yellow-400/50 text-yellow-100 px-4 py-3 rounded-xl relative shadow-lg animate-fade-in-up" role="alert">
      <div className="flex items-center">
        <div className="py-1"><WarningIcon /></div>
        <div>
          <p className="font-semibold ml-3">{message}</p>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-2 right-2 p-1 text-yellow-200 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-300" aria-label="Close warning">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default WarningNotification;
