'use client'
import { useState } from 'react';
import { useBackendSettings } from './backend-context';

interface SettingsModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SettingsModal:React.FC<SettingsModalProps> = ({ isOpen, setIsOpen}) => {
    const [backendIP, setBackendIP] = useState('');
    const [backendPort, setBackendPort] = useState('');
    const { setSettings } = useBackendSettings();
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const apiURL = `https://${backendIP}:${backendPort}`;
        setSettings({ apiURL })
        setIsOpen(false); // Close modal after saving settings
    };

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${!isOpen && 'hidden'}`}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay, show/hide based on modal state. */}
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                {/* Modal panel, show/hide based on modal state. */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    设置后端服务
                                </h3>
                                <div className="mt-2">
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="backendIP" className="block text-sm font-medium text-gray-700">
                                                IP地址:
                                            </label>
                                            <input
                                                type="text"
                                                id="backendIP"
                                                value={backendIP}
                                                onChange={(e) => setBackendIP(e.target.value)}
                                                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                                                placeholder="例如: 192.168.1.1"
                                                required
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="backendPort" className="block text-sm font-medium text-gray-700">
                                                端口:
                                            </label>
                                            <input
                                                type="text"
                                                id="backendPort"
                                                value={backendPort}
                                                onChange={(e) => setBackendPort(e.target.value)}
                                                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full"
                                                placeholder="例如: 8000"
                                                required
                                            />
                                        </div>
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                                            >
                                                保存
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
