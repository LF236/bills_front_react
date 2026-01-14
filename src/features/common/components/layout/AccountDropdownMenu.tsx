import { ArrowRightStartOnRectangleIcon, LightBulbIcon, ShieldCheckIcon, UserCircleIcon } from "@heroicons/react/16/solid"
import { DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "../dropdown"
import { useAuth } from "../../../auth/hooks/useAuth"
import { useNavigate } from "react-router-dom";

export function AccountDropdownMenu({
	anchor = 'bottom end'
} : {
	anchor: 'top start' | 'bottom end'
}) {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/auth/login');
	}

	return (
		<DropdownMenu className="min-w-64" anchor={anchor}>
			<DropdownItem href="#">
				<UserCircleIcon />
				<DropdownLabel>My account</DropdownLabel>
			</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="#">
				<ShieldCheckIcon />
				<DropdownLabel>Privacy policy</DropdownLabel>
			</DropdownItem>
			<DropdownItem href="#">
				<LightBulbIcon />
				<DropdownLabel>Share feedback</DropdownLabel>
			</DropdownItem>
			<DropdownDivider />
			<DropdownItem onClick={handleLogout}>
				<ArrowRightStartOnRectangleIcon />
				<DropdownLabel>Sign out</DropdownLabel>
			</DropdownItem>
		</DropdownMenu>
	)
}