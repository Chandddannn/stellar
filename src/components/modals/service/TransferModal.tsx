import { useState, type FormEvent } from "react";
import { Building2, Check, FileText, PhoneCall, Upload } from "lucide-react";

import { property } from "../../../data/demoData";
import ServiceModalFrame from "./ServiceModalFrame";
import type { TrackerItem } from "./serviceModalConfig";

type TransferModalProps = {
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  trackerItems: TrackerItem[];
};

export default function TransferModal({
  onClose,
  onSubmit,
  trackerItems,
}: TransferModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [formValues, setFormValues] = useState({
    name: property.owner,
    unit: property.unit,
    project: property.project,
    requestType: "Electricity transfer",
    details: "",
    phone: "",
    followUpMethod: "Phone call",
    timeline: "Morning (9 am - 12 pm)",
  });

  const steps = ["Transfer details", "Upload documents", "Follow-up"];

  function updateField(field: keyof typeof formValues, value: string) {
    setFormValues((previous) => ({ ...previous, [field]: value }));
  }

  function handleTransferSubmit(event: FormEvent<HTMLFormElement>) {
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
      return false;
    }

    onSubmit(event);
    setCurrentStep(0);
    setUploadedFiles([]);
    return true;
  }

  return (
    <ServiceModalFrame
      theme="transfer"
      icon={Building2}
      title="Transfer process"
      tag="Docs & transfer"
      description="Electricity, property transfer, house tax, and owner document upload support in one step."
      details={[
        "Upload all relevant transfer and owner documents.",
        "Submit electricity, property transfer, and tax-related requests together.",
        "Track document verification and approval updates in one flow.",
      ]}
      footerMessage={
        currentStep === 0
          ? "Start by choosing the transfer service and confirming your property details."
          : currentStep === 1
            ? "Upload at least one supporting photo or document to continue."
            : "A reachable contact number and follow-up preference are required to submit."
      }
      trackerItems={trackerItems}
      onClose={onClose}
      onSubmit={handleTransferSubmit}
      submitLabel={currentStep === steps.length - 1 ? "Submit transfer request" : "Continue"}
    >
      <ol aria-label="Transfer request steps" className="grid grid-cols-3 gap-2">
        {steps.map((step, index) => (
          <li key={step}>
            <button
              type="button"
              disabled={index > currentStep}
              onClick={() => setCurrentStep(index)}
              aria-current={currentStep === index ? "step" : undefined}
              className={`flex w-full items-center gap-2 border-b-2 px-1 pb-3 text-left transition disabled:cursor-not-allowed ${
                currentStep === index
                  ? "border-[#18231f] text-[#18231f]"
                  : index < currentStep
                    ? "border-[#b9c7b7] text-[#536258] hover:border-[#18231f]"
                    : "border-[#e1e6df] text-[#9aa39c]"
              }`}
            >
              <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[9px] ${index < currentStep ? "bg-[#d7ff72] text-[#18231f]" : "bg-[#edf1eb] text-[#657168]"}`}>
                {index < currentStep ? <Check size={12} /> : index + 1}
              </span>
              <span className="text-[9px] font-medium leading-3 sm:text-[10px]">{step}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={currentStep === 0 ? "space-y-4 pt-2" : "hidden"}>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">Step 01 · Select service</p>
          <h4 className="mt-1 text-base font-medium text-[#253229]">What needs to be transferred?</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 max-[650px]:grid-cols-1">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="transfer-request-type" className="text-[10px] font-medium text-[#59655d]">Transfer type <span className="text-[#9a684d]">*</span></label>
            <select
              id="transfer-request-type"
              name="requestType"
              required={currentStep === 0}
              value={formValues.requestType}
              onChange={(event) => updateField("requestType", event.target.value)}
              className="rounded-[12px] border border-[#d8ddd6] bg-white px-3.5 py-3 text-[12px] text-[#17211d] outline-none focus:border-[#748578]"
            >
              <option>Electricity transfer</option>
              <option>House tax account</option>
              <option>Property ownership transfer</option>
              <option>Owner document update</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="transfer-owner-name" className="text-[10px] font-medium text-[#59655d]">Owner name <span className="text-[#9a684d]">*</span></label>
            <input
              id="transfer-owner-name"
              name="name"
              required={currentStep === 0}
              value={formValues.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="rounded-[12px] border border-[#d8ddd6] bg-white px-3.5 py-3 text-[12px] outline-none focus:border-[#748578]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="transfer-unit" className="text-[10px] font-medium text-[#59655d]">Unit / flat <span className="text-[#9a684d]">*</span></label>
            <input
              id="transfer-unit"
              name="unit"
              required={currentStep === 0}
              value={formValues.unit}
              onChange={(event) => updateField("unit", event.target.value)}
              className="rounded-[12px] border border-[#d8ddd6] bg-white px-3.5 py-3 text-[12px] outline-none focus:border-[#748578]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="transfer-project" className="text-[10px] font-medium text-[#59655d]">Project <span className="text-[#9a684d]">*</span></label>
            <input
              id="transfer-project"
              name="project"
              required={currentStep === 0}
              value={formValues.project}
              onChange={(event) => updateField("project", event.target.value)}
              className="rounded-[12px] border border-[#d8ddd6] bg-white px-3.5 py-3 text-[12px] outline-none focus:border-[#748578]"
            />
          </div>
        </div>
      </div>

      <div className={currentStep === 1 ? "space-y-4 pt-2" : "hidden"}>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">Step 02 · Supporting records</p>
          <h4 className="mt-1 text-base font-medium text-[#253229]">Add a photo or document</h4>
          <p className="mt-1 text-[10px] leading-4 text-[#778279]">Upload a clear photo or scan of the bill, ID, tax record, or ownership paperwork related to your request.</p>
        </div>
        <label htmlFor="transfer-attachments" className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-[17px] border border-dashed border-[#b8c5b8] bg-white px-5 py-5 text-center transition hover:border-[#7f927f] hover:bg-[#f9fbf8]">
          <span className="grid size-10 place-items-center rounded-[13px] bg-[#eaf0e8] text-[#45574a]"><Upload size={17} /></span>
          <span className="mt-3 text-[11px] font-semibold text-[#344139]">Choose photos or documents</span>
          <span className="mt-1 text-[9px] text-[#89938c]">PDF, JPG or PNG · multiple files allowed</span>
          <input
            id="transfer-attachments"
            name="attachment"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            required={currentStep === 1}
            onChange={(event) => setUploadedFiles(Array.from(event.currentTarget.files ?? []).map((file) => file.name))}
            className="sr-only"
          />
        </label>
        {uploadedFiles.length > 0 && (
          <ul aria-live="polite" className="space-y-2">
            {uploadedFiles.map((file) => (
              <li key={file} className="flex items-center gap-2 rounded-[10px] border border-[#e1e6df] bg-white px-3 py-2 text-[10px] text-[#536258]">
                <FileText size={13} className="shrink-0 text-[#758777]" />
                <span className="truncate">{file}</span>
                <Check size={13} className="ml-auto shrink-0 text-[#587653]" />
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="transfer-notes" className="text-[10px] font-medium text-[#59655d]">What should we know about these documents? <span className="text-[#9a684d">*</span></label>
          <textarea
            id="transfer-notes"
            name="details"
            rows={3}
            required={currentStep === 1}
            value={formValues.details}
            onChange={(event) => updateField("details", event.target.value)}
            placeholder="Mention any reference number, missing information, or action you need..."
            className="resize-y rounded-[12px] border border-[#d8ddd6] bg-white px-3.5 py-3 text-[11px] leading-5 text-[#17211d] outline-none focus:border-[#748578]"
          />
        </div>
      </div>

      <div className={currentStep === 2 ? "space-y-4 pt-2" : "hidden"}>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">Step 03 · Stay in touch</p>
          <h4 className="mt-1 text-base font-medium text-[#253229]">How should we follow up?</h4>
          <p className="mt-1 text-[10px] leading-4 text-[#778279]">A reachable number and contact preference are required so the team can complete your transfer.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="transfer-phone" className="text-[10px] font-medium text-[#59655d]">Mobile number <span className="text-[#9a684d">*</span></label>
          <div className="flex items-center rounded-[12px] border border-[#d8ddd6] bg-white px-3.5 focus-within:border-[#748578]">
            <PhoneCall size={14} className="mr-2.5 shrink-0 text-[#758279]" />
            <input
              id="transfer-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              pattern="[+0-9() -]{10,}"
              title="Enter a valid phone number with at least 10 characters."
              required={currentStep === 2}
              value={formValues.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-transparent py-3 text-[12px] outline-none"
            />
          </div>
        </div>
        <fieldset>
          <legend className="mb-2 text-[10px] font-medium text-[#59655d]">Preferred follow-up <span className="text-[#9a684d">*</span></legend>
          <div className="grid grid-cols-2 gap-2">
            {["Phone call", "WhatsApp"].map((method, index) => (
              <label key={method} className={`flex cursor-pointer items-center gap-2.5 rounded-[12px] border px-3.5 py-3 text-[11px] transition ${formValues.followUpMethod === method ? "border-[#82927f] bg-[#f0f5ed] text-[#304333]" : "border-[#d8ddd6] bg-white text-[#667168] hover:border-[#aeb9ae]"}`}>
                <input
                  type="radio"
                  name="followUpMethod"
                  value={method}
                  required={currentStep === 2}
                  checked={formValues.followUpMethod === method}
                  onChange={(event) => updateField("followUpMethod", event.target.value)}
                  className="accent-[#263d2e]"
                />
                {method}
                {index === 0 && <PhoneCall size={13} className="ml-auto" />}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="transfer-follow-up-time" className="text-[10px] font-medium text-[#59655d]">Best time to reach you <span className="text-[#9a684d">*</span></label>
          <select
            id="transfer-follow-up-time"
            name="timeline"
            required={currentStep === 2}
            value={formValues.timeline}
            onChange={(event) => updateField("timeline", event.target.value)}
            className="rounded-[12px] border border-[#d8ddd6] bg-white px-3.5 py-3 text-[12px] text-[#17211d] outline-none focus:border-[#748578]"
          >
            <option>Morning (9 am - 12 pm)</option>
            <option>Afternoon (12 pm - 4 pm)</option>
            <option>Evening (4 pm - 7 pm)</option>
            <option>Any time</option>
          </select>
        </div>
        <label className="flex items-start gap-2.5 rounded-[12px] bg-[#edf2eb] px-3.5 py-3 text-[9px] leading-4 text-[#647067]">
          <input type="checkbox" required={currentStep === 2} className="mt-0.5 accent-[#263d2e]" />
          <span>I agree that the STELLAR support team may contact me about this transfer request.</span>
        </label>
      </div>

      {currentStep > 0 && (
        <button
          type="button"
          onClick={() => setCurrentStep((step) => step - 1)}
          className="inline-flex items-center gap-2 pt-2 text-[10px] font-medium text-[#647067] transition hover:text-[#18231f]"
        >
          Back to {steps[currentStep - 1]}
        </button>
      )}
    </ServiceModalFrame>
  );
}
