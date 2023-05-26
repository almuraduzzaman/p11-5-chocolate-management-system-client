import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateChocolate = () => {

    const chocolate = useLoaderData();
    const { _id, name, category, country, photo } = chocolate;
    // console.log(chocolate);

    const chocolateCategories = [
        "Milk Chocolate",
        "Dark Chocolate",
        "White Chocolate",
        "Semi-Sweet Chocolate",
        "Bittersweet Chocolate"
    ];

    const [selectedChocolateCategory, setSelectedChocolateCategory] = useState(category);

    const handleChangeSelectedValue = (event) => {
        // console.log(event.target.value);
        setSelectedChocolateCategory(event.target.value);
    };

    const handleUpload = e => {
        e.preventDefault();

        const name = e.target.name.value;
        const country = e.target.country.value;
        const category = e.target.category.value;
        const photo = e.target.photo.value;

        const newChocolate = { name, country, category, photo }

        fetch(`http://localhost:5000/update-chocolate/${_id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newChocolate)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'success!',
                        text: 'Chocolate Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }

    return (
        <>
            <Link to={'/'}><button className="btn btn-outline mt-[72px] mb-[32px]">All Chocolate</button></Link>
            < section className="px-36 rounded-lg bg-gray-200 p-8 shadow-lg" >
                <div className="text-center my-9">
                    <h2 className="text-2xl font-semibold">Update Chocolate</h2>
                    <p className="">Use the below form to create a new product</p>
                </div>
                <div className="px-16">
                    <form onSubmit={handleUpload} className="space-y-7">
                        <div>
                            <label className="font-medium">Name</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                defaultValue={name}
                                type="text"
                                name="name"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Country</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                defaultValue={country}
                                type="text"
                                name="country"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="font-medium">Category</span>
                            </label>
                            <select className="select select-bordered"
                                name="category"
                                value={selectedChocolateCategory}
                                onChange={handleChangeSelectedValue}
                            >
                                {chocolateCategories.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="font-medium">Photo URL</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                defaultValue={photo}
                                type="url"
                                name="photo"
                            />
                        </div>

                        <div className="mt-4">
                            <input className="btn inline-block w-full rounded-lg bg-amber-800 hover:bg-amber-700 px-5 py-3 font-medium text-white" type="submit" value="Save" />
                        </div>
                    </form>
                </div>
            </section >
        </>
    );
};

export default UpdateChocolate;