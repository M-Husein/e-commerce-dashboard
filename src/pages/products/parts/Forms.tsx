
import { HttpError, useTranslate, useNavigation, useList, useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from 'react-hook-form';
import { Row, Col, Button, Input, InputNumber, Select } from 'antd';
import { Form } from '@/components/forms/Form';
import type { IUser, IProduct } from '@/types/Types';

export function Forms({
  values,
  disabled,
  buttons,
}: any){
  const { data: currentUser } = useGetIdentity<IUser>();
  const translate = useTranslate();
  const { push } = useNavigation();

  const isAdmin = currentUser?.role === "admin";

  const {
    data: dataCategories,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
    isRefetching: isRefetchingCategories,
  } = useList<any, HttpError>({
    resource: "products/categories",
    pagination: { mode: "off" },
  });

  let loadingCategories = isLoadingCategories || isFetchingCategories || isRefetchingCategories;

  const {
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { formLoading, onFinish },
  } = useForm<IProduct, HttpError, IProduct>({
    defaultValues: {
      category: "beauty"
    },
    values,
    refineCoreProps: {
      resource: "products" + (values ? "" : "/add"),
      action: values ? "edit" : "create",
      id: values ? values.id : undefined,
      queryOptions: {
        enabled: false,
      },
      redirect: false,
      onMutationSuccess: () => {
        !values && push('/products')
      },
    },
  });

  const disabledOrLoading = disabled || formLoading;

  return (
    <Form
      disabled={disabledOrLoading}
      className="grow w-full mt-4 lg_w-[calc(100%-185px)] lg_px-4 lg_ml-4"
      fieldsetClass="space-y-6"
      onSubmit={isAdmin ? handleSubmit(onFinish) : undefined}
    >
      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="title">Title</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="title"
                status={errors.title ? "error" : ""}
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
              />
            )}
            rules={{ required: true }}
          />
          {errors.title && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="brand">Brand</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="lname"
                status={errors.brand ? "error" : ""}
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
              />
            )}
            rules={{ required: true }}
          />
          {errors.brand && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="ctgr">Category</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              isAdmin ?
                <Select
                  {...field}
                  id="ctgr"
                  className="w-full"
                  showSearch
                  loading={loadingCategories}
                  options={(dataCategories?.data || []).map((item: any) => ({ label: item.name, value: item.slug }))}
                  disabled={disabledOrLoading}
                />
                :
                <Input
                  value={field.value}
                  id="ctgr"
                  readOnly
                  className="capitalize"
                />
            )}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="sku">SKU</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="sku"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="sku"
                status={errors.sku ? "error" : ""}
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
              />
            )}
            rules={{ required: true }}
          />
          {errors.sku && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="weight">Weight</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                id="weight"
                status={errors.weight ? "error" : ""}
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
                className="w-full"
              />
            )}
            rules={{ required: true }}
          />
          {errors.weight && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="stock">Stock</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                id="stock"
                status={errors.stock ? "error" : ""}
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
                className="w-full"
              />
            )}
            rules={{ required: true }}
          />
          {errors.stock && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="price">Price</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                id="price"
                status={errors.price ? "error" : ""}
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
                className="w-full"
              />
            )}
            rules={{ required: true }}
          />
          {errors.price && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="discount">Discount</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="discountPercentage"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                id="discount"
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
                className="w-full"
              />
            )}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="minOrderQty">Minimum Order Qty</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="minimumOrderQuantity"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                id="minOrderQty"
                status={errors.minimumOrderQuantity ? "error" : ""}
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
                className="w-full"
              />
            )}
            rules={{ required: true }}
          />
          {errors.minimumOrderQuantity && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="rating">Rating</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                id="rating"
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
                className="w-full"
              />
            )}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={5} xs={24}>
          <label htmlFor="desc">Description</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                id="desc"
                disabled={disabledOrLoading}
                autoSize={{ minRows: 3 }}
                readOnly={!isAdmin}
              />
            )}
          />
        </Col>
      </Row>

      <div className="text-center space-x-2">
        {buttons}

        {isAdmin && (
          <Button
            type="primary"
            htmlType="submit"
            loading={formLoading}
          >
            {translate('buttons.save')}
          </Button>
        )}
      </div>
    </Form>
  );
}
