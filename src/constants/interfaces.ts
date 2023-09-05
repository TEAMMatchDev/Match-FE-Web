export interface LoginProps {
    email: string;
    password: string;
}

export interface kakaoLoginProps {
    onSuccess: string;
}

export interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    refreshToken: string | null;
    updateAccessToken: (token: string) => void;
    refreshAccessToken: () => Promise<void>;
    logoutHandler: () => void;
}