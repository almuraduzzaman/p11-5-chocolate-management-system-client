import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Table = () => {

    const [allChocolate, setAllChocolate] = useState([]);
    const [control, setControl] = useState(false);
    // console.log(allChocolate);

    useEffect(() => {
        fetch(`http://localhost:5000/all-chocolate`)
            .then(res => res.json())
            .then(data => setAllChocolate(data))
    }, [control]);



    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/delete-chocolate/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if(data?.deletedCount>0){
                            Swal.fire(
                                'Deleted!',
                                'Your chocolate has been deleted.',
                                'success'
                                )
                                setControl(!control);
                        }
                    })
            }
        })

    }


    return (
        <div className="overflow-x-auto w-full">


            <Link to={'/upload-chocolate'}><button className="btn btn-outline mt-[72px] mb-[32px]">New Chocolate</button></Link>

            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {/* row 1 */}
                    {
                        allChocolate && allChocolate.map((chocolate, idx) =>
                            <tr key={chocolate._id}>
                                <td>
                                    {idx + 1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-16 h-16">
                                                <img src={chocolate.photo} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {chocolate.name}
                                </td>
                                <td>
                                    {chocolate.country}
                                </td>
                                <td>{chocolate.category}</td>
                                <th>
                                    <Link to={`/update-chocolate/${chocolate._id}`}> <button className="btn btn-ghost btn-xs">Edit</button></Link>
                                    <button onClick={() => handleDelete(chocolate._id)} className="btn btn-ghost btn-xs">Delete</button>
                                </th>
                            </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default Table;