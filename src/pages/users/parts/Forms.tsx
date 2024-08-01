
import { HttpError, useTranslate, useNavigation, useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from 'react-hook-form';
import { Row, Col, Button, Input, InputNumber, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Form } from '@/components/forms/Form';
import type { IUser } from '@/types/Types';

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
    control,
    handleSubmit,
    formState: { errors },
    refineCore: { formLoading, onFinish },
  } = useForm<IUser, HttpError, IUser>({
    defaultValues: {
      gender: "male"
    },
    values,
    refineCoreProps: {
      resource: "users" + (values ? "" : "/add"),
      action: values ? "edit" : "create",
      id: values ? values.id : undefined,
      queryOptions: {
        enabled: false,
      },
      redirect: false,
      onMutationSuccess: () => {
        !values && push('/users')
      },
    },
  });

  const disabledOrLoading = disabled || formLoading;

  return (
    <Form
      disabled={disabledOrLoading}
      className="grow w-full mt-4 lg_w-[calc(100%-185px)] lg_px-4"
      fieldsetClass="space-y-6"
      onSubmit={isAdmin ? handleSubmit(onFinish) : undefined}
    >
      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          <label htmlFor="fname">First Name</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="fname"
                status={errors.firstName ? "error" : ""}
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
              />
            )}
            rules={{ required: true }}
          />
          {errors.firstName && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          <label htmlFor="lname">Last Name</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="lname"
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
              />
            )}
          />
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          <label htmlFor="uname">Username</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="uname"
                status={errors.username ? "error" : ""}
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
              />
            )}
            rules={{ required: true }}
          />
          {errors.username && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          <label htmlFor="age">Age</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                id="age"
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
                className="w-full"
              />
            )}
          />
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          <label htmlFor="birthDate">Birth Date</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={isAdmin ? field.onChange : undefined}
                id="birthDate"
                disabled={disabledOrLoading}
                className="w-full"
              />
            )}
          />
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          <label htmlFor="gender">Gender</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="gender"
                className="w-full"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                disabled={disabledOrLoading}
                onChange={isAdmin ? field.onChange : undefined}
              />
            )}
          />
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          <label htmlFor="email">Email</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                status={errors.email ? "error" : ""}
                inputMode="email"
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
              />
            )}
            rules={{ required: true }}
          />
          {errors.email && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          <label htmlFor="phone">Phone</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="phone"
                status={errors.phone ? "error" : ""}
                inputMode="tel"
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
              />
            )}
            rules={{ required: true }}
          />
          {errors.phone && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          <label htmlFor="university">University</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="university"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="university"
                disabled={disabledOrLoading}
                readOnly={!isAdmin}
              />
            )}
          />
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          <label htmlFor="role">Role</label>
        </Col>
        <Col md={19} xs={24}>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="role"
                status={errors.role ? "error" : ""}
                className="w-full"
                options={[
                  { label: "User", value: "user" },
                  { label: "Moderator", value: "moderator" },
                  { label: "Admin", value: "admin" }
                ]}
                disabled={disabledOrLoading}
                onChange={isAdmin ? field.onChange : undefined}
              />
            )}
            rules={{ required: true }}
          />
          {errors.role && (
            <div className="mt-1 text-red-700 text-xs">
              {translate('error.required')}
            </div>
          )}
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
