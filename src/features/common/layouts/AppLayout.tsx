import { ChevronDownIcon, Cog6ToothIcon, Cog8ToothIcon, HomeIcon, HomeModernIcon, QuestionMarkCircleIcon, SparklesIcon, Square2StackIcon, TicketIcon } from "@heroicons/react/16/solid"
import { Avatar } from "../components/avatar"
import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "../components/dropdown"
import { AccountDropdownMenu } from "../components/layout/AccountDropdownMenu"
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "../components/navbar"
import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarHeading, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer } from '../components/sidebar';
import { SidebarLayout } from "../components/SidebarLayout"
import { Link } from "react-router-dom"

const HOME_ICON_SIZE = 20;

export function AppLayout({
	children
}: {
	children: React.ReactNode
}) {
	const pathName: string = '/';
	return (
		<SidebarLayout
			navbar={
				<Navbar>
					<NavbarSpacer />
					<NavbarSection>
						<Dropdown>
							<DropdownButton as={NavbarItem}>
								<Avatar
									src='https://file.garden/aNa8POjYu0nxNoUR/miron.jpg'
									alt="User avatar"
								/>
							</DropdownButton>
							<AccountDropdownMenu anchor="bottom end" />
						</Dropdown>

					</NavbarSection>
				</Navbar>
			}

			sidebar={
				<Sidebar>
					<SidebarHeader>
						<Dropdown>
							<DropdownButton as={SidebarItem}>
								<Avatar
									src='https://file.garden/aNa8POjYu0nxNoUR/miron.jpg'
									alt="User avatar"
								/>
								<SidebarLabel>MIRON AZUECENO</SidebarLabel>
								<ChevronDownIcon/>
							</DropdownButton>

							<DropdownMenu className='min-w-80 lg:min-w-64' anchor='bottom start'>
								<DropdownItem href='settings'>
									<Cog8ToothIcon />
									<DropdownLabel>Settings</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />

								<DropdownItem href="#">
									<Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
									<DropdownLabel>Big Events</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
							</DropdownMenu>
						</Dropdown>
					</SidebarHeader>

					<SidebarBody>
						<SidebarSection>
							<SidebarItem href="/" current={pathName === '/'}>
								<HomeIcon width={HOME_ICON_SIZE} />
								<SidebarLabel>Home</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/events" current={pathName.startsWith('/events')}>
								<Square2StackIcon width={HOME_ICON_SIZE} />
								<SidebarLabel>Orders</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/orders" current={pathName.startsWith('/orders')}>
								<TicketIcon width={HOME_ICON_SIZE} />
								<SidebarLabel>Bills</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/invoices" current={pathName.startsWith('/invoices')}>
								<HomeModernIcon width={HOME_ICON_SIZE} />
								<SidebarLabel>Providers</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/settings" current={pathName.startsWith('/settings')}>
								<Cog6ToothIcon width={HOME_ICON_SIZE} />
								<SidebarLabel>Settings</SidebarLabel>
							</SidebarItem>
						</SidebarSection>

						<SidebarSection className='mx-lg:hiden'>
							<SidebarHeading>Super User Settings</SidebarHeading>

							<Link to='/users' key='users'>
								<SidebarItem key='users'>
									Users Managment
								</SidebarItem>
							</Link>

							<Link to='/roles' key='roles'>
								<SidebarItem>
									Roles Managment
								</SidebarItem>
							</Link>

							<Link to='/permissions' key='permissions'>
								<SidebarItem>
									Permission Managment
								</SidebarItem>
							</Link>
						</SidebarSection>

						<SidebarSpacer />

						<SidebarSection>
							<SidebarItem href="#">
								<QuestionMarkCircleIcon width={HOME_ICON_SIZE} />
								<SidebarLabel>Support</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="#">
								<SparklesIcon width={HOME_ICON_SIZE} />
								<SidebarLabel>Changelog</SidebarLabel>
							</SidebarItem>
						</SidebarSection>

					</SidebarBody>

					<SidebarFooter className='max-lg:hidden'>
						<Dropdown>
							<DropdownButton as={SidebarItem}>
								<span className='flex min-w-0 items-center gap-3'>
									<Avatar src='https://file.garden/aNa8POjYu0nxNoUR/miron.jpg' alt="User avatar" className='size-10' square />
									<span className='min-w-p'>
										<span className='block truncate text-sm/5 font-medium text-zinc-950 dark:text-white'>MIRON SCREEN</span>
										<span className='block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400'>
											omiron@drapper.com
										</span>
									</span>
								</span>
							</DropdownButton>
							<AccountDropdownMenu anchor="top start" />
						</Dropdown>
					</SidebarFooter>
				</Sidebar>
			}
		>
			{ children }
		</SidebarLayout>
	)
}