import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { twJoin } from 'tailwind-merge';

import { PublicationNavbarItem } from '../generated/graphql';
import { useAppContext } from './contexts/appContext';
import { lightOrDark } from '../utils/commonUtils';
import PublicationLogo from './publication-logo';
import HeaderBlogSearch from './header-blog-search';
import PublicationSocialLinks from './publication-social-links';
import PublicationNavLinks from './publication-nav-links';
import HeaderLeftSidebar from './header-left-sidebar';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}
type Props = {
	currentMenuId?: string | null;
	isHome: boolean;
  };

export const Header = (props: Props) => {
	const { currentMenuId, isHome } = props;
	const { publication } = useAppContext();
	const headerColor = publication.headerColor;
	const isUserThemeDark = headerColor ? lightOrDark(headerColor) === 'dark' : false;

	return (
		<header className="blog-header z-50 w-full border-b relative border-black/10 bg-white bg-opacity-70 dark:border-white/10 dark:bg-slate-900 dark:bg-opacity-70">
			<div className="container mx-auto px-2 md:px-4 2xl:px-10">
			<div className="relative z-40 flex flex-row items-center justify-between pb-2 pt-8 md:mb-4">
				<div className="flex flex-row items-center py-1">
					 {/* Navigation for mobile view */}
					<div
						className={twJoin(
						'md:hidden',
						isUserThemeDark ? 'text-white' : publication.headerColor ? 'text-black' : 'dark:text-white',
						)}
					>
						<HeaderLeftSidebar isUserThemeDark={isUserThemeDark} publication={publication} />
					</div>
					<div className="hidden md:block">
						<PublicationLogo publication={publication} size="lg" withProfileImage />
					</div>
				</div>

				<div className={twJoin('flex flex-row items-center',
            		isUserThemeDark ? 'text-white' : publication.headerColor ? 'text-black' : 'dark:text-white',
         		 )}>
          			<HeaderBlogSearch isUserThemeDark={isUserThemeDark} publication={publication} />
          		</div>
			</div>

			{/* Logo for mobile view */}
			<div className="mx-auto my-5 flex w-2/3 flex-row items-center justify-center md:hidden">
        		<PublicationLogo publication={publication} size="xl" />
      		</div>

			<div className="blog-sub-header" data-testid="blog-sub-header">
				{/* Desktop */}
				<div className="justify-betweem mx-0 mb-2 hidden w-full flex-row items-center md:flex">
					<PublicationSocialLinks links={publication.links} headerColor={publication.headerColor} />
				</div>
				{/* Mobile view */}
				<div className="mb-2 flex w-full flex-col items-center md:hidden">
					<PublicationSocialLinks links={publication.links} headerColor={publication.headerColor} />
				</div>
     		</div>

			<div className="relative mt-8 hidden flex-row items-center justify-center overflow-hidden text-base md:flex"
          		data-tom="hidden md:flex relative flex-row items-center justify-center overflow-hidden text-base mt-8">
          		<PublicationNavLinks
					isHome={isHome}
					currentActiveMenuItemId={currentMenuId}
					enabledPages={publication.preferences?.enabledPages}
					navbarItems={publication.preferences?.navbarItems || []}
					headerColor={publication.headerColor}
          		/>
        	</div>
		</div>
		</header>
	);
};
