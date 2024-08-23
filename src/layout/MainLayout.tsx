import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  House,
  FolderKanban,
  Timer,
  Cpu,
  Settings,
  LogOut,
  PanelLeft,
  Package2,
} from "lucide-react";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { logout, getUser, clearAllUserErrors } from "../store/slices/userSlice";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menu: {
  icon: ReactNode;
  name: string;
  to: string;
}[] = [
  {
    icon: <House />,
    name: "Dashboard",
    to: "/",
  },
  {
    icon: <FolderKanban />,
    name: "Project",
    to: "/",
  },
  {
    icon: <Timer />,
    name: "Timeline",
    to: "/",
  },
  {
    icon: <Cpu />,
    name: "Skills",
    to: "/",
  },
];

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { error, message, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
    if (message) {
      console.log(message);
    }
  }, [error, isAuthenticated, message, navigateTo]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 flex-col hidden border-r w-14 bg-background sm:flex">
        <nav className="flex flex-col items-center h-full gap-4 px-2 sm:py-5">
          <Link to={"/"} className="flex flex-col mb-6">
            <LayoutGrid />
          </Link>
          <div className="flex flex-col gap-8">
            {menu.map((item) => (
              <Link
                to={item.to}
                className="flex flex-col items-center justify-between"
              >
                {item.icon}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center justify-end flex-1 gap-4">
            <Link to={"/"}>
              <Settings />
            </Link>
            <Button
              className="bg-white text-[#060910] hover:bg-white p-1"
              onClick={handleLogout}
            >
              <LogOut />
            </Button>
          </div>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 border-b h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="w-5 h-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to={"/"}
                  className="flex items-center justify-center w-10 h-10 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-primary text-primary-foreground md:text-base"
                >
                  <Package2 className="w-5 h-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                {menu.map((item) => (
                  <Link
                    to={item.to}
                    className="flex items-center gap-4 px-2.5 text-gray-500"
                  >
                    {item.icon}
                    <span className="font-semibold text-black text-gray-500">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
