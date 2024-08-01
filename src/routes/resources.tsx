import { HomeFilled } from '@ant-design/icons';
import { FaUser, FaDatabase, FaShoppingCart } from 'react-icons/fa';

export const RESOURCES = [
  {
    name: "dashboard",
    list: "/", // Render in menu
    meta: { label: "Dashboard", icon: <HomeFilled /> },
  },
  {
    name: "products",
    list: "/products",
    show: "/products/:id",
    meta: { label: "Products", icon: <FaDatabase /> },
  },
  {
    name: "orders",
    list: "/orders",
    show: "/orders/:id",
    meta: { label: "Orders", icon: <FaShoppingCart /> },
  },
  {
    name: "users",
    list: "/users",
    show: "/users/:id",
    meta: { label: "Users", icon: <FaUser /> },
  },
];
