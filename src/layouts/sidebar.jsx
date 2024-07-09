import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { navItems } from "../App";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-grow">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Quant Backtest Dashboard</h1>
          </div>
        </header>
        <main className="flex-grow p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const Sidebar = ({ open, setOpen }) => (
  <Sheet open={open} onOpenChange={setOpen}>
    <SheetContent side="left" className="w-[220px] sm:w-[280px] p-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-6 w-6" />
            <span>Quant Backtest</span>
          </NavLink>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
            {navItems.map((item) => (
              <SidebarNavLink key={item.to} to={item.to}>
                {item.icon}
                {item.title}
              </SidebarNavLink>
            ))}
          </nav>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

const SidebarNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
        isActive && "text-primary bg-muted",
      )
    }
  >
    {children}
  </NavLink>
);

export default Layout;