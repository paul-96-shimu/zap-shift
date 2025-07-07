import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import UseAxios from '../Hooks/UseAxios';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';


const SendParcel = () => {
  const [cost, setCost] = useState(null);
  const serviceCenters = useLoaderData() || [];
  // const { user } = useContext(AuthContext); // ✅ ইউজার ইমেইল পেতে
  const {user} =useContext (AuthContext)

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const type = watch("type");

  const axiosSecure = UseAxios();

  const calculateCost = (data) => {
    let baseCost = data.type === "document" ? 50 : 100;
    if (data.weight) {
      baseCost += parseFloat(data.weight) * 10;
    }
    if (data.senderRegion === "remote" || data.receiverRegion === "remote") {
      baseCost += 50;
    }
    return baseCost;
  };

  const onSubmit = (data) => {
    const deliveryCost = calculateCost(data);
    setCost(deliveryCost);

    Swal.fire({
      title: `Delivery cost is ৳${deliveryCost}`,
      text: "Do you want to confirm this parcel?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          creation_date: new Date(),
          email: user?.email, // ✅ ইউজার ইমেইল যোগ করা হয়েছে
        };

        axiosSecure.post('/parcels', parcelData)
          .then(res => {
            if (res.data.insertedId) {
              console.log("✅ Parcel inserted with ID:", res.data.insertedId);
              Swal.fire("Success!", "Parcel information saved successfully.", "success");
              reset();
              setCost(null);
            }
          })
          .catch(err => {
            console.error("❌ Failed to insert parcel:", err);
            Swal.fire("Error!", "Something went wrong. Try again.", "error");
          });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-base-100 rounded-lg shadow mt-24 md:mt-32">
      <h2 className="text-3xl font-bold text-center mb-2">Send a Parcel</h2>
      <p className="text-center text-gray-500 mb-6">Fill in the details to send your parcel securely</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">Type</label>
            <select {...register("type", { required: true })} className="select select-bordered">
              <option value="">Select type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-document</option>
            </select>
            {errors.type && <span className="text-red-500 text-sm">Type is required</span>}
          </div>
          <div className="form-control">
            <label className="label">Title</label>
            <input type="text" {...register("title", { required: true })} className="input input-bordered" />
            {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
          </div>
          {type === "non-document" && (
            <div className="form-control">
              <label className="label">Weight (kg)</label>
              <input type="number" step="0.1" {...register("weight")} className="input input-bordered" />
            </div>
          )}
        </div>

        <hr className="my-4" />

        {/* Sender Info */}
        <h3 className="text-xl font-semibold">Sender Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input {...register("senderName", { required: true })} placeholder="Name" className="input input-bordered" />
          <input {...register("senderContact", { required: true })} placeholder="Contact" className="input input-bordered" />
          <select {...register("senderRegion", { required: true })} className="select select-bordered">
            <option value="">Select Region</option>
            <option value="dhaka">Dhaka</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="remote">Remote</option>
          </select>
          <select {...register("senderCenter", { required: true })} className="select select-bordered">
            <option value="">Select Service Center</option>
            {serviceCenters.map((center, index) => (
              <option key={index} value={center.service_center}>
                {center.service_center} ({center.district})
              </option>
            ))}
          </select>
          <input {...register("senderAddress", { required: true })} placeholder="Address" className="input input-bordered" />
          <input {...register("pickupInstruction", { required: true })} placeholder="Pick-up Instruction" className="input input-bordered" />
        </div>

        <hr className="my-4" />

        {/* Receiver Info */}
        <h3 className="text-xl font-semibold">Receiver Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input {...register("receiverName", { required: true })} placeholder="Name" className="input input-bordered" />
          <input {...register("receiverContact", { required: true })} placeholder="Contact" className="input input-bordered" />
          <select {...register("receiverRegion", { required: true })} className="select select-bordered">
            <option value="">Select Region</option>
            <option value="sylhet">Sylhet</option>
            <option value="chattogram">Chattogram</option>
            <option value="remote">Remote</option>
          </select>
          <select {...register("receiverCenter", { required: true })} className="select select-bordered">
            <option value="">Select Service Center</option>
            {serviceCenters.map((center, index) => (
              <option key={index} value={center.service_center}>
                {center.service_center} ({center.district})
              </option>
            ))}
          </select>
          <input {...register("receiverAddress", { required: true })} placeholder="Address" className="input input-bordered" />
          <input {...register("deliveryInstruction", { required: true })} placeholder="Delivery Instruction" className="input input-bordered" />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary mt-4">Submit Parcel</button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
