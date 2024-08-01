import { useState } from "react";
import type { TableColumnsType } from 'antd';
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { HttpError, useParsed, useTranslate, useDelete, useNavigation, useGetIdentity } from "@refinedev/core"; // useNotification
import { useTable, getDefaultSortOrder } from "@refinedev/antd";
import { Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FaRegUser } from "react-icons/fa";
import { Table } from '@/components/table/Table';
import { Header } from '@/components/table/Header';
import { ButtonReload } from '@/components/ButtonReload';
import type { IUser } from '@/types/Types';

export default function Page(){
  const title = "Orders";

  useDocumentTitle(title + " • " + import.meta.env.VITE_APP_NAME);

  const { data: currentUser } = useGetIdentity<IUser>();
  const { params: { current, pageSize, sorters, filters } } = useParsed<any>();
  const translate = useTranslate();
  const { push } = useNavigation();
  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useDelete();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [searchValue, setSearchValue] = useState<string>('');

  const isAdmin = currentUser?.role === "admin";

  const {
    tableProps,
    sorter,
    tableQueryResult: { 
      // data: tableData, 
      isLoading, 
      isFetching, 
      isRefetching, 
      refetch 
    },
    setCurrent,
  } = useTable<any, HttpError>({
    syncWithLocation: true,
    queryOptions: {
      enabled: !!current,
    },
    resource: "carts" + (searchValue.length ? "/search" : ""),
    pagination: { pageSize, current },
    sorters: { initial: sorters },
    filters: { initial: filters },
    meta: {
      keyData: "carts",
      searchParams: {
        limit: pageSize,
        skip: current,
        q: searchValue,
      }
    }
  });

  let loadingTable = isLoading || isFetching || isRefetching;

  const confirmModal = (title: any, callback: (fn: any) => void): void => {
    const modalConfirm = modalApi.confirm({
      keyboard: false,
      centered: true,
      title,
      cancelButtonProps: { disabled: false },
      onOk(){
        const updateConfirm = (disabled: boolean) => {
          modalConfirm.update({
            cancelButtonProps: { disabled }
          })
        }

        updateConfirm(true);

        return callback(updateConfirm);
      },
    });
  }

  const clickDelete = (data: any) => {
    confirmModal(
      translate('confirms.delete'),
      (updateConfirm) => new Promise((resolve, reject) => {
        mutateDelete({
          resource: "carts",
          id: data.id,
        }, {
          onError: (e) => {
            updateConfirm(false)
            reject(e)
          },
          onSuccess: (data: any) => {
            refetch();
            resolve(data);
          },
        });
      })
    );
  }

  const renderNumberCol = (txt?: string) => <div className="text-right">{txt}</div>;

  const columns: TableColumnsType<any> = [
    {  
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 55,
      render: renderNumberCol,
      // sorter: (a: any, b: any) => a.title - b.title,
      // sortOrder: getDefaultSortOrder('title', sorter),
      // ...getColumnSearchProps('title'),
    },
    {  
      title: 'Total Products',
      dataIndex: 'totalProducts',
      key: 'totalProducts',
      width: 65,
      render: renderNumberCol
    },
    {  
      title: 'Discounted Total',
      dataIndex: 'discountedTotal',
      key: 'discountedTotal',
      width: 95,
      render: renderNumberCol,
    },
    {  
      title: 'Total Qty',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      width: 75,
      render: renderNumberCol
    },
  ];

  if(isAdmin){
    columns.unshift({  
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      width: 65,
      render: (txt) => (
        <Button 
          size="small"
          type="link"
          icon={<FaRegUser />}
          onClick={() => push('/users/' + txt)}
        >
          Show
        </Button>
      )
    });

    columns.push({
      title: '',
      dataIndex: 'x',
      key: 'x',
      align: 'center',
      fixed: 'right',
      width: 65,
      render: (txt: any, row: any) => (
        <>
          <Button
            title="Edit"
            size="small"
            className="btn-app"
            icon={<EditOutlined />}
            onClick={() => push("/orders/" + row.id)}
          />
          {' '}
          <Button
            title="Delete"
            size="small"
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => clickDelete(row)}
          />
        </>
      ),
    });
  }

  const renderTitle = () => (
    <Header
      title={title}
      content={
        <>
          <ButtonReload
            disabled={isLoadingDelete}
            loading={!isLoading && isRefetching}
            onClick={() => refetch()}
          />

          {isAdmin && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => push('/orders/create')}
            >
              {translate('buttons.create')}
            </Button>
          )}
        </>
      }
      onSearch={(val: any) => {
        current > 1 && setCurrent(1);
        setSearchValue(() => val)
      }}
    />
  );

  return (
    <>
      <Table
        {...tableProps}
        className="antTable max-md_antTable-xs mt-4"
        scroll={{ x: 1105 }}
        loading={loadingTable}
        columns={columns}
        title={renderTitle}
      />

      {modalContextHolder}
    </>
  );
}
