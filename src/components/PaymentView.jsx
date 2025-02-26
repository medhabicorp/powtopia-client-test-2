import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdAttachMoney } from "react-icons/md";

const PaymentView = ({ open, setOpen, handleOpen, donators = [] }) => (
  <Dialog open={open} handler={() => setOpen(!open)}>
    <DialogHeader>
      <p className="mx-auto text-secondary">Donators List</p>
    </DialogHeader>
    <DialogBody className="max-h-96 overflow-y-auto">
      {donators.length ? (
        <table className="min-w-full text-gray-700 border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["#", "Donator Name", "Amount Donated"].map((heading, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border text-secondary text-center"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {donators.map(
              ({ user = "Anonymous", donationAmount = 0 }, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center">{user}</td>
                  <td className="px-4 py-2 border flex items-center justify-center">
                    <MdAttachMoney /> {donationAmount}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">
          No donators found for this campaign.
        </p>
      )}
    </DialogBody>
    <DialogFooter>
      <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
        Cancel
      </Button>
    </DialogFooter>
  </Dialog>
);

export default PaymentView;
