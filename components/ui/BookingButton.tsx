"use client";

import { useBookingModal } from "./BookingModal";

interface BookingButtonProps {
  className?: string;
  children?: React.ReactNode;
  programName?: string;
}

/**
 * BookingButton Component
 *
 * A simple button that opens the booking modal.
 * Use this in server components where you cannot use the useBookingModal hook directly.
 */
export default function BookingButton({
  className = "",
  children = "Book Consultation",
  programName,
}: BookingButtonProps) {
  const { openBookingModal } = useBookingModal();

  return (
    <button 
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openBookingModal(programName);
      }} 
      className={`${className} cursor-pointer`}
    >
      {children}
    </button>
  );
}

