# E-Commerce Dashboard

E-commerce dashboard for administrators to manage products, orders, and users.

## Dependencies or library

1. [React](https://react.dev/)
2. [Vite](https://vitejs.dev/)
3. [Ant Design](https://ant.design/components/overview/)
4. [Refine](https://refine.dev/docs/)
5. [React Router](https://reactrouter.com/)
6. [React Hook Form](https://react-hook-form.com/get-started)
7. [tailwindcss](https://tailwindcss.com/)
8. [Chart.js](https://www.chartjs.org/)

## Rest API

Rest API from [dummyjson.com](https://dummyjson.com).

### Available user:

Role: admin
```json
{
  "username": "emilys",
  "password": "emilyspass"
}
```

Role: moderator
```json
{
  "username": "oliviaw",
  "password": "oliviawpass"
}
```

Role: user
```json
{
  "username": "averyp",
  "password": "averyppass"
}
```

### Note:

- Adding a new data will not add it into the server. It will simulate a POST request and will return the new created data with a new id
- Deleting a data will not delete it into the server. It will simulate a DELETE request and will return deleted data.
- Updating a data will not update it into the server.It will simulate a PUT/PATCH request and will return updated data.
- Sort data only for 1 field.
- Limited and incomplete data for advanced features.

## Getting Started

## Set up and run the project locally

1. Clone or download this repository.
2. Open cmd or terminal an run this script:
```bash
npm install
```

## Available Scripts

### Running the development server.

```bash
npm run dev
```

### Building for production.

```bash
npm run build
```

### Running the production server.

```bash
npm run start
```

<br/>

This project using [Refine](https://github.com/refinedev/refine) and was generated with [create refine-app](https://github.com/refinedev/refine/tree/master/packages/create-refine-app).

[Refine](https://github.com/refinedev/refine) is a React Framework for building internal tools, admin panels, dashboards & B2B apps with unmatched flexibility.

Refine's hooks and components simplifies the development process and eliminates the repetitive tasks by providing industry-standard solutions for crucial aspects of a project, including authentication, access control, routing, networking, state management, and i18n.

## Learn More

To learn more about **Refine**, please check out the [Documentation](https://refine.dev/docs)

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Ant Design** [Docs](https://refine.dev/docs/ui-frameworks/antd/tutorial/)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)
- **Custom Auth Provider** [Docs](https://refine.dev/docs/core/providers/auth-provider/)

## License

MIT
