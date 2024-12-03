import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Sample data for products (replace with your data source)
  const products = [
    { id: 1, name: "Product A", createdAt: "2024-11-30 12:00 PM" },
    { id: 2, name: "Product B", createdAt: "2024-11-29 10:30 AM" },
    { id: 3, name: "Product C", createdAt: "2024-11-28 09:45 AM" },
  ]; // Fetch from metadata

  return (
    <div>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Typography variant="h5" color="blue-gray">
              Chat History
            </Typography>
          </div>
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
            {products.map((product) => (
              <ListItem
                key={product.id}
                className="flex items-start bg-gray-50 hover:bg-gray-100 transition-colors rounded-md p-3"
              >
                <ListItemPrefix>
                  <ChevronRightIcon className="h-5 w-5 text-blue-gray-400" />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="opacity-70"
                  >
                    {product.createdAt}
                  </Typography>
                </div>
              </ListItem>
            ))}
          </List>
        </Card>
      </Drawer>
    </div>
  );
}

export default Sidebar;
