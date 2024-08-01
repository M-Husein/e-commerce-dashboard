import { useState } from "react";
import type { TableColumnsType } from 'antd';
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { HttpError, useParsed, useTranslate, useDelete, useNavigation, useGetIdentity } from "@refinedev/core"; // useNotification
import { useTable, getDefaultSortOrder } from "@refinedev/antd";
import { Button, Modal } from 'antd'; // Breadcrumb, 
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Table } from '@/components/table/Table';
import { Header } from '@/components/table/Header';
import { ButtonReload } from '@/components/ButtonReload';
import type { IUser } from '@/types/Types';

export default function Page(){
  const title = "Products";

  useDocumentTitle(title + " • " + import.meta.env.VITE_APP_NAME);

  const { params: { current, pageSize, sorters, filters } } = useParsed<any>();
  const { data: currentUser } = useGetIdentity<IUser>();
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
    resource: "products" + (searchValue.length ? "/search" : ""),
    pagination: { pageSize, current },
    sorters: { initial: sorters },
    filters: { initial: filters },
    meta: {
      keyData: "products",
      searchParams: {
        limit: pageSize,
        skip: current,
        q: searchValue,
      }
    }
  });

  let loadingTable = isLoading || isFetching || isRefetching;
  // console.log('tableProps: ', tableProps)

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
          resource: "products",
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
      title: '',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      align: 'center',
      width: 75,
      render: (txt, row) => txt && (
        <Link 
          to={"/products/" + row.id} 
          className="inline-block focus_ring rounded"
        >
          <img 
            loading="lazy" 
            decoding="async" 
            crossOrigin="anonymous"
            className="max-w-full rounded object-contain" 
            width={55}
            height={55}
            // src={"https://dummyjson.com/image/55?text=" + row.title}
            src={txt}
            alt={row.title}
          />
        </Link>
      )
    },
    {  
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 235,
      // sorter: (a: any, b: any) => a.title - b.title,
      // sortOrder: getDefaultSortOrder('title', sorter),
      // ...getColumnSearchProps('title'),
    },
    {  
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      width: 175,
    },
    {  
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 155,
    },
    {  
      title: 'Sku',
      dataIndex: 'sku',
      key: 'sku',
      width: 105,
    },
    {  
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: 75,
      render: renderNumberCol
    },
    {  
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 95,
      render: renderNumberCol
    },
    {  
      title: 'Discount',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      width: 85,
      render: renderNumberCol
    },
    {  
      title: 'Minimum Order Qty',
      dataIndex: 'minimumOrderQuantity',
      key: 'minimumOrderQuantity',
      width: 155,
      render: renderNumberCol
    },
    {  
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 75,
      render: renderNumberCol
    },
  ];

  if(isAdmin){
    columns.push({
      title: '',
      dataIndex: 'x',
      key: 'x',
      align: 'center',
      fixed: 'right',
      width: 75,
      render: (txt: any, row: any) => (
        <>
          <Button
            title="Edit"
            size="small"
            className="btn-app"
            icon={<EditOutlined />}
            onClick={() => push("/products/" + row.id)}
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
              onClick={() => push('/products/create')}
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
        scroll={{ x: 1255 }}
        loading={loadingTable}
        columns={columns}
        title={renderTitle}
      />

      {modalContextHolder}
    </>
  );
}
