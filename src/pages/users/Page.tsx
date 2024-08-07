import { useState } from "react";
import type { TableColumnsType } from 'antd';
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { HttpError, useParsed, useTranslate, useDelete, useNavigation, useGetIdentity } from "@refinedev/core";
import { useTable } from "@refinedev/antd";
import { Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Table } from '@/components/table/Table';
import { Header } from '@/components/table/Header';
import { ButtonReload } from '@/components/ButtonReload';
import type { IUser } from '@/types/Types';

export default function Page(){
  const title = "Users";

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
    tableQueryResult: {
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
    resource: "users" + (searchValue.length ? "/search" : ""),
    pagination: { pageSize, current },
    sorters: { initial: sorters },
    filters: { initial: filters },
    meta: {
      keyData: "users",
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
          resource: "users",
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

  const columns: TableColumnsType<any> = [
    {  
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 175,
    },
    {  
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 175,
    },
    {  
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 165,
    },
    {  
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 95,
    },
    {  
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 95,
    },
    {  
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 235,
      render: (txt) => <a href={"mailto:" + txt}>{txt}</a>
    },
    {  
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 95,
    },
  ];

  if(isAdmin){
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
            onClick={() => push("/users/" + row.id)}
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
              onClick={() => push('/users/create')}
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
