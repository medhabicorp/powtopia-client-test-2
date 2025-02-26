import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import { Button } from "@material-tailwind/react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { MdEdit, MdDelete } from "react-icons/md";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllPets = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/admin/all-pets");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const { data } = await axiosSecure.delete(`/pets/${id._id}`);
      if (data.deletedCount > 0) {
        Swal.fire("Deleted!", "Your pet has been removed.", "success");
        setData((prevData) => prevData.filter((item) => item._id !== id._id));
      }
    }
  };

  const handleAdopt = async (id) => {
    try {
      const response = await axiosSecure.patch(`/pets/adopt/${id._id}`, {
        adopted: true,
      });
      if (response.data.modifiedCount > 0) {
        enqueueSnackbar("Pet adopted successfully!", { variant: "success" });
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id._id ? { ...item, adopted: true } : item
          )
        );
      }
    } catch (error) {
      enqueueSnackbar("Failed to update adoption status.", {
        variant: "error",
      });
    }
  };

  const columns = [
    { header: "Serial No", cell: (info) => info.row.index + 1 },
    {
      accessorKey: "image",
      header: "Pet Image",
      cell: (info) => (
        <img src={info.getValue()} alt="Pet" className="w-12 h-12 rounded-md" />
      ),
    },
    { accessorKey: "name", header: "Pet Name" },
    { accessorKey: "category", header: "Category" },
  ];

  const tableInstance = useReactTable({
    columns,
    data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-primary text-white text-center">
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 cursor-pointer">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
                <th>Adoption Status</th>
                <th>Actions</th>
              </tr>
            ))}
          </thead>
          <tbody className="bg-white text-center">
            {tableInstance.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-indigo-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-4 py-3 border-b">
                  {row.original.adopted ? (
                    <span className="text-green-600 bg-green-50 p-1 rounded-lg font-semibold">
                      Adopted
                    </span>
                  ) : (
                    <span className="text-red-700 bg-red-50 p-1 rounded-lg font-semibold">
                      Not Adopted
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 border-b">
                  <div className="flex justify-center space-x-2">
                    <Button
                      className="p-2 bg-green-600 text-white hover:bg-green-700"
                      onClick={() => handleAdopt(row.original)}
                      disabled={row.original.adopted}
                    >
                      Adopt
                    </Button>
                    <Link to={`/dashboard/updatePet/${row.original._id}`}>
                      <Button className="p-2 text-white bg-purple-600 hover:bg-purple-700">
                        <MdEdit size={18} />
                      </Button>
                    </Link>
                    <Button
                      className="p-2 text-white bg-red-600 hover:bg-red-700"
                      onClick={() => handleDelete(row.original)}
                    >
                      <MdDelete size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPets;
