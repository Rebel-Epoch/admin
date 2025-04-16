import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  LogOutIcon,
  SettingsIcon,
  Shirt,
  ShoppingCart,
  TicketPercent,
  User2,
  UserIcon,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useAuth from "@/Utils/useAuth";

export function AppSidebar() {
  const { logout } = useAuth();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="users">
                    <Users />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/coupons">
                    <TicketPercent />
                    <span>Coupons</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/sotm">
                    <TicketPercent />
                    <span>Sotm</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <div className="flex ">
                        <Shirt />
                        <span>Products</span>
                        <ChevronDown className="ml-auto" />
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to="all-products">Products</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenuSub>

                    <SidebarMenuSub>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="">Category</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenuSub>

                    <SidebarMenuSub>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="">Varitaions</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenuSub>

                    <SidebarMenuSub>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href="">Filters</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="orders">
                    <ShoppingCart />
                    <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="return">
                    <Users />
                    <span>Return</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="replacement">
                    <Users />
                    <span>Replacements</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-fit flex justify-between gap-2">
                  <div className="flex flex-col gap-0.5 items-start">
                    <span className="w-fit leading-none">Admin Username</span>
                    <span className="w-fit text-xs text-white/65">
                      Last logged in 4 days ago..
                    </span>
                  </div>
                  <ChevronUp className="mr-2" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <UserIcon />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => logout()}
                >
                  <LogOutIcon />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
