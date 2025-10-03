'use client'

import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface AlertDefaultProps {
	timeToClose?: number;
	isWithTimeToClose?: boolean;
	title: string;
	subtitle: string;
	type: 'success' | 'error' | 'warning';
	showButtonClose?: boolean;
	onClose?: () => void;
	style?: React.CSSProperties;
}

export default function AlertDefault({
	timeToClose = 3000,
	isWithTimeToClose = true,
	title,
	subtitle,
	type,
	showButtonClose = false,
	onClose,
	style
}: AlertDefaultProps) {
	const [show, setShow] = useState(true);


	useEffect(() => {
		if (!isWithTimeToClose) return;
		setTimeout(() => {
			setShow(false);
		}, timeToClose);
	}, []);

	return (
		<>
			<Transition
				show={show}
				enter="transform transition ease-out duration-300"
				enterFrom="translate-x-full opacity-0"
				enterTo="translate-x-0 opacity-100"
				leave="transform transition ease-in duration-200"
				leaveFrom="opacity-100 translate-x-0"
				leaveTo="opacity-0 -translate-y-2"
			>
				<div
					className={
						`pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg outline-1 outline-black/5 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0 dark:bg-gray-800 dark:-outline-offset-1 dark:outline-white/10
							${style}
						`
					}
				>
					<div className="p-4">
						<div className="flex items-start">
							<div className="shrink-0">
								{type === 'error' && <ExclamationCircleIcon aria-hidden="true" className="size-6 text-red-400" />}
								{type === 'warning' && <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-yellow-400" />}
								{type === 'success' && <CheckCircleIcon aria-hidden="true" className="size-6 text-green-400" />}
							</div>
							<div className="ml-3 w-0 flex-1 pt-0.5">
								<p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
								<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
									{subtitle}
								</p>
							</div>

							{showButtonClose &&
								<div className="ml-4 flex shrink-0">
									<button
										type="button"
										onClick={() => {
											setShow(false),
												onClose && onClose();
										}}
										className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:hover:text-white dark:focus:outline-indigo-500"
									>
										<span className="sr-only">Close</span>
										<XMarkIcon aria-hidden="true" className="size-5" />
									</button>
								</div>
							}
						</div>
					</div>
				</div>
			</Transition>

		</>
	)
}
