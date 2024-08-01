import { lazy } from 'react'; // , Suspense
import { Routes, Route, Outlet } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router-v6";
import { ErrorComponent } from "@/components/ErrorComponent";
import { LoaderApp } from '@/components/LoaderApp';
import { Layout as LayoutAdmin } from '@/components/layout/admin/Layout';
import { lazyComponent } from '@/utils/components';

// Pages:
// Auth:
const Login = lazy(() => import('@/pages/login/Page'));
const Register = lazy(() => import('@/pages/register/Page'));
const ForgotPassword = lazy(() => import('@/pages/forgot-password/Page'));
// End Auth

// Admin
const Dashboard = lazy(() => import('@/pages/dashboard/Page'));

const Products = lazy(() => import('@/pages/products/Page'));
const CreateProduct = lazy(() => import('@/pages/products/Create'));
const ShowProduct = lazy(() => import('@/pages/products/Show'));

const Orders = lazy(() => import('@/pages/orders/Page'));
const ShowOrder = lazy(() => import('@/pages/orders/Show'));

const Users = lazy(() => import('@/pages/users/Page'));
const CreateUser = lazy(() => import('@/pages/users/Create'));
const ShowUser = lazy(() => import('@/pages/users/Show'));

const appName = import.meta.env.VITE_APP_NAME;

export const AppRoutes = () => {
  // @ts-ignore
  const initSiderCollapsed: any = !!+localStorage.getItem('asideMin');

  return (
    <Routes>
      <Route
        element={
          <Authenticated
            key="authenticated-inner"
            loading={<LoaderApp />}
            fallback={<CatchAllNavigate to="/login" />}
          >
            <LayoutAdmin
              appName={appName}
              initialSiderCollapsed={initSiderCollapsed}
            >
              <Outlet />
            </LayoutAdmin>
          </Authenticated>
        }
      >
        <Route index element={lazyComponent(Dashboard)} />

        {/* <Route index element={<NavigateToResource resource="dashboard" />} />
        <Route path="/" element={lazyComponent(Dashboard)} /> */}

        <Route path="/products">
          <Route index element={lazyComponent(Products)} />
          <Route path="create" element={lazyComponent(CreateProduct)} />
          <Route path=":id" element={lazyComponent(ShowProduct)} />
        </Route>

        <Route path="/orders">
          <Route index element={lazyComponent(Orders)} />
          <Route path=":id" element={lazyComponent(ShowOrder)} />
        </Route>

        <Route path="/users">
          <Route index element={lazyComponent(Users)} />
          <Route path="create" element={lazyComponent(CreateUser)} />
          <Route path=":id" element={lazyComponent(ShowUser)} />
        </Route>

        {/* <Route path="*" element={<ErrorComponent />} /> */}
      </Route>
      
      <Route
        element={
          <Authenticated
            key="authenticated-outer"
            loading={<LoaderApp />}
            fallback={<Outlet />}
          >
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route path="/login" element={lazyComponent(Login, <LoaderApp />)} />
        <Route path="/register" element={lazyComponent(Register, <LoaderApp />)} />
        <Route path="/forgot-password" element={lazyComponent(ForgotPassword, <LoaderApp />)} />
      </Route>

      {/** @NOTE : if use here, other layout override */}
      <Route path="*" element={<ErrorComponent />} />
    </Routes>
  );
}
