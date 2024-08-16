
"use client"
import Loader from '@/app/components/loader';
import { useGetAllUser } from '@/app/network-request/queries';
import { IUser } from '@/app/network-request/types';
import Image from 'next/image';
import React from 'react';


const Blogs = () => {
    const { data,isLoading } = useGetAllUser();
    
  return (
    <>
      {isLoading && <Loader />}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                sr.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NAme
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!data || !Array.isArray(data) ? (
              <div className="flex items-center justifu-center">
                Data Not Found
              </div>
            ) : (
              data?.map((listing: IUser, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4  text-sm text-gray-500">
                    <div>{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{listing.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Image
                          height={1000}
                          width={1000}
                          quality={100}
                          priority
                          className="h-10 w-10 rounded-full"
                          src={listing?.image}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {listing?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        listing?.role === "user"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {listing?.role}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Blogs;
