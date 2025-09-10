"use client";

export default function QRPayment() {
  const paymentOptions = [
    {
      name: "E - Wallet",
      qr: "/images/gcash-qr.png",
      accountName: "Bonnie Green",
      accountNumber: "0917-123-4567",
    },
  
    {
      name: "Bank Transfer",
      qr: "/images/bank-qr.png",
      accountName: "Bonnie Green",
      accountNumber: "1234-5678-9012",
      bank: "Bank of Example",
    },
  ];

  return (
    <div         className="w-full max-w-[800px] rounded-lg border border-gray-300 bg-white p-6 shadow-md space-y-6"
>
        <h3 className="pb-3 ">QR Payment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paymentOptions.map((option, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 "
            >
              <h4 className="mb-4 text-lg font-bold">{option.name}</h4>
              <img
                src={option.qr}
                alt={`${option.name} QR`}
                className="mb-4 h-40 w-40 rounded-lg border border-gray-300 bg-white object-contain p-2"
              />
              <div className="text-center text-[11px]">
                <p>
                  <span className="font-semibold">Account Name:</span>{" "}
                  {option.accountName}
                </p>
                <p>
                  <span className="font-semibold">Account Number:</span>{" "}
                  {option.accountNumber}
                </p>
                {option.bank && (
                  <p>
                    <span className="font-semibold">Bank:</span> {option.bank}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

  );
}
