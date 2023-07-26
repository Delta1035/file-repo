
export class DataService {
  constructor() { }
  Notes = 'Notes';
  tipContent = 'There are one or more rows that have duplicate values.';
  num = 'num';
  time = 'time';
  detail = 'detail';
  Detail = 'Detail';
  inspectReturn = 'Inspect return';
  return = 'Return';
  returns = 'Returns';
  returnOrder = `Return Orders`;
  status = `Status`;
  seller = `Seller`;
  returnItems = `Return items`;
  inspection = `Inspection?`;
  remarks = `Remarks`;
  buyer = `Buyer`;
  action = `Action`;
  orders = 'Orders';
  inspect = 'Inspect';
  handle = 'Handle';
  all = 'All';
  pending = 'Pending';
  processing = 'Processing';
  error = 'Error';
  complete = 'Complete';
  showCompleteOrders = `Show complete orders`;
  searchPlaceholder = `search...`;
  confirmReceived = `Confirm received`;
  none = 'None';
  view = 'View';
  requireInspection = `Require inspection`;
  skus = `SKUs`;
  box = `BOX`;
  trackingNumber = `Tracking number`;
  viewOrderDetail = `View order detail`;

  image = `Image`;
  sku = 'SKU';
  viewSkuDetail = 'View SKU detail';
  returnQty = 'Return Qty.';
  category = 'Category';
  service = 'Service';

  putAway = `Put-away`;
  putAwayLocation = `Put-away location`;
  changeLocation = 'Change location';

  AdvanceInformation = 'Advance information';
  repackaged = 'Re-packaged';
  relabeled = 'Re-labeled';

  cancel = 'Cancel';
  yesConfirm = 'Yes,confirm';
  confirmOrderReceivedTitle = 'Confirm order received?';
  confirmOrderReceivedDescription = `
  By clicking "Yes, confirm", you confirm that this order was received. Please note that this action is irreversible.
  `;

  overview = 'Overview';
  returningItems = 'Returning items';
  tasks = 'Tasks';

  hasItemRequireInspection = 'This order has items that require inspection.';

  progress = 'Progress';

  received = 'Received';
  type = 'Type';
  assignee = 'Assignee';

  /** inventory start*/
  inventory = 'Inventory';
  replenish = 'Replenish';
  productAndVariants = 'Product & Variants';
  available = 'Available';
  unAvailable = 'unavailable';
  inbound = 'Inbound';
  reserved = 'Reserved';
  variants = 'variants';
  addInventory = 'Add inventory';
  addStorageLocation = 'Add storage location';
  newCycleCount = 'New Cycle Count';
  total = 'Total';
  outbound = 'Outbound';
  crossDock = 'crossDock';
  CrossDock = 'Cross Dock';
  productName = 'ProductName';
  upc = 'UPC';
  batchOrLotNumber = 'Batch/Lot number';
  serialNumber = 'Serial number';
  variant = 'Variant';
  expirationDate = 'Expiration date';
  storageLocation = 'Storage locations';
  locations = 'locations';
  location = 'location';
  area = 'Area';
  capacityWithUnit = 'Capacity(m³)';
  usage = 'Usage';
  locked = 'Locked';
  pick = 'Pick';
  bulk = 'Bulk';
  adjustInventory = 'Adjust inventory';
  viewLocationDetail = 'View location detail';
  user = 'User';
  palletNo = 'Pallet No.';
  boxNo = 'Box No.';
  transaction = 'Transaction';

  transactionID = 'Transaction ID';
  adjustment = 'Adjustment';
  original = 'Original';
  current = 'Current';
  approve = 'Approve';
  deny = 'Deny';
  /** inventory end*/

  /** cycle count start */
  cycleCount = 'Cycle count';
  startAt = 'Start at';
  inProgress = 'In progress';
  partialCount = 'Partial count';
  notFound = 'Not found';
  discrepancy = 'Discrepancy';
  printCycleCountSheet = 'Print cycle count sheet';
  recordCountResult = 'Record count result';
  exportCountResult = 'Export count result';
  assignedTasks = 'Assigned tasks';
  unAssignedTasks = 'Unassigned tasks';
  products = 'products';
  assocatedRequest = 'Assocated request';
  /** cycle count end */

  /** dock statr */
  docks = 'Docks';
  addDocks = 'Add docks';
  addDock = 'Add dock';
  addSchedule = 'Add schedule';
  list = 'List';
  map = 'Map';
  dock = 'Dock';
  dataAndTime = 'Date and time';
  Punctuality = 'Punctuality';
  RelatedOrder = 'Related order';
  RelatedJob = 'Related job';
  Carrier = 'Carrier';
  statu = 'Statu';
  upcomingSchedule = 'Upcoming schedule';
  DockID = 'Dock ID';
  Name = 'Name';
  Restart = 'Restart';
  FinishLatar: string = 'Finish Latar';
  ConfirmAndContinue: string | undefined = 'Confirm and continue';
  TotalPacked: any = 'Total packed';
  SKUsPacked: any = 'SKUs packed';
  Pallets: any = 'Pallets';
  Boxes: any = 'Boxes';
  SingleBoxDescription: string = 'All items will be placed in a single box';
  SingleBox: string = 'Single box';
  MultipleContainers: string = 'Multiple containers';
  MultipleContainersDescription: string = 'Items will be placed in multiple containers';
  CartonizationQuestion: any = 'How would you like to pack the items?';
  Palltes: string = 'Palltes';
  palletsWarning: any = 'Make sure you have added all individual boxes you are going to ship before adding pallets. This includes boxes that will be placed inside pallets.';
  Addpallet: string | undefined = 'Add pallet';
  NoPalletsAddedSoFar: any = 'No pallets added so far';
  CreateAndAddAnother: string | undefined = 'Create and add another';
  Create: string | undefined = 'Create';
  palletCreateText: any = 'Make sure this pallet has the correct information before pressing "Create".';
  PalletSummary: any = 'Pallet Summary';
  Type: string = 'Type';
  Pallet: string | number = 'Pallet';
  PalletID: string = 'Pallet ID';
  Dimension: string = 'Dimension';
  SKUs: string = 'SKUs';
  Units: string = 'Units';
  NewPallet: any = 'New pallet';
  newPalletText: any = 'Clearly indicate the details and content in this pallet. All fields are required unless specified.';
  IndividualItems = 'Individual items';
  IndividualItemsLabel: string = 'Indicate the individual items in this container. DO NOT include items that are already in boxes.';
  AddedIndividualBoxes: any = 'Added individual boxes are shown here. Check the boxes to indicate they are in this pallet.';
  NewPalletBoxes = 'Make sure you have added the individual boxes first before indicating which boxes are in this pallet.';
  AddBox: string = 'Add box';
  Length: string = 'Length';
  Width: string = 'Width';
  Height: string = 'Height';
  Weight: string = 'Weight';
  Destination: string = 'Destination';
  StepOne: any = 'Step 1';
  StepTwo: any = 'Step 2';
  StepThree: any = 'Step 3';
  StepFour: any = 'Step 4';
  StepFive: any = 'Step 5';
  ChooseInventoryToReplenish: any = 'Choose inventory to replenish';
  ConfirmShipment = 'Confirm shipment';
  PrintShippingMark = 'Print shipping marker';
  Cartonization = 'Cartonization';
  CurrentReplenishment: string = 'Current Replenishment';
  NoBoxesAddedSoFar: any = 'No boxes added so far';
  BoxID: string = 'Box ID';
  NewBox: any = 'New Box';
  newBoxText: any = 'Clearly indicate the details and content in this box. All fields are required unless specified.';
  itemsInThisBox: any = 'Items in this box';
  UnitsInThisContainer: string = 'Units in this container';
  UnitsPacked: string = 'Units packed';
  ProductName: string = 'Product name';
  SKU: string = 'SKU';
  EnterQuantity: string = 'Enter quantity';
  Box: string | number = 'Box';
  units: string = 'units';
  x: any = 'x';
  BoxSummary: any = 'Box Summary';
  Save: string = 'Save';
  InsideThisBox: string = 'Inside this box';
  InsideThisPallet: string = 'Inside this palette';
  Finish: string | undefined = 'Finish';
  viewInReplenishments: string | undefined = 'View in "Replenishments"';
  Origin: string = 'Origin';
  Replenishment: string = 'Replenishment';
  replenishmentCreatedTip: any = 'You can start selling once warehouse receives your replenishment.';
  replenishmentCreated: any = 'Replenishment created!';
  Edit: string = 'Edit';
  Rewive: string = 'Rewive';
  NeedHelp: any = 'Need help?';
  boxes: string = 'boxes';
  IndividualUnits: string = 'Individual Units';
  ShipDate: any = 'Ship date';
  Distination: string = 'Destination';
  ChooseInventoryToReplenishment: string = 'Choose inventory to replenish';
  stepFivePrefix: string = 'Shipping marks printed and tracking number provided for';
  containers = 'containers';
  cycleCountRecordsForThePast: string = 'cycle count records for the past';
  returnSKUs: string = 'return SKUs';
  AddDocks = 'Add docks';
  ChooseMethod = 'Choose method';
  templateRecommended = 'Template (recommended)';
  templateRecommendedDescription = 'Download a template, fill in the information of warehouse docks and review them before submission.';
  Manual = 'Manual';
  ManualDescription = 'Manually enter all the information of warehouse docks in a table.';
  DownloadTemplate = 'Download template';
  DownloadTemplateDescription = 'Download and complete the following template to add warehouse docks. If it is already downloaded, press "Next".';
  Download = 'Download';
  UploadTemplate = 'Upload template';
  UploadTemplateDescription = 'Upload the template with the complete information of your warehouse docks.';
  Remove = 'Remove';
  ReviewDocks = 'Review docks';
  ReviewDocksDescription = 'Review the docks to see if they are correct. Press "Submit" after you are done.';
  templateFIleName = 'Warehouse Docks Template.xlsx';

  uploadedList = [
    'Warehouse Docks Template (edited)1.xlsx',
    'Warehouse Docks Template (edited)2.xlsx'
  ];

  Adding = 'Adding';
  warehouseDocks = 'warehouseDocks';
  Showing = 'Showing';
  SkusToBeInspected = 'SKUs to be inspected';
  SkusToBeHandled = 'SKUs to be handled';
  tasksAssociatedWithThisOrder = 'tasks associated with this order';
  usageHistoryForThePast = 'usage history for the past';
  nodate = 'No data available';
  confirmandcontinue = 'Confirm and continue';
  unitNumber = 12;
  readyUnit = 'units ready for replenishment';
  totalFess = 'Total service fees';
  noMoney = '$0.00';
  message = 'SKUs selected';
  buttonText1 = 'Edit service';
  buttonText2 = 'Add replenishment units';
  addvalueedType1 = 'Auto-Kitting';
  addvalueedType2 = 'Auto-Dekitting';
  addvalueedType3 = 'Re-label';
  addvalueedType4 = 'Re-package';
  addvalueedTypeContent = 'Learn more about these value-added services in AmMall seller center';
  container = 'container';
  editContainer = 'Edot container';
  printContainer = 'Print shipping marks';
  print = 'print';
  shipTo = 'ship to';
  shipFrom = 'ship from';
  shipFormAddress = 'Mostow Co. 2323Dancing Dove Lane,Long Island City,NY 11101,United States';
  shipToAddress = 'AML_NJ_US-New Jersey Warehouse 2614 Sweetwood Drive,Arvada,CO 80002,United States';
  trackingNumberOptional = 'Tracking number (optionol)';
  qusetions = "What's next?";
  fristStep = '1.Apply the correct AmMall-provided shippinh mark to each container';
  secendStep = '2.Create shipping labels from your selected carrier';
  thirdStep = '3.Delivery containers to your selected carrier and save the tracking number';
  fourthStep = '4.Provide tracking number for each container so AmMall is informed of incoming shipments';
  fifthStep = '5.Make sure all information is correct before submission';
  estimatedFees = 'Estimated fees';
  totalAdvance = 'Total advance preparation and labelling fees';
  totalValueadd = 'Total value-added service fees';
  totalPlacement = 'Total placement fees';
  totalEstimated = 'Total estimated shipping fees';
  grandTotal = 'Grand total';
  submit = 'Submit replenishment';
  warnCard = 'The fees here is merely an estimate. Please refer to the final invoice for the actual incurred service charges';
}