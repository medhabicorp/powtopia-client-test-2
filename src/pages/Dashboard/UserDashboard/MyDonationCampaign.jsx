import React, { useEffect, useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import ProgressBar from "@ramonak/react-progress-bar";
import PaymentView from "../../../components/PaymentView";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { useSnackbar } from "notistack";

const MyDonationCampaign = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]); // State to manage sorting
  const { user } = UseAuth();
  const [donators, setDonators] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axiosSecure.get(
        `/donationCampaigns/user/${user?.email}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [axiosSecure]);

  // Define table columns
  const columnsDiff = [
    {
      header: "Serial No",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "name",
      header: "name",
    },
    {
      accessorKey: "maxDonation",
      header: "maxDonation",
    },
    {
      accessorKey: "donatedAmount",
      header: "donatedAmount",
      cell: (info) => {
        const row = info.row.original;
        const maxCompleted = row.maxDonation;
        const completed = row.donatedAmount;
        const percentage = ((completed / maxCompleted) * 100).toFixed(2);
        return <ProgressBar completed={percentage} maxCompleted={100} />;
      },
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

  const handlePauseDonation = async (record) => {
    const newStatus = !record.isDonationStopped; // Toggle the status (true <=> false)
    const response = await axiosSecure.patch(
      `/donationCampaigns/stop/${record._id}`,
      { isDonationStopped: newStatus }
    );
    if (response.data.modifiedCount) {
      enqueueSnackbar(
        newStatus
          ? `Donation for ${record.name} stopped successfully`
          : `Donation for ${record.name} resumed successfully`,
        {
          variant: "success",
          autoHideDuration: 1000,
        }
      );
      fetchData();
    }
  };

  // Run handlePauseDonation automatically when condition is met
  useEffect(() => {
    data.forEach((record) => {
      if (
        record.donatedAmount >= record.maxDonation &&
        !record.isDonationStopped
      ) {
        handlePauseDonation(record);
      }
    });
  }, [data]); // This effect runs whenever data changes

  const handleView = async (petId) => {
    const response = await axiosSecure.get(`/payments/user/${petId}`);
    setDonators(response.data); // Set the fetched data to state
    handleOpen();
  };

  return (
    <section>
      {/* Heading */}
      <div className="mb-2 text-center text-secondary text-lg md:text-3xl font-semibold ">
        My Donation Campaigns
      </div>
      <div className="bg-gray-100 rounded-lg shadow-md">
        {/* Table */}
        {data.length > 0 ? (
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
                        style={{ userSelect: "none" }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" && (
                          <span className="text-sm bg-white ml-1">🔼</span>
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <span className="text-sm ml-1">🔽</span>
                        )}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-sm font-medium tracking-wide">
                      Actions
                    </th>
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 border-b border-gray-200 text-sm">
                      <div className="flex justify-center space-x-2">
                        <Link
                          to={`/dashboard/updateDonation/${row.original._id}`}
                        >
                          <Button
                            className="bg-primary text-white p-2"
                            onClick={() => handleEdit(row.original)}
                          >
                            <CiEdit className="text-xl text-white" />
                          </Button>
                        </Link>
                        <Button
                          className="p-2 bg-red-600 text-white"
                          onClick={() => handleView(row.original._id)}
                          disabled={row.original.adopted}
                        >
                          <FaRegEye className="text-xl text-white" />
                        </Button>

                        <Button
                          className={`p-2 text-white ${
                            row.original.donatedAmount >=
                              row.original.maxDonation ||
                            row.original.isDonationStopped
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                          onClick={() => handlePauseDonation(row.original)}
                        >
                          {row.original.donatedAmount >=
                            row.original.maxDonation ||
                          row.original.isDonationStopped
                            ? "Stop"
                            : "Pause"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-700">
            <p>No donation campaigns found.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {data.length > 10 && (
          <div className="flex flex-col md:flex-row items-center justify-between mt-6 space-y-4 md:space-y-0">
            <div className="flex space-x-2">
              <Button
                onClick={() => tableInstance.setPageIndex(0)}
                disabled={!tableInstance.getCanPreviousPage()}
                className="btn btn-sm bg-primary text-white disabled:bg-gray-400"
              >
                <SlArrowLeft className="text-white font-bold text-lg" />
              </Button>
              <div className="flex space-x-2">
                {Array.from(
                  { length: tableInstance.getPageCount() },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => tableInstance.setPageIndex(index)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                        tableInstance.getState().pagination.pageIndex === index
                          ? "bg-primary text-white"
                          : "bg-white text-secondary hover:bg-indigo-100"
                      } focus:outline-none`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
              <Button
                onClick={() =>
                  tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
                }
                disabled={!tableInstance.getCanNextPage()}
                className="btn btn-sm bg-primary text-white disabled:bg-gray-400"
              >
                <SlArrowRight className="text-white font-bold text-lg" />
              </Button>
            </div>

            <div>
              <select
                value={tableInstance.getState().pagination.pageSize}
                onChange={(e) =>
                  tableInstance.setPageSize(Number(e.target.value))
                }
                className="select select-bordered select-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {[10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <PaymentView
          open={open}
          setOpen={setOpen}
          donators={donators}
          handleOpen={handleOpen}
        />
      </div>
    </section>
  );
};

export default MyDonationCampaign;
