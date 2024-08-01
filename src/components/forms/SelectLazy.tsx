import { forwardRef, useCallback } from 'react';
import { Select, Skeleton } from 'antd';
import debounce from 'lodash/debounce';
// import cx from 'classnames';

export const SelectLazy = forwardRef(
  (
    {
      more,
      loading,
      popupClassName,
      notFoundContent,
      options,
      onPopupScroll,
      onPopupScrollEnd,
      onSearch,
      showSearch = !0,
      defaultActiveFirstOption = !1,
      optionFilterProp = "text",
      fieldNames = { label: "text", value: "id" },
      placeholder = "Please Select",
      ...etc
    }: any,
    ref
  ) => {
    const debouncedScroll = useCallback(debounce((e: any) => {
      const { scrollTop, offsetHeight, scrollHeight } = e.target;
      onPopupScrollEnd(scrollTop + offsetHeight === scrollHeight, e);
    }, 95), []);

    const popupScroll = (e: any) => {
      onPopupScroll?.(e);

      if(typeof onPopupScrollEnd === 'function' && more && !loading){
        debouncedScroll(e);
      }
    }

    const doSearch = useCallback(debounce((val: any) => {
      onSearch?.(val);
    }, 500), []);

    const loader = <Skeleton active title={false} paragraph={{ rows: 1, width: '100%' }} className="py-1 px-2" />;
  
    return (
      <Select
        {...etc}
        ref={ref}
        defaultActiveFirstOption={defaultActiveFirstOption}
        fieldNames={fieldNames}
        optionFilterProp={optionFilterProp}
        virtual={!loading}
        showSearch={showSearch}
        loading={loading}
        options={options}
        placeholder={loading ? "Loading" : placeholder}
        notFoundContent={loading ? loader : notFoundContent}
        // popupClassName={
        //   cx(loading && options?.length > 8 && "antSelectLoading", popupClassName)
        // }
        // Only add custom class for styling scroll area
        popupClassName={"antSelectLazy " + (loading && options?.length > 8 ? "antSelectLoading " : "") + popupClassName}
        dropdownRender={(menu) => (
          <>
            {menu}
            {loading && loader}
          </>
        )}
        onPopupScroll={popupScroll}
        onSearch={showSearch ? doSearch : undefined}
      />
    );
  }
);
