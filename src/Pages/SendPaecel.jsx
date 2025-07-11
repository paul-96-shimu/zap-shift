import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import CustomHooks from '../Hooks/CustomHooks';
import { useLoaderData } from 'react-router';
import UseAxios from '../Hooks/UseAxios';

// Generate readable tracking ID
const generateTrackingId = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {
  const { user } = CustomHooks();
  const axiossecure = UseAxios();
  const ServiceCenters = useLoaderData();
  const [cost, setCost] = useState(null);

  const uniqueRegions = [...new Set(ServiceCenters.map((w) => w.region))];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const parcelType = watch('type');
  const selectedSenderRegion = watch('senderRegion');
  const selectedReceiverRegion = watch('receiverRegion');

  const senderCenters = ServiceCenters.filter(
    (center) => center.region === selectedSenderRegion
  );
  const receiverCenters = ServiceCenters.filter(
    (center) => center.region === selectedReceiverRegion
  );

  const calculateCostBreakdown = (data) => {
    const weight = parseFloat(data.weight) || 1;
    const isSameRegion = data.senderRegion === data.receiverRegion;
    const type = data.type;
    let base = 0;
    let extraWeight = 0;
    let outsideCharge = 0;

    if (type === 'document') {
      base = isSameRegion ? 60 : 80;
    } else if (type === 'non-document') {
      if (weight <= 3) {
        base = isSameRegion ? 110 : 150;
      } else {
        extraWeight = (weight - 3) * 40;
        base = isSameRegion ? 110 : 150;
        if (!isSameRegion) outsideCharge = 40;
      }
    }

    const total = base + extraWeight + outsideCharge;
    return { base, extraWeight, outsideCharge, total: Math.ceil(total) };
  };

  const onSubmit = (data) => {
    const breakdown = calculateCostBreakdown(data);

    Swal.fire({
      title: 'Confirm Delivery Cost',
      html: `
        <p><strong>Base Cost:</strong> ৳${breakdown.base}</p>
        <p><strong>Extra Weight:</strong> ৳${breakdown.extraWeight}</p>
        <p><strong>Outside City Charge:</strong> ৳${breakdown.outsideCharge}</p>
        <hr class="my-2" />
        <p class="text-lg font-bold text-green-600">Total: ৳${breakdown.total}</p>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Proceed to Payment',
      cancelButtonText: 'Edit Info'
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirm(data, breakdown.total);
      }
    });
  };

  const handleConfirm = async (formDataRaw, totalCost) => {
    const now = new Date();
    const parcelData = {
      ...formDataRaw,
      email: user?.email || '',
      creation_date: now.toISOString(),
      payment_status: 'unpaid',
      cost: totalCost,
      delivery_status: 'not_collected',
      trackingId: generateTrackingId()
    };

    console.log("✅ Parcel to be submitted:", parcelData);

    try {
      const res = await axiossecure.post('/parcels', parcelData);
      if (res.data?.insertedId) {
        toast.success('Parcel submitted successfully!');
        reset();
        setCost(null);
      } else {
        toast.error('Submission failed. Try again.');
      }
    } catch (error) {
      console.error("❌ Submission Error:", error);
      toast.error('Server error. Try again later.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-24">
      <h2 className="text-2xl font-bold mb-1">📦 Add a New Parcel</h2>
      <p className="mb-6 text-gray-500">Fill in the details to request a door-to-door delivery</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label font-semibold">Type</label>
            <div className="flex items-center gap-4">
              <label className="label cursor-pointer">
                <input type="radio" value="document" {...register('type', { required: true })} className="radio checked:bg-blue-500" />
                <span className="label-text ml-2">Document</span>
              </label>
              <label className="label cursor-pointer">
                <input type="radio" value="non-document" {...register('type', { required: true })} className="radio checked:bg-blue-500" />
                <span className="label-text ml-2">Non-document</span>
              </label>
            </div>
            {errors.type && <span className="text-red-500 text-sm mt-1">Type is required</span>}
          </div>

          <div>
            <label className="label">Parcel Name</label>
            <input className="input input-bordered w-full" {...register('title', { required: true })} />
            {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
          </div>

          {parcelType === 'non-document' && (
            <div>
              <label className="label">Weight (kg)</label>
              <input type="number" step="0.1" className="input input-bordered w-full" {...register('weight')} />
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Sender Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input input-bordered w-full" {...register('senderName', { required: true })} defaultValue={user?.displayName || ''} placeholder="Sender Name*" />
            <input className="input input-bordered w-full" {...register('senderContact', { required: true })} placeholder="Sender Contact*" />
            <select className="select select-bordered w-full" {...register('senderRegion', { required: true })}>
              <option value="">Select Region*</option>
              {uniqueRegions.map((region, idx) => (
                <option key={idx}>{region}</option>
              ))}
            </select>
            <select className="select select-bordered w-full" {...register('senderCenter', { required: true })}>
              <option value="">Select Service Center*</option>
              {senderCenters.map((c, idx) => (
                <option key={idx} value={c.service_center}>
                  {c.service_center} ({c.district})
                </option>
              ))}
            </select>
            <input className="input input-bordered w-full col-span-2" {...register('senderAddress', { required: true })} placeholder="Sender Address*" />
            <textarea className="textarea textarea-bordered w-full col-span-2" {...register('pickupInstruction', { required: true })} placeholder="Pickup Instruction*" />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Receiver Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input input-bordered w-full" {...register('receiverName', { required: true })} placeholder="Receiver Name*" />
            <input className="input input-bordered w-full" {...register('receiverContact', { required: true })} placeholder="Receiver Contact*" />
            <select className="select select-bordered w-full" {...register('receiverRegion', { required: true })}>
              <option value="">Select Region*</option>
              {uniqueRegions.map((region, idx) => (
                <option key={idx}>{region}</option>
              ))}
            </select>
            <select className="select select-bordered w-full" {...register('receiverCenter', { required: true })}>
              <option value="">Select Service Center*</option>
              {receiverCenters.map((c, idx) => (
                <option key={idx} value={c.service_center}>
                  {c.service_center} ({c.district})
                </option>
              ))}
            </select>
            <input className="input input-bordered w-full col-span-2" {...register('receiverAddress', { required: true })} placeholder="Receiver Address*" />
            <textarea className="textarea textarea-bordered w-full col-span-2" {...register('deliveryInstruction', { required: true })} placeholder="Delivery Instruction*" />
          </div>
        </div>

        <button className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default SendParcel;
