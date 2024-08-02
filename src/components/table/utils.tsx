import { useRef } from 'react';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType } from 'antd';
import { Input, Button } from 'antd';

export const getFilterItem = (filters: any, field: string) => {
  return filters?.find((item: any) => item.field === field)?.value?.[0] || "";
}

export const setOrders = (sorters: Array<any>) => {
  return sorters?.map((item: any) => ({ columnName: item.field, direction: item.order }) );
}

type DataIndex = string;

export const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<any> => {
  const searchInput = useRef<InputRef>(null);

  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
      const changeInput = (e: any) => {
        let val = e.target.value;
        setSelectedKeys(val ? [val] : []);
      }

      const doSearch = (val: string, e: any, { source }: any) => {
        e.stopPropagation();
        if(e.type === "click" && e.target.tagName !== "INPUT"){
          setTimeout(() => {
            searchInput.current?.focus?.({ preventScroll: true });
          }, 1);
        }

        if(source === 'clear' && clearFilters){
          clearFilters()
        }

        confirm({ closeDropdown: !!val?.length });
      }

      return (
        <div 
          className="p-2 border border-orange-300 rounded-md flex"
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input.Search
            ref={searchInput}
            allowClear
            placeholder="Search"
            value={selectedKeys[0]}
            onChange={changeInput}
            onSearch={doSearch}
          />
          
          <Button
            title="CLose"
            className="ml-1"
            icon={<CloseOutlined />}
            onClick={() => close()}
          />
        </div>
      )
    },
    filterIcon: () => (
      <SearchOutlined title="Filter" />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase())
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 9);
      }
    },
  }
}
