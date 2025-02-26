import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { Card, Typography, Button  } from "@material-tailwind/react";
import { useSnackbar } from 'notistack';
import { ScrollRestoration } from 'react-router-dom';
 

const MyDonation = () => {
     const axiosSecure = useAxiosSecure();
     const {user} = UseAuth();
     const { enqueueSnackbar } = useSnackbar();

     

     const { data: payments, isLoading, error, refetch } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            // console.log('Fetching payments for:', user?.email);

            if (!user?.email) return [];
            const res = await axiosSecure.get(`/payments/${user.email}`);
            // console.log('API Response:', res.data);
            return res.data;
        },
    });
    // console.log('Payments Data:', payments);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Failed to load donations.</div>;
    }
    
    if (!payments || payments.length === 0) {
        return <div>No donations found.</div>;
    }
 
       // Handle refund operation (DELETE request)
    //    const handleRefund = async (id) => {
        
    //     try {
    //         const res = await axiosSecure.delete(`/payments/${id}`);
    //         if (res.data.message === 'Donation removed successfully.') {
                
    //             console.log('Refund successful');
    //         } else {
    //             console.log('Failed to refund');
    //         }
    //     } catch (error) {
    //         console.error('Error during refund:', error);
    //     }
    // };

    // Handle refund operation (DELETE request)
    const handleRefund = async (record) => {
        
        // console.log(record);
      
           const res = await axiosSecure.patch(`/payments/refund/${record._id}`,{payment:record});
        
           if(res.data.modifiedCount > 0)
           {
               refetch();
               enqueueSnackbar(`Payment is Refunded!`, { variant: 'success', autoHideDuration: 1000 });
           }
          
       
   };

    return (
        <section className="">
            <div className="max-w-7xl mx-auto px-6">
                <Typography variant="h4" className="text-center text-primary mb-6">
                    Your Donation History
                </Typography>
                </div>
        {payments.length === 0 ? (
          <div className="text-center bg-gray-100 text-gray-500">
            <Typography variant="h6" className="mb-4">
              No donations found.
            </Typography>
            <Typography variant="small">Your donation history will appear here once you've made a donation.</Typography>
          </div>
        ) : (
          <Card className="h-auto w-full overflow-x-auto p-4 shadow-md">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b p-4 bg-primary text-white">Pet Image</th>
                  <th className="border-b p-4 bg-primary text-white">Pet Name</th>
                  <th className="border-b p-4 bg-primary text-white">Donated Amount</th>
                  <th className="border-b p-4 bg-primary text-white">Refund</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="p-4 border-b">
                      <img
                        src={payment.petImage || 'https://via.placeholder.com/64'}
                        alt={payment.petName || 'Pet'}
                        className="h-16 w-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="p-4 border-b">
                      <Typography variant="small" className="font-normal text-secondary">
                        {payment.petName || 'Unknown'}
                      </Typography>
                    </td>
                    <td className="p-4 border-b">
                      <Typography variant="small" className="font-normal text-secondary">
                        ${payment.donationAmount || '0.00'}
                      </Typography>
                    </td>
                    <td className="p-4 border-b">
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleRefund(payment)}
                        disabled={payment.refund === 'true'}
                      >
                        {payment.refund === 'true' ? 'Refunded' : 'Refund'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </section>
        
    );
};

export default MyDonation;