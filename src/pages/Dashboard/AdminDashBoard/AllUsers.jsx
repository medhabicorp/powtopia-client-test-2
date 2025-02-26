import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useSnackbar } from "notistack";

const TABLE_HEAD = ["Sl No", "photo", "Name", "Email", "Role", "Action"];

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { enqueueSnackbar } = useSnackbar();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // // admin
  const handleMakeAdmin = async (id) => {
    // console.log(id)
    try {
      const response = await axiosSecure.patch(`/users/admin/${id}`, {
        role: "admin",
      });
      if (response.data.modifiedCount > 0) {
        enqueueSnackbar("Adoption status updated successfully!", {
          variant: "success",
          autoHideDuration: 1000,
        });
        refetch();
      } else {
        enqueueSnackbar("Failed to update adoption status.", {
          variant: "error",
          autoHideDuration: 1000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred while updating adoption status.", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div className="container mx-auto my-10 ">
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-center">
        User Management ({users.length})
      </h1>
      {users.length > 0 ? (
        <Card className="overflow-x-auto w-full">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-gray-300 py-4 px-4 text-sm sm:text-base font-bold text-gray-600"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(({ _id, name, email, photo, role }, index) => {
                const isLast = index === users.length - 1;
                const rowClass = isLast
                  ? "py-4 px-4"
                  : "py-4 px-4 border-b border-gray-300";

                return (
                  <tr key={_id} className="hover:bg-gray-50">
                    {/* Sl No */}
                    <td className={rowClass}>{index + 1}</td>

                    {/* Photo */}
                    <td className={rowClass}>
                      <img
                        src={photo || "/placeholder-image.jpg"}
                        alt={name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </td>

                    {/* Name */}
                    <td className={rowClass}>{name || "N/A"}</td>

                    {/* Email */}
                    <td className={rowClass}>{email || "N/A"}</td>

                    {/* Role */}
                    <td className={rowClass}>{role || "User"}</td>

                    {/* Action */}
                    <td className={rowClass}>
                      {role !== "admin" ? (
                        <Button
                          size="sm"
                          color="purple"
                          onClick={() => handleMakeAdmin(_id)}
                        >
                          Make Admin
                        </Button>
                      ) : (
                        <Typography className="text-sm font-medium text-secondary">
                          Admin
                        </Typography>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center h-60">
          <img src="/no-data.svg" alt="No Users" className="w-40 h-40 mb-4" />
          <Typography className="text-lg font-medium text-gray-600">
            No users found.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
