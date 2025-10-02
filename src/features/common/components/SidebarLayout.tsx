import { useState } from "react"
import { MobileSidebar } from "./layout/MobileSidebar"
import { NavbarItem } from "./navbar"

function OpenMenuIcon() {
  return (
    <svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
    </svg>
  )
}


export function SidebarLayout({
	navbar,
	sidebar,
	children
}: React.PropsWithChildren<{ navbar: React.ReactNode, sidebar: React.ReactNode }>) {
	let [showSidebar, setShowSidebar] = useState(false)
	return (
		<div className='relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950'>
			{/* Desktop Sidebar */}
			<div className='fixed inset-y-0 left-0 w-64 max-lg:hidden'>
				{sidebar}
			</div>

			{/* Sidebar Mobile */}
			<MobileSidebar open={showSidebar} close={() => setShowSidebar(false)}>
				{sidebar}
			</MobileSidebar>


			{/* Navbar on mobile */}
      <header className="flex items-center px-4 lg:hidden">
        <div className="py-2.5">
          <NavbarItem onClick={() => setShowSidebar(true)} aria-label="Open navigation">
            <OpenMenuIcon />
          </NavbarItem>
        </div>
        <div className="min-w-0 flex-1">{navbar}</div>
      </header>



			<main className='flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64'>
				<div className='grow p-6 lg:rounded-lg lg:bg-white lg:p-1p lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10'>
					<div className='mx-auto max-2-6xl'>
						{children}
					</div>
				</div>
			</main>
		</div>
	)
}