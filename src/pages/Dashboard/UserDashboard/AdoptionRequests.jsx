import React, { useEffect, useState } from 'react';
import UseAuth from '../../../hooks/UseAuth';
// import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import Swal from 'sweetalert2';

const AdoptionRequests = () => {
    const axiosSecure = useAxiosSecure();
    const [data, setData] = useState([]);
    // console.log(data)
    const [sorting, setSorting] = useState([]); // State to manage sorting
    const { user } = UseAuth();
    // const { enqueueSnackbar } = useSnackbar();


    // Fetch data from the server
    const fetchData = async () => {
        try {
            const response = await axiosSecure.get(`/adoptions/user/${user?.email}`);
            // console.log(data)
            setData(response.data); // Set the fetched data to state
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchData();
    }, [axiosSecure]);
//  reject adaption
const handleReject = async (record) => {
     const result = await  Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Reject it!"
      }) ;
          if (result.isConfirmed) {

              const response = await axiosSecure.patch(`/adoptions/reject/${record._id}`);

              if (response.data.modifiedCount > 0) {
                  fetchData();
                  Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Adoption is Reject!",
                      showConfirmButton: false,
                      timer: 1500
                    });
              }
          }
       
  }



  //  handel accept adoption request
  const handleAccept = async (record)=>
  {
      const result = await  Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Accept it!"
      }) ;
          if (result.isConfirmed) {

              const response = await axiosSecure.patch(`/adoptions/accept/${record._id}`);
              if(response.data.message === "Adoption request already accepted")
              {
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Adoption request already accepted!',
                  });
                  return;
              }
              if (response.data.modifiedCount > 0) {
                  fetchData();
                  Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Adoption is Accept!",
                      showConfirmButton: false,
                      timer: 1500
                    });
              }
          }
  }

 
    // Define table columns
    const columnsDiff = [
        {
            header: 'Serial No', 
            cell: (info) => info.row.index + 1, 
        },
        {
            accessorKey: 'userName',
            header: 'name',
        },
        {
            accessorKey: 'userEmail',
            header: 'Email',
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
        },
        {
            accessorKey: 'address',
            header: 'Location',
        },
        {
            accessorKey: 'petName',
            header: 'pet Name',
        },
    ];

   // Create a table instance
        const tableInstance = useReactTable({
        columns: columnsDiff,
        data: data,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10, // Set to show a maximum of 10 pets
            },
        },
    });

    return (
        <div className="">
             {/* Heading Section */}
             <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-primary">Adoption Requests</h2>
                <div className="text-base md:text-lg text-gray-600">Manage and review adoption requests from users</div>
            </div>
        {data.length > 0 ? (
            <>
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left border-collapse border border-gray-200 rounded-md shadow-md">
                        <thead className="bg-primary text-center text-white">
                            {tableInstance.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="px-4 py-3 text-sm font-medium tracking-wide cursor-pointer"
                                            style={{ userSelect: 'none' }}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getIsSorted() === 'asc' && <span>🔼</span>}
                                            {header.column.getIsSorted() === 'desc' && <span>🔽</span>}
                                        </th>
                                    ))}
                                    <th className="px-4 py-3 text-sm font-medium tracking-wide">Actions</th>
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white text-center">
                            {tableInstance.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-indigo-100 transition-colors duration-200"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-4 py-3 border-b border-gray-200 text-sm"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                    <td className="px-4 py-3 border-b border-gray-200 text-sm">
                                        <div className="flex justify-center space-x-2">
                                            <Button
                                                className="bg-green-600 text-white p-2 hover:bg-red-700"
                                                onClick={() => handleAccept(row.original)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                className="p-2 bg-red-600 text-white hover:bg-green-700"
                                                onClick={() => handleReject(row.original)}
                                                disabled={
                                                    row.original.status === 'accept' ||
                                                    row.original.status === 'reject'
                                                }
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        ) : (
            <div className="text-center py-10">
                <h2 className="text-2xl font-semibold text-secondary">No Adoption Requests Found</h2>
            </div>
        )}
    </div>
    );
};

export default AdoptionRequests;