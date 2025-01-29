// components/Navbar.tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            {/* Home link */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="text-2xl font-bold hover:text-gray-300">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Add other links here, like "Team", "About", etc. */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/team" className="text-lg hover:text-gray-300">
                  Team
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Additional Links */}
            {/* Example: */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about" className="text-lg hover:text-gray-300">
                  About Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
