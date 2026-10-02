export type ServiceRequestStatus =
  | "New"
  | "In review"
  | "Waiting on buyer"
  | "Scheduled"
  | "Resolved";

export type ServiceActivityStep = {
  title: string;
  detail: string;
};

export type ServiceActivityPhase = "Pre-possession" | "Post-possession";

export type ServiceAdminRequest = {
  id: string;
  phase: ServiceActivityPhase;
  building: string;
  tower: string;
  service: string;
  subject: string;
  buyer: string;
  unit: string;
  submitted: string;
  status: ServiceRequestStatus;
  priority: "Urgent" | "High" | "Normal";
  assignee: string;
  followUp: string;
  details: string;
  adminNote: string;
  steps: ServiceActivityStep[];
};

type BaseServiceAdminRequest = Omit<
  ServiceAdminRequest,
  "phase" | "building" | "tower" | "steps"
>;

const postPossessionDemoRequests: BaseServiceAdminRequest[] = [
  {
    id: "REQ-5021",
    service: "Register issue",
    subject: "Kitchen sink leak",
    buyer: "Arjun Mehta",
    unit: "Tower B · 1204",
    submitted: "01 Oct 2026",
    status: "In review",
    priority: "Urgent",
    assignee: "Facilities desk",
    followUp: "Phone call · Morning",
    details: "Water is leaking beneath the kitchen sink. Buyer requested an urgent inspection.",
    adminNote: "",
  },
  {
    id: "REQ-5019",
    service: "Transfer process",
    subject: "Electricity meter transfer",
    buyer: "Priya Shah",
    unit: "Tower A · 0806",
    submitted: "01 Oct 2026",
    status: "New",
    priority: "High",
    assignee: "Transfer desk",
    followUp: "WhatsApp · Afternoon",
    details: "Owner has supplied the latest electricity bill and requests the meter to be transferred.",
    adminNote: "",
  },
  {
    id: "REQ-5016",
    service: "Car wash & parking",
    subject: "Parking slot and weekly wash",
    buyer: "Kabir Rao",
    unit: "Tower C · 1402",
    submitted: "30 Sep 2026",
    status: "Scheduled",
    priority: "Normal",
    assignee: "Resident services",
    followUp: "Phone call · Any time",
    details: "Four-wheeler parking request with weekly exterior wash preference.",
    adminNote: "",
  },
  {
    id: "REQ-5012",
    service: "Documentation issue",
    subject: "Possession certificate copy",
    buyer: "Nisha Patel",
    unit: "Tower B · 0503",
    submitted: "30 Sep 2026",
    status: "Waiting on buyer",
    priority: "High",
    assignee: "Documentation desk",
    followUp: "WhatsApp · Evening",
    details: "Buyer needs a certified possession certificate copy. Proof of identity is still required.",
    adminNote: "",
  },
  {
    id: "REQ-5008",
    service: "Interior remodelling",
    subject: "Kitchen and wardrobe design",
    buyer: "Meera Desai",
    unit: "Tower A · 1101",
    submitted: "29 Sep 2026",
    status: "In review",
    priority: "Normal",
    assignee: "Interior team",
    followUp: "Phone call · Afternoon",
    details: "Buyer requested a kitchen redesign and modular wardrobe within the selected budget range.",
    adminNote: "",
  },
  {
    id: "REQ-5002",
    service: "General service",
    subject: "Bedroom air-conditioner service",
    buyer: "Dev Malhotra",
    unit: "Tower C · 0704",
    submitted: "29 Sep 2026",
    status: "New",
    priority: "Normal",
    assignee: "Unassigned",
    followUp: "Phone call · Morning",
    details: "Air-conditioner is not cooling consistently. Buyer is available on weekdays.",
    adminNote: "",
  },
  {
    id: "REQ-4998",
    service: "Register issue",
    subject: "Balcony door alignment",
    buyer: "Sana Iyer",
    unit: "Tower B · 0910",
    submitted: "28 Sep 2026",
    status: "Resolved",
    priority: "Normal",
    assignee: "Facilities desk",
    followUp: "Phone call · Any time",
    details: "Balcony door was sticking during opening. Maintenance adjusted the hinge.",
    adminNote: "Work completed and confirmed with buyer.",
  },
  {
    id: "REQ-4991",
    service: "Transfer process",
    subject: "House tax account update",
    buyer: "Rohan Kulkarni",
    unit: "Tower A · 0302",
    submitted: "27 Sep 2026",
    status: "Waiting on buyer",
    priority: "Normal",
    assignee: "Transfer desk",
    followUp: "WhatsApp · Morning",
    details: "House tax account transfer is pending the buyer's signed application.",
    adminNote: "",
  },
];

const prePossessionDemoRequests: BaseServiceAdminRequest[] = [
  {
    id: "REQ-4108",
    service: "Construction photos",
    subject: "October progress photos",
    buyer: "Arjun Mehta",
    unit: "Tower B · 1204",
    submitted: "01 Oct 2026",
    status: "In review",
    priority: "Normal",
    assignee: "Customer experience",
    followUp: "Email · Any time",
    details: "Buyer requested current living-room and kitchen fit-out photos before the next site visit.",
    adminNote: "",
  },
  {
    id: "REQ-4104",
    service: "Site visit",
    subject: "Weekend site visit",
    buyer: "Priya Shah",
    unit: "Tower A · 0806",
    submitted: "30 Sep 2026",
    status: "Scheduled",
    priority: "High",
    assignee: "Site coordination",
    followUp: "Phone call · Afternoon",
    details: "Buyer requested a Saturday visit for two family members. Safety briefing is required.",
    adminNote: "",
  },
  {
    id: "REQ-4099",
    service: "Modification request",
    subject: "Kitchen socket relocation",
    buyer: "Kabir Rao",
    unit: "Tower C · 1402",
    submitted: "29 Sep 2026",
    status: "Waiting on buyer",
    priority: "High",
    assignee: "Design coordination",
    followUp: "WhatsApp · Evening",
    details: "Modification estimate is ready. Buyer approval is needed before the site team can schedule the work.",
    adminNote: "",
  },
  {
    id: "REQ-4093",
    service: "Documents",
    subject: "Agreement copy request",
    buyer: "Nisha Patel",
    unit: "Tower B · 0503",
    submitted: "28 Sep 2026",
    status: "Resolved",
    priority: "Normal",
    assignee: "Documentation desk",
    followUp: "Email · Morning",
    details: "Buyer requested a digital copy of the signed agreement for their records.",
    adminNote: "Verified and shared through the buyer portal.",
  },
  {
    id: "REQ-4087",
    service: "Property 360",
    subject: "Virtual walkthrough access",
    buyer: "Meera Desai",
    unit: "Tower A · 1101",
    submitted: "27 Sep 2026",
    status: "New",
    priority: "Normal",
    assignee: "Unassigned",
    followUp: "Email · Any time",
    details: "Buyer needs a refreshed 360 walkthrough link for the latest interior fit-out stage.",
    adminNote: "",
  },
];

const activityStepsByService: Record<string, ServiceActivityStep[]> = {
  "Register issue": [
    { title: "Request received", detail: "Issue details and buyer contact are logged." },
    { title: "Team assigned", detail: "The relevant property support team reviews the issue." },
    { title: "Buyer follow-up", detail: "The team confirms access, next steps, or a visit time." },
    { title: "Resolution confirmed", detail: "Work is completed and confirmed with the buyer." },
  ],
  "Transfer process": [
    { title: "Transfer submitted", detail: "Transfer type, owner, unit, and project details are recorded." },
    { title: "Documents verified", detail: "Uploaded photos and records are checked for completeness." },
    { title: "Buyer follow-up", detail: "The team requests missing details or confirms the processing timeline." },
    { title: "Transfer completed", detail: "The buyer receives final confirmation and the request is closed." },
  ],
  "Car wash & parking": [
    { title: "Service requested", detail: "Vehicle and requested service details are received." },
    { title: "Availability checked", detail: "Parking or wash capacity is confirmed with resident services." },
    { title: "Schedule confirmed", detail: "The buyer receives the confirmed slot or service window." },
    { title: "Service completed", detail: "The request is closed after the scheduled service." },
  ],
  "Documentation issue": [
    { title: "Issue registered", detail: "The missing, delayed, or incorrect record is identified." },
    { title: "Records reviewed", detail: "The documentation team checks the request and attachments." },
    { title: "Buyer follow-up", detail: "Any additional identity proof or correction is requested." },
    { title: "Document delivered", detail: "The corrected or requested record is shared with the buyer." },
  ],
  "Interior remodelling": [
    { title: "Design brief received", detail: "Room scope, finish preferences, and budget are recorded." },
    { title: "Consultation and estimate", detail: "The design team prepares scope, quote, and schedule." },
    { title: "Buyer approval and deposit", detail: "The proposal is approved and the required deposit is paid." },
    { title: "Work scheduled", detail: "The team confirms the start date and tracks delivery." },
  ],
  "General service": [
    { title: "Service requested", detail: "The home service issue and preferred availability are received." },
    { title: "Team assigned", detail: "The relevant maintenance team reviews and accepts the request." },
    { title: "Visit or repair scheduled", detail: "The service time is coordinated with the buyer." },
    { title: "Completion confirmed", detail: "The repair or maintenance work is confirmed with the buyer." },
  ],
  "Construction photos": [
    { title: "Photo request received", detail: "Requested rooms and construction stage are recorded." },
    { title: "Site team notified", detail: "The site team captures the requested progress views." },
    { title: "Quality review", detail: "Images are checked and matched to the buyer's unit." },
    { title: "Photos shared", detail: "Approved progress photos are shared in the buyer portal." },
  ],
  "Site visit": [
    { title: "Visit request received", detail: "Preferred date and attendee details are recorded." },
    { title: "Safety and access check", detail: "The site team checks access, availability, and safety requirements." },
    { title: "Visit confirmed", detail: "The buyer receives the approved visit time and instructions." },
    { title: "Visit completed", detail: "Attendance and any follow-up actions are logged." },
  ],
  "Modification request": [
    { title: "Modification submitted", detail: "Requested change and supporting details are recorded." },
    { title: "Technical review", detail: "Design and site teams check feasibility and impact." },
    { title: "Estimate shared", detail: "Cost and schedule are shared for buyer approval." },
    { title: "Work scheduled", detail: "Approved modifications are added to the site plan." },
  ],
  Documents: [
    { title: "Document requested", detail: "The requested agreement or property record is identified." },
    { title: "Ownership verified", detail: "Buyer and unit details are checked before release." },
    { title: "Copy prepared", detail: "The correct and current record is prepared for sharing." },
    { title: "Document delivered", detail: "The file is shared through the buyer portal." },
  ],
  "Property 360": [
    { title: "Walkthrough requested", detail: "The buyer requests a virtual view for their unit." },
    { title: "Unit view prepared", detail: "The latest available capture is linked to the correct unit." },
    { title: "Link verified", detail: "The walkthrough link is tested before sharing." },
    { title: "Access shared", detail: "The buyer receives the walkthrough in their portal." },
  ],
};

function addBuildingAndWorkflow(
  requests: BaseServiceAdminRequest[],
  phase: ServiceAdminRequest["phase"],
): ServiceAdminRequest[] {
  return requests.map((request) => ({
    ...request,
    phase,
    building: "Skyline Crest",
    tower: request.unit.split(" · ")[0],
    steps: activityStepsByService[request.service],
  }));
}

export const serviceAdminDemoRequests: ServiceAdminRequest[] = [
  ...addBuildingAndWorkflow(postPossessionDemoRequests, "Post-possession"),
  ...addBuildingAndWorkflow(prePossessionDemoRequests, "Pre-possession"),
];
