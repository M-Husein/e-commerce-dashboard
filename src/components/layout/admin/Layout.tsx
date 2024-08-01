import '@/style/components/layout_main.scss';

import { Layout as AntdLayout, FloatButton } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Title } from './Title';
import { Header } from './Header';
import { Sider } from './Sider';
import { useApp } from "@/contexts/app/AppContext";
import { ThemedLayoutContextProvider } from "@/contexts/themedLayout";

export const Layout: React.FC<any> = ({
  appName,
  children,
  initialSiderCollapsed,
}) => {
  const { theme } = useApp();

  return (
    <ThemedLayoutContextProvider
      initialSiderCollapsed={initialSiderCollapsed}
    >
      <AntdLayout className="min-h-fullscreen">
        <Sider
          appName={appName}
          theme={theme}
          Title={({ collapsed }: any) => (
            <Title
              collapsed={collapsed}
              text={appName}
              icon={<img width={24} height={24} src="/logo-36x36.png" alt={appName} />}
            />
          )}
        />

        <AntdLayout>
          <Header />

          <AntdLayout.Content className="lg_p-5 p-2 relative">
            {children}
          </AntdLayout.Content>

          <FloatButton.BackTop
            type="primary"
            visibilityHeight={99}
            icon={<ArrowUpOutlined />} // @ts-ignore
            tabIndex={-1}
            style={{ marginBottom: -40, marginRight: -16 }}
            title="Back to top"
          />
        </AntdLayout>
      </AntdLayout>
    </ThemedLayoutContextProvider>
  )
}
