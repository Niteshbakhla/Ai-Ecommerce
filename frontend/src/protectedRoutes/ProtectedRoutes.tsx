import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
            allowedRoles?: string[]; // optional            
}

export default function ProtectedRoute({ allowedRoles }: Props) {
            const user = useSelector((state: RootState) => state.auth.user)
            const accessToken = useSelector((state: RootState) => state.auth.accessToken)

            // Not logged in?
            if (!user || !accessToken) {
                        return <Navigate to="/login" replace />;
            }

            // Role check (optional)
            if (allowedRoles && !allowedRoles.includes(user.role)) {
                        return <Navigate to="/" replace />;
            }

            // OK, show page
            return <Outlet />;
}
