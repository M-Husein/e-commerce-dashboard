import { useState, useCallback, useDeferredValue } from "react";
import { Layout, Menu, Grid, Drawer, Button, Input } from "antd";
import { FaHouse, FaList, FaBars, FaCircleInfo } from "react-icons/fa6";
import {
  // useTranslate,
  useTitle,
  CanAccess,
  ITreeMenu,
  useMenu,
  useRefineContext,
  pickNotDeprecated,
  // useWarnAboutChange,
} from "@refinedev/core";
import { useThemedLayoutContext } from "@/utils/hooks/useThemedLayoutContext";
import { useLocation, Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { Title as TitleDefault } from './Title';
import { recursiveFilter } from '@/utils/recursive';

const width = 230;
const collapsedWidth = 55;

export const Sider = ({
  appName,
  theme: colorScheme,
  Title: TitleFromProps,
  render,
  meta,
  // activeItemDisabled = false,
}: any) => {
  const { siderCollapsed, setSiderCollapsed, mobileSiderOpen, setMobileSiderOpen } = useThemedLayoutContext();
  // const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const TitleFromContext = useTitle();
  // const translate = useTranslate();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
  const { hasDashboard } = useRefineContext();
  const location = useLocation();

  const breakpoint = Grid.useBreakpoint();
  const isMobile = typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? TitleDefault;

  const [searchOn, setSearchOn] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const deferredSearchValue = useDeferredValue(searchValue);
  const [searchResult, setSearchResult] = useState<any>([]);

  const clickLink = (e: any, route: any) => {
    if(location.search && location.pathname === route){
      e.preventDefault();
      e.stopPropagation();
    }
  }

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, key, name, children, parentName, meta, options } = item;

      if (children.length > 0) {
        return (
          <CanAccess
            key={key} // item.key
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <Menu.SubMenu
              key={key}
              icon={icon ?? <FaList />}
              title={label}
            >
              {renderTreeView(children, selectedKey)}
            </Menu.SubMenu>
          </CanAccess>
        );
      }

      const UNDEFINED = undefined;
      const isSelected = key === selectedKey;
      const isRoute = !(pickNotDeprecated(meta?.parent, options?.parent, parentName) !== UNDEFINED && children.length === 0);
      const isActiveLink = isSelected ? { cursor: 'auto' } : UNDEFINED;

      return (
        <CanAccess
          key={key}
          resource={name.toLowerCase()}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Menu.Item
            key={key}
            icon={icon ?? (isRoute && <FaList />)}
            style={isActiveLink}
            // className={isActiveLink}
          >
            <Link
              to={route ?? ""}
              style={isActiveLink}
              // className={isActiveLink}
              tabIndex={isSelected ? -1 : UNDEFINED}
              title={!isMobile && !siderCollapsed ? label : UNDEFINED}
              onClick={(e: any) => clickLink(e, route)}
            >
              {label}
            </Link>
            
            {!siderCollapsed && isSelected && (
              <div className="a-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  const debouncedFilter = useCallback(debounce((val: string) => {
    const result = recursiveFilter(
      menuItems,
      (item: any) => item.label.toLowerCase().includes(val.toLowerCase())
    ) as [];

    setSearchResult(result);
    setSearchOn(false);

    /** @DEV_OPTION : Collapse all nested child */
    if(result.length){
      setTimeout(() => {
        document.querySelectorAll('.sider-menu [aria-expanded=false]:not(.sider-search)')
          .forEach((item: any) => item.click());
      }, 9);
    }
  }, 500), []);

  const onFilterMenu = (e: any) => {
    e.stopPropagation();
    const val = e.target.value;
    setSearchValue(val);

    const valTrim = val.trim();
    if(valTrim){
      setSearchOn(true);
      debouncedFilter(valTrim);
      return;
    }
    setSearchResult([]);
  }

  const toggleSiderCollapse = (collapsed: boolean) => {
    setSiderCollapsed(collapsed);
    localStorage.setItem('asideMin', collapsed ? '1' : '0');
  }

  // @ts-ignore
  const onSearch = (val: any, e: any) => {
    e.stopPropagation();

    const isClick = e.type === "click";

    // Expand sider only large device
    if(!isMobile && siderCollapsed && isClick){
      toggleSiderCollapse(false);
    }
    // Focus input search
    if(isClick && e.target.tagName !== "INPUT"){
      setTimeout(() => {
        document.getElementById('siderSearch')?.focus?.();
      }, 1);
    }
  }

  const dashboard = hasDashboard ? (
    <Menu.Item key="dashboard" icon={<FaHouse />}>
      {/* <Link to="/">{translate("dashboard.title")}</Link> */}
      <Link to="/">Dashboard</Link>
      {!siderCollapsed && selectedKey === "/" && <div className="a-menu-tree-arrow" />}
    </Menu.Item>
  ) : null;

  const searchValueTrim = !!deferredSearchValue.trim();
  const items = renderTreeView(searchValueTrim ? searchResult : menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        items,
        logout: null,
        collapsed: siderCollapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
      </>
    );
  };

  const renderMenu = () => {
    return (
      <Menu
        theme={colorScheme}
        mode="inline"
        inlineIndent={9}
        className="pb-2 q-scroll scroll-hover border-0 overflow-auto overscroll-contain flex-1 sider-menu"
        // selectable={false}
        selectedKeys={selectedKey ? [selectedKey] : []}
        defaultOpenKeys={defaultOpenKeys}
        onClick={(obj: any) => {
          isMobile && !obj.key.startsWith("_x") && setMobileSiderOpen(false)
        }}
      >
        <Menu.Item
          key="_x"
          title=""
          className="after-no !sticky top-0 z-1 shadow bg-main sider-search"
          style={{ 
            paddingLeft: 0, 
            marginBlockStart: 0, 
            height: 'auto', 
            lineHeight: 'normal',
            width: 'auto',
            borderRadius: 0,
            // paddingBottom: 5,
            // marginBottom: 7,
            // cursor: 'auto',
          }}
          role="search"
        >
          <Input.Search
            allowClear
            // variant="borderless" // filled | borderless
            // size="large"
            id="siderSearch"
            placeholder="Search"
            value={searchValue}
            onChange={onFilterMenu}
            onSearch={onSearch}
          />
        </Menu.Item>

        {renderSider()}

        {!searchOn && searchValueTrim && !items.length && (
          <Menu.Item
            key="_x2"
            danger
            title=""
            icon={<FaCircleInfo />}
            className="text-center font-bold pe-none"
            style={{ display: 'block' }}
          >
            Not Found
          </Menu.Item>
        )}
      </Menu>
    );
  };

  const renderDrawerSider = () => {
    return (
      <>
        <Drawer
          open={mobileSiderOpen}
          onClose={() => setMobileSiderOpen(false)}
          placement="left"
          closable={false}
          width={275}
          styles={{
            body: { padding: 0, overflow: 'unset' }
          }}
          maskClosable
          rootClassName="z-1052 drawerMain siderMain"
        >
          <Layout>
            <Layout.Sider
              theme="light"
              width={275}
              style={{
                height: '100vh',
              }}
            >
              {renderMenu()}
            </Layout.Sider>
          </Layout>
        </Drawer>
        
        <div className="!fixed top-0 z-1052 h-12 flex items-center gap-x-2">
          <Button
            type="text"
            size="large"
            icon={<FaBars />}
            onClick={() => setMobileSiderOpen(true)}
          />

          <Link to="/" className="py-2 px-1">
            <img width={24} height={24} src="/logo-36x36.png" alt={appName} />
          </Link>
        </div>
      </>
    );
  };

  if (isMobile) {
    return renderDrawerSider();
  }

  const widthSider = siderCollapsed ? collapsedWidth : width;

  return (
    <>
      <div
        style={{
          width: widthSider,
          transition: 'all .2s',
        }}
      />

      <Layout.Sider
        theme="light"
        className="!fixed top-0 z-1051 h-screen siderMain" //  bg-nav
        id="asideMain"
        collapsible
        collapsed={siderCollapsed}
        onCollapse={(collapsed, type) => {
          type === "clickTrigger" && toggleSiderCollapse(collapsed)
        }}
        width={width}
        collapsedWidth={collapsedWidth}
        breakpoint="lg"
      >
        <div
          style={{ width: widthSider }}
          // bg-nav | bg-blue-100
          className={(siderCollapsed ? "!p-0 justify-center" : "p-4") + " bg-nav flex items-center h-12 shadow relative z-2"}
        >
          <RenderToTitle collapsed={siderCollapsed} />
        </div>
        
        {renderMenu()}
      </Layout.Sider>
    </>
  );
};
