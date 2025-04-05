import { useState } from "react";
import InputForm, { ReceiptInfoFormData } from "./InputForm";
import ReceiptPreview from "./ReceiptPreview";
import ReferenceReceipt from "./ReferenceReceipt";
import { ReceiptInfo, ReceiptItem, StoreInfo } from "@shared/schema";
import { getCurrentDateTime, getRandomTransactionNumber } from "@/lib/utils";

export default function ReceiptGenerator() {
  // Default initial state
  const { date, time } = getCurrentDateTime();
  
  const [receiptType, setReceiptType] = useState<"paper" | "email">("paper");
  
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    storeName: "Walmart",
    storeNumber: "5260",
    storePhone: "(555) 555-5555",
    storeAddress: "123 Walmart Ave",
    storeLocation: "Bentonville, AR 72712",
    storeManager: "John Smith",
    logoUrl: "https://corporate.walmart.com/content/dam/corporate/images/content/walmart-logos/walmart-logo-blue.svg"
  });
  
  const [receiptInfo, setReceiptInfo] = useState<ReceiptInfoFormData>({
    receiptDate: date,
    receiptTime: time,
    transactionId: getRandomTransactionNumber(),
    paymentMethod: "credit",
    taxRate: 8.25,
    cashierName: "Emily"
  });
  
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [photoMode, setPhotoMode] = useState(false);
  
  const updateStoreInfo = (newStoreInfo: Partial<StoreInfo>) => {
    setStoreInfo(prev => ({ ...prev, ...newStoreInfo }));
  };
  
  const updateReceiptInfo = (newReceiptInfo: Partial<ReceiptInfoFormData>) => {
    setReceiptInfo(prev => ({ ...prev, ...newReceiptInfo }));
  };
  
  const addItem = (item: ReceiptItem) => {
    setItems(prev => [...prev, item]);
  };
  
  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleLogoUpload = (logoUrl: string) => {
    updateStoreInfo({ logoUrl });
  };
  
  const togglePhotoMode = () => {
    setPhotoMode(prev => !prev);
  };
  
  const completeReceiptInfo: ReceiptInfo = {
    ...receiptInfo,
    items,
    storeInfo,
    receiptType
  };
  
  return (
    <div className="flex flex-col">
      <ReferenceReceipt />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InputForm 
          receiptType={receiptType}
          setReceiptType={setReceiptType}
          storeInfo={storeInfo}
          updateStoreInfo={updateStoreInfo}
          receiptInfo={receiptInfo}
          updateReceiptInfo={updateReceiptInfo}
          items={items}
          addItem={addItem}
          removeItem={removeItem}
          handleLogoUpload={handleLogoUpload}
          photoMode={photoMode}
          togglePhotoMode={togglePhotoMode}
        />
        <ReceiptPreview 
          receiptInfo={completeReceiptInfo}
          photoMode={photoMode}
        />
      </div>
    </div>
  );
      }
