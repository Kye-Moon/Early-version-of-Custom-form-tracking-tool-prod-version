import {HomeIcon} from '@heroicons/react/20/solid'

interface BreadCrumbProps {
    pages: { name?: string; href: string; current: boolean }[]
}
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function BreadCrumb({pages}: BreadCrumbProps) {
    return (
        <nav className="flex pt-3" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                <li>
                    <div>
                        <a href="/dashboard" className="text-gray-400 hover:text-gray-500">
                            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true"/>
                            <span className="sr-only">Home</span>
                        </a>
                    </div>
                </li>
                {pages.map((page) => (
                    <li key={page.name}>
                        <div className="flex items-center">
                            <svg
                                className="h-5 w-5 flex-shrink-0 text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                            </svg>
                            <a
                                href={page.href}
                                className={classNames("ml-4 text-sm font-medium text-gray-500 hover:text-gray-700", page.current ? "text-blue-900" : "")}
                                aria-current={page.current ? 'page' : undefined}
                            >
                                {page.name}
                            </a>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
