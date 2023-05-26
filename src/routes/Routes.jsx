import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Table from "../components/Table/Table";
import UploadChocolate from "../components/UploadChocolate/UploadChocolate";
import UpdateChocolate from "../components/UpdateChocolate/UpdateChocolate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Table />
            },
            {
                path: '/upload-chocolate',
                element: <UploadChocolate/>
            },
            {
                path: '/update-chocolate/:id',
                element: <UpdateChocolate/>,
                loader: ({params})=> fetch(`http://localhost:5000/all-chocolate/${params.id}`)
            },
        ]
    },
]);

export default router;