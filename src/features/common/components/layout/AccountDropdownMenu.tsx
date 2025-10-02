import { ArrowRightStartOnRectangleIcon, LightBulbIcon, ShieldCheckIcon, UserCircleIcon } from "@heroicons/react/16/solid"
import { DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "../dropdown"

export function AccountDropdownMenu({
	anchor = 'bottom end'
} : {
	anchor: 'top start' | 'bottom end'
}) {
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
			<DropdownItem href="/login">
				<ArrowRightStartOnRectangleIcon />
				<DropdownLabel>Sign out</DropdownLabel>
			</DropdownItem>
		</DropdownMenu>
	)
}