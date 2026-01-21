import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../../configuration/configuration';

export default function VerifyAccountPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    const verificationAttempted = useRef(false);

    useEffect(() => {
        const verify = async () => {
            const code = searchParams.get('code');
            if (!code) {
                setStatus('error');
                setMessage('Mã xác thực không hợp lệ.');
                return;
            }

            // Prevent double execution in Strict Mode
            if (verificationAttempted.current) return;
            verificationAttempted.current = true;

            try {
                const response = await fetch(`${API_BASE_URL}/auth/verify?code=${code}`);
                const data = await response.json();

                if (response.ok && data.result) {
                    setStatus('success');
                    setMessage('Tài khoản của bạn đã được xác thực thành công!');
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Xác thực thất bại. Mã có thể đã hết hạn.');
                }
            } catch (error) {
                console.error("Verification error", error);
                setStatus('error');
                setMessage('Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.');
            }
        };

        verify();
    }, [searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
                {status === 'loading' && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-16 h-16 text-teal-600 animate-spin mb-4" />
                        <h2 className="text-xl font-semibold text-slate-800">Đang xác thực...</h2>
                        <p className="text-slate-600 mt-2">Vui lòng đợi trong giây lát</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                        <h2 className="text-xl font-semibold text-slate-800">Xác thực thành công!</h2>
                        <p className="text-slate-600 mt-2 mb-6">{message}</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg transition"
                        >
                            Đăng nhập ngay
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center">
                        <XCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h2 className="text-xl font-semibold text-slate-800">Xác thực thất bại</h2>
                        <p className="text-slate-600 mt-2 mb-6">{message}</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium py-2 px-6 rounded-lg transition"
                        >
                            Quay lại trang đăng nhập
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
