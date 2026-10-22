import { useState } from 'react'
import './App.css'
import RecyclerComparison from './RecyclerComparison'

const recyclerData = [
  {
    id: 1,
    name: 'Green Earth Recycling',
    materials: 'Plastic, Paper, Metal',
    location: 'Vidyanagar, Davanagere',
    contact: '00000 00001',
    phone: '0000000001',
  },
  {
    id: 2,
    name: 'Eco Scrap Centre',
    materials: 'Metal, E-waste',
    location: 'MCC B Block, Davanagere',
    contact: '00000 00002',
    phone: '0000000002',
  },
  {
    id: 3,
    name: 'Clean City Recyclers',
    materials: 'Paper, Plastic, E-waste',
    location: 'PB Road, Davanagere',
    contact: '00000 00003',
    phone: '0000000003',
  },
]

const translations = {
  en: {
    home: 'Home',
    estimator: 'Scrap Estimator',
    photoUpload: 'Photo Upload',
    requestPickup: 'Request Pickup',
    tagline: 'A cleaner tomorrow starts today',
    heroTitle: 'Turn Your Waste Into Worth.',
    heroText: 'Connect with verified recyclers and give recyclable materials a new life.',
    calculate: 'Calculate My Scrap Value',
    identifyWaste: 'Identify Your Waste',
    identifyWasteText: 'Choose a material and explore recycling options.',
    estimateEarnings: 'Estimate Earnings',
    estimateEarningsText: 'Get an approximate value for your recyclable items.',
    findRecycler: 'Find a Recycler',
    findRecyclerText: 'Prepare your scrap for a convenient pickup.',
    
    estimatorTitle: 'Advanced Scrap Value Estimator',
    estimatorDescription: 'Add different scrap materials to calculate your total earnings.',
    materialType: 'Material type',
    weight: 'Weight (kg)',
    itemValue: 'Item value',
    removeItem: 'Remove item',
    addMaterial: 'Add Another Material',
    totalEstimated: 'Total Estimated Value',
    demoRates: 'Demo rates only. Actual prices may vary.',
    photoTitle: 'Upload Your Waste Photo',
    photoDescription: 'Select a photo of the scrap you want to recycle.',
    selectMaterial: 'Select Identified Material',
    chooseMaterial: 'Choose material',
    addIdentifiedMaterial: 'Add Identified Material to Estimator',
    
pickupTitle: 'Request Scrap Pickup',
pickupDescription: 'Schedule a convenient pickup for your recyclable waste.',
selectedRecycler: 'Your Selected Recycler',
name: 'Name',
material: 'Material',
weightLabel: 'Weight',
rate: 'Rate',
estimatedPayment: 'Estimated Payment',
distance: 'Distance',
pickupEstimate: 'Pickup Estimate',
yourName: 'Your Name',
enterName: 'Enter your full name',
phoneNumber: 'Phone Number',
enterPhone: 'Enter your phone number',
phoneValidation: 'Please enter a 10-digit phone number',
pickupAddress: 'Pickup Address',
enterAddress: 'Enter your full pickup address',
preferredDate: 'Preferred Pickup Date',
submitPickup: 'Submit Pickup Request',
pickupSuccess: 'Your pickup request has been submitted successfully!',

confirmationTitle: 'Pickup Request Confirmation',
phone: 'Phone',
address: 'Address',
pickupDateLabel: 'Pickup Date',
receiptTitle: 'Estimated Pickup Receipt',
receiptId: 'Receipt ID',
receiptDate: 'Receipt Date',
customerDetails: 'Customer Details',
scrapDetails: 'Scrap Details',
estimatedTotalReceipt: 'Estimated Total',
selectedRecyclerReceipt: 'Selected Recycler',
receiptDisclaimer: 'This is an estimated receipt for a pickup request, not proof of completed sale or payment.',
printReceipt: 'Print Receipt',
savePdf: 'Save as PDF',
dashboardTitle: 'Pickup Request Dashboard',
dashboardDescription: 'Track all your scrap pickup requests at a glance.',
totalRequests: 'Total Requests',
pendingRequests: 'Pending Requests',
cancelledRequests: 'Cancelled Requests',
completedRequests: 'Completed Requests',
myRequests: 'My Pickup Requests',
myRequestsDescription: 'Track the status of your submitted pickup requests.',
searchRequests: 'Search Requests',
searchPlaceholder: 'Search by name or request ID...',
filterStatus: 'Filter by Status',
allRequests: 'All Requests',
noRequests: 'You have not submitted any pickup requests yet.',
requestNumber: 'Pickup Request',
status: 'Status',
cancelRequest: 'Cancel Request',
markCompleted: 'Mark as Completed',
recyclersTitle: 'Find Nearby Recyclers',
recyclersDescription: 'Explore recycling partners who accept different types of scrap.',
searchAreaPlaceholder: 'Enter your city or area...',
searchRecyclers: 'Search',
noRecyclers: 'No recyclers found in this area. Try another area.',
materialsLabel: 'Materials',
locationLabel: 'Location',
contactLabel: 'Contact',
contactRecycler: 'Contact Recycler',
demoListing: 'Demo listing',
plastic: 'Plastic',
paper: 'Paper',
metal: 'Metal',
ewaste: 'E-waste',
selectedWaste: 'Selected waste',


  },
  hi: {
    home: 'होम',
    estimator: 'कबाड़ मूल्य अनुमान',
    photoUpload: 'फोटो अपलोड',
    requestPickup: 'पिकअप अनुरोध',
    tagline: 'स्वच्छ कल की शुरुआत आज से',
    heroTitle: 'अपने कचरे को मूल्य में बदलें।',
    heroText: 'रीसाइक्लिंग के लिए कबाड़ संग्राहकों और रीसाइक्लर्स से जुड़ें।',
    calculate: 'मेरे कबाड़ का मूल्य जानें',
    identifyWaste: 'अपने कचरे को पहचानें',
    identifyWasteText: 'सामग्री चुनें और रीसाइक्लिंग के विकल्प देखें।',
    estimateEarnings: 'कमाई का अनुमान लगाएँ',
    estimateEarningsText: 'अपने रीसाइक्लिंग योग्य सामान की अनुमानित कीमत जानें।',
    findRecycler: 'रीसाइक्लर खोजें',
    findRecyclerText: 'आसान पिकअप के लिए अपना कबाड़ तैयार रखें।',
    
    estimatorTitle: 'कबाड़ के मूल्य का विस्तृत अनुमान',
    estimatorDescription: 'कुल कमाई की गणना के लिए अलग-अलग कबाड़ सामग्री जोड़ें।',
    materialType: 'सामग्री का प्रकार',
    weight: 'वज़न (किलो)',
    itemValue: 'सामग्री का मूल्य',
    removeItem: 'सामग्री हटाएँ',
    addMaterial: 'एक और सामग्री जोड़ें',
    totalEstimated: 'कुल अनुमानित मूल्य',
    demoRates: 'ये केवल उदाहरण दरें हैं। वास्तविक कीमतें अलग हो सकती हैं।',
    photoTitle: 'अपने कबाड़ की फोटो अपलोड करें',
    photoDescription: 'रीसाइक्लिंग के लिए कबाड़ की फोटो चुनें।',
    selectMaterial: 'पहचानी गई सामग्री चुनें',
    chooseMaterial: 'सामग्री चुनें',
    addIdentifiedMaterial: 'पहचानी गई सामग्री अनुमान में जोड़ें',
    
pickupTitle: 'कबाड़ पिकअप का अनुरोध करें',
pickupDescription: 'अपने कबाड़ के सुविधाजनक पिकअप का समय तय करें।',
selectedRecycler: 'आपका चुना हुआ रीसाइक्लर',
name: 'नाम',
material: 'सामग्री',
weightLabel: 'वज़न',
rate: 'दर',
estimatedPayment: 'अनुमानित भुगतान',
distance: 'दूरी',
pickupEstimate: 'पिकअप का अनुमानित समय',
yourName: 'आपका नाम',
enterName: 'अपना पूरा नाम दर्ज करें',
phoneNumber: 'फोन नंबर',
enterPhone: 'अपना फोन नंबर दर्ज करें',
phoneValidation: 'कृपया 10 अंकों का फोन नंबर दर्ज करें',
pickupAddress: 'पिकअप का पता',
enterAddress: 'पिकअप का पूरा पता दर्ज करें',
preferredDate: 'पसंदीदा पिकअप तारीख',
submitPickup: 'पिकअप अनुरोध भेजें',
pickupSuccess: 'आपका पिकअप अनुरोध सफलतापूर्वक भेज दिया गया है!',
confirmationTitle: 'पिकअप अनुरोध की पुष्टि',
phone: 'फोन',
address: 'पता',
pickupDateLabel: 'पिकअप की तारीख',
receiptTitle: 'अनुमानित पिकअप रसीद',
receiptId: 'रसीद आईडी',
receiptDate: 'रसीद की तारीख',
customerDetails: 'ग्राहक का विवरण',
scrapDetails: 'कबाड़ का विवरण',
estimatedTotalReceipt: 'कुल अनुमानित मूल्य',
selectedRecyclerReceipt: 'चुना गया रीसाइक्लर',
receiptDisclaimer: 'यह पिकअप अनुरोध की अनुमानित रसीद है, पूरी हुई बिक्री या भुगतान का प्रमाण नहीं।',
printReceipt: 'रसीद प्रिंट करें',
savePdf: 'PDF के रूप में सेव करें',
dashboardTitle: 'पिकअप अनुरोध डैशबोर्ड',
dashboardDescription: 'अपने सभी कबाड़ पिकअप अनुरोधों की स्थिति एक जगह देखें।',
totalRequests: 'कुल अनुरोध',
pendingRequests: 'लंबित अनुरोध',
cancelledRequests: 'रद्द किए गए अनुरोध',
completedRequests: 'पूरे किए गए अनुरोध',
myRequests: 'मेरे पिकअप अनुरोध',
myRequestsDescription: 'अपने भेजे गए पिकअप अनुरोधों की स्थिति देखें।',
searchRequests: 'अनुरोध खोजें',
searchPlaceholder: 'नाम या अनुरोध आईडी से खोजें...',
filterStatus: 'स्थिति के अनुसार फ़िल्टर करें',
allRequests: 'सभी अनुरोध',
noRequests: 'आपने अभी तक कोई पिकअप अनुरोध नहीं भेजा है।',
requestNumber: 'पिकअप अनुरोध',
status: 'स्थिति',
cancelRequest: 'अनुरोध रद्द करें',
markCompleted: 'पूरा हुआ चिह्नित करें',
recyclersTitle: 'आस-पास के रीसाइक्लर्स खोजें',
recyclersDescription: 'अलग-अलग प्रकार का कबाड़ स्वीकार करने वाले रीसाइक्लर्स देखें।',
searchAreaPlaceholder: 'अपने शहर या क्षेत्र का नाम लिखें...',
searchRecyclers: 'खोजें',
noRecyclers: 'इस क्षेत्र में कोई रीसाइक्लर नहीं मिला। दूसरा क्षेत्र आज़माएँ।',
materialsLabel: 'सामग्री',
locationLabel: 'स्थान',
contactLabel: 'संपर्क',
contactRecycler: 'रीसाइक्लर से संपर्क करें',
demoListing: 'डेमो सूची',
plastic: 'प्लास्टिक',
paper: 'कागज़',
metal: 'धातु',
ewaste: 'ई-कचरा',
selectedWaste: 'चुना गया कचरा',


  },
  kn: {
    home: 'ಮುಖಪುಟ',
    estimator: 'ತ್ಯಾಜ್ಯ ಬೆಲೆ ಅಂದಾಜು',
    photoUpload: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್',
    requestPickup: 'ಪಿಕಪ್ ವಿನಂತಿ',
    tagline: 'ಸ್ವಚ್ಛ ನಾಳೆಯ ಆರಂಭ ಇಂದೇ',
    heroTitle: 'ನಿಮ್ಮ ತ್ಯಾಜ್ಯವನ್ನು ಮೌಲ್ಯವಾಗಿ ಪರಿವರ್ತಿಸಿ.',
    heroText: 'ಮರುಬಳಕೆಗಾಗಿ ಮರುಬಳಕೆದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.',
    calculate: 'ನನ್ನ ತ್ಯಾಜ್ಯದ ಬೆಲೆ ಲೆಕ್ಕಿಸಿ',
    identifyWaste: 'ನಿಮ್ಮ ತ್ಯಾಜ್ಯವನ್ನು ಗುರುತಿಸಿ',
    identifyWasteText: 'ವಸ್ತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಮರುಬಳಕೆಯ ಆಯ್ಕೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
    estimateEarnings: 'ಗಳಿಕೆಯ ಅಂದಾಜು',
    estimateEarningsText: 'ನಿಮ್ಮ ಮರುಬಳಕೆ ಮಾಡಬಹುದಾದ ವಸ್ತುಗಳ ಅಂದಾಜು ಬೆಲೆಯನ್ನು ತಿಳಿಯಿರಿ.',
    findRecycler: 'ಮರುಬಳಕೆದಾರರನ್ನು ಹುಡುಕಿ',
    findRecyclerText: 'ಸುಲಭ ಪಿಕಪ್‌ಗಾಗಿ ನಿಮ್ಮ ತ್ಯಾಜ್ಯವನ್ನು ಸಿದ್ಧಪಡಿಸಿ.',
    
    estimatorTitle: 'ವಿಸ್ತೃತ ತ್ಯಾಜ್ಯ ಬೆಲೆ ಅಂದಾಜು',
    estimatorDescription: 'ಒಟ್ಟು ಗಳಿಕೆಯನ್ನು ಲೆಕ್ಕಿಸಲು ವಿವಿಧ ತ್ಯಾಜ್ಯ ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಿ.',
    materialType: 'ವಸ್ತುವಿನ ಪ್ರಕಾರ',
    weight: 'ತೂಕ (ಕೆಜಿ)',
    itemValue: 'ವಸ್ತುವಿನ ಬೆಲೆ',
    removeItem: 'ವಸ್ತುವನ್ನು ತೆಗೆದುಹಾಕಿ',
    addMaterial: 'ಇನ್ನೊಂದು ವಸ್ತುವನ್ನು ಸೇರಿಸಿ',
    totalEstimated: 'ಅಂದಾಜು ಒಟ್ಟು ಬೆಲೆ',
    demoRates: 'ಇವು ಮಾದರಿ ದರಗಳು ಮಾತ್ರ. ನಿಜವಾದ ಬೆಲೆಗಳು ಬದಲಾಗಬಹುದು.',
    photoTitle: 'ನಿಮ್ಮ ತ್ಯಾಜ್ಯದ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    photoDescription: 'ಮರುಬಳಕೆ ಮಾಡಲು ಬಯಸುವ ತ್ಯಾಜ್ಯದ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ.',
    selectMaterial: 'ಗುರುತಿಸಲಾದ ವಸ್ತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    chooseMaterial: 'ವಸ್ತುವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    addIdentifiedMaterial: 'ಗುರುತಿಸಿದ ವಸ್ತುವನ್ನು ಅಂದಾಜಿಗೆ ಸೇರಿಸಿ',
    
pickupTitle: 'ತ್ಯಾಜ್ಯ ಪಿಕಪ್ ವಿನಂತಿಸಿ',
pickupDescription: 'ನಿಮ್ಮ ಮರುಬಳಕೆ ತ್ಯಾಜ್ಯದ ಪಿಕಪ್ ಸಮಯವನ್ನು ನಿಗದಿಪಡಿಸಿ.',
selectedRecycler: 'ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಮರುಬಳಕೆದಾರ',
name: 'ಹೆಸರು',
material: 'ವಸ್ತು',
weightLabel: 'ತೂಕ',
rate: 'ದರ',
estimatedPayment: 'ಅಂದಾಜು ಪಾವತಿ',
distance: 'ದೂರ',
pickupEstimate: 'ಅಂದಾಜು ಪಿಕಪ್ ಸಮಯ',
yourName: 'ನಿಮ್ಮ ಹೆಸರು',
enterName: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
phoneNumber: 'ಫೋನ್ ಸಂಖ್ಯೆ',
enterPhone: 'ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
phoneValidation: 'ದಯವಿಟ್ಟು 10 ಅಂಕಿಗಳ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
pickupAddress: 'ಪಿಕಪ್ ವಿಳಾಸ',
enterAddress: 'ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಪಿಕಪ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ',
preferredDate: 'ಆದ್ಯತೆಯ ಪಿಕಪ್ ದಿನಾಂಕ',
submitPickup: 'ಪಿಕಪ್ ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಿ',
pickupSuccess: 'ನಿಮ್ಮ ಪಿಕಪ್ ವಿನಂತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!',
confirmationTitle: 'ಪಿಕಪ್ ವಿನಂತಿಯ ದೃಢೀಕರಣ',
phone: 'ಫೋನ್',
address: 'ವಿಳಾಸ',
pickupDateLabel: 'ಪಿಕಪ್ ದಿನಾಂಕ',
receiptTitle: 'ಅಂದಾಜು ಪಿಕಪ್ ರಸೀದಿ',
receiptId: 'ರಸೀದಿ ಐಡಿ',
receiptDate: 'ರಸೀದಿ ದಿನಾಂಕ',
customerDetails: 'ಗ್ರಾಹಕರ ವಿವರಗಳು',
scrapDetails: 'ತ್ಯಾಜ್ಯದ ವಿವರಗಳು',
estimatedTotalReceipt: 'ಅಂದಾಜು ಒಟ್ಟು ಮೊತ್ತ',
selectedRecyclerReceipt: 'ಆಯ್ಕೆ ಮಾಡಿದ ಮರುಬಳಕೆದಾರ',
receiptDisclaimer: 'ಇದು ಪಿಕಪ್ ವಿನಂತಿಯ ಅಂದಾಜು ರಸೀದಿ ಮಾತ್ರ. ಪೂರ್ಣಗೊಂಡ ಮಾರಾಟ ಅಥವಾ ಪಾವತಿಗೆ ಇದು ಪುರಾವೆಯಲ್ಲ.',
printReceipt: 'ರಸೀದಿಯನ್ನು ಮುದ್ರಿಸಿ',
savePdf: 'PDF ಆಗಿ ಉಳಿಸಿ',
dashboardTitle: 'ಪಿಕಪ್ ವಿನಂತಿಗಳ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
dashboardDescription: 'ನಿಮ್ಮ ಎಲ್ಲಾ ತ್ಯಾಜ್ಯ ಪಿಕಪ್ ವಿನಂತಿಗಳ ಸ್ಥಿತಿಯನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ನೋಡಿ.',
totalRequests: 'ಒಟ್ಟು ವಿನಂತಿಗಳು',
pendingRequests: 'ಬಾಕಿ ಇರುವ ವಿನಂತಿಗಳು',
cancelledRequests: 'ರದ್ದಾದ ವಿನಂತಿಗಳು',
completedRequests: 'ಪೂರ್ಣಗೊಂಡ ವಿನಂತಿಗಳು',
myRequests: 'ನನ್ನ ಪಿಕಪ್ ವಿನಂತಿಗಳು',
myRequestsDescription: 'ನೀವು ಸಲ್ಲಿಸಿದ ಪಿಕಪ್ ವಿನಂತಿಗಳ ಸ್ಥಿತಿಯನ್ನು ನೋಡಿ.',
searchRequests: 'ವಿನಂತಿಗಳನ್ನು ಹುಡುಕಿ',
searchPlaceholder: 'ಹೆಸರು ಅಥವಾ ವಿನಂತಿ ಐಡಿ ಮೂಲಕ ಹುಡುಕಿ...',
filterStatus: 'ಸ್ಥಿತಿಯ ಪ್ರಕಾರ ಫಿಲ್ಟರ್ ಮಾಡಿ',
allRequests: 'ಎಲ್ಲಾ ವಿನಂತಿಗಳು',
noRequests: 'ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಪಿಕಪ್ ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಿಲ್ಲ.',
requestNumber: 'ಪಿಕಪ್ ವಿನಂತಿ',
status: 'ಸ್ಥಿತಿ',
cancelRequest: 'ವಿನಂತಿಯನ್ನು ರದ್ದುಗೊಳಿಸಿ',
markCompleted: 'ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ',
recyclersTitle: 'ಹತ್ತಿರದ ಮರುಬಳಕೆದಾರರನ್ನು ಹುಡುಕಿ',
recyclersDescription: 'ವಿವಿಧ ರೀತಿಯ ತ್ಯಾಜ್ಯವನ್ನು ಸ್ವೀಕರಿಸುವ ಮರುಬಳಕೆದಾರರನ್ನು ನೋಡಿ.',
searchAreaPlaceholder: 'ನಿಮ್ಮ ನಗರ ಅಥವಾ ಪ್ರದೇಶವನ್ನು ನಮೂದಿಸಿ...',
searchRecyclers: 'ಹುಡುಕಿ',
noRecyclers: 'ಈ ಪ್ರದೇಶದಲ್ಲಿ ಮರುಬಳಕೆದಾರರು ಕಂಡುಬಂದಿಲ್ಲ. ಬೇರೆ ಪ್ರದೇಶವನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
materialsLabel: 'ವಸ್ತುಗಳು',
locationLabel: 'ಸ್ಥಳ',
contactLabel: 'ಸಂಪರ್ಕ',
contactRecycler: 'ಮರುಬಳಕೆದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ',
demoListing: 'ಡೆಮೊ ಪಟ್ಟಿ',
plastic: 'ಪ್ಲಾಸ್ಟಿಕ್',
paper: 'ಕಾಗದ',
metal: 'ಲೋಹ',
ewaste: 'ಇ-ತ್ಯಾಜ್ಯ',
selectedWaste: 'ಆಯ್ಕೆ ಮಾಡಿದ ತ್ಯಾಜ್ಯ',

    

  },
}


function App() {
  const [language, setLanguage] = useState('en')
  const t = translations[language]
  
  const [material, setMaterial] = useState('Plastic')
  const [weight, setWeight] = useState(1)
  const [scrapItems, setScrapItems] = useState([
  { id: 1, material: 'Plastic', weight: 1 },
])
  const [recyclerSearch, setRecyclerSearch] = useState('')
  const filteredRecyclers = recyclerData.filter((recycler) =>
  recycler.location
    .toLowerCase()
    .includes(recyclerSearch.trim().toLowerCase())
)
  const [pickupMessage, setPickupMessage] = useState('')
  const [pickupDetails, setPickupDetails] = useState(null)
  const [pickupRequests, setPickupRequests] = useState([])
  const [selectedRecycler, setSelectedRecycler] = useState(null)
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const rates = {
    Plastic: 15,
    Paper: 12,
    Metal: 35,
    'E-waste': 80,
  }
  const totalValue = scrapItems.reduce((total, item) => {
  return total + rates[item.material] * Number(item.weight)
}, 0)


const filteredRequests = pickupRequests.filter((request) => {
  const matchesStatus =
    statusFilter === 'All' || request.status === statusFilter

  const matchesSearch =
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(request.id).includes(searchTerm)

  return matchesStatus && matchesSearch
})




const addScrapItem = () => {
  setScrapItems((items) => [
    ...items,
    {
      id: Date.now(),
      material: 'Plastic',
      weight: 1,
    },
  ])
}


const updateScrapItem = (id, field, value) => {
  setScrapItems((items) =>
    items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    )
  )
}

const removeScrapItem = (id) => {
  setScrapItems((items) => items.filter((item) => item.id !== id))
}

  const estimate = rates[material] * Number(weight)
  const [photo, setPhoto] = useState(null)
  const [identifiedMaterial, setIdentifiedMaterial] = useState('')

  const handlePhotoChange = (event) => {
  const selectedFile = event.target.files[0]

  if (selectedFile) {
    setPhoto(URL.createObjectURL(selectedFile))
  }
}

  return (
    <div className="app">
      
<header className="navbar">
  <a href="#home" className="nav-logo">
    ♻️ Kabadiwala Connect
  </a>

  <div className="nav-links">
    <a href="#home">{t.home}</a>
    <a href="#estimator">{t.estimator}</a>
    <a href="#photo-upload">{t.photoUpload}</a>
    <a href="#pickup">{t.requestPickup}</a>
  </div>
  
<div className="language-switcher">
  <label htmlFor="language-select">🌐</label>
  <select
    id="language-select"
    value={language}
    onChange={(event) => setLanguage(event.target.value)}
    aria-label="Select language"
  >
    <option value="en">English</option>
    <option value="hi">हिन्दी</option>
    <option value="kn">ಕನ್ನಡ</option>
  </select>
</div>

</header>


      <main className="container">
        
<section className="hero" id="home">
  <p className="tagline">{t.tagline}</p>
  <h1>{t.heroTitle}</h1>
  <p>{t.heroText}</p>
  <a href="#estimator" className="button">
    {t.calculate}
  </a>
</section>


        <section className="features">
          <article className="card">
            <div className="emoji">📸</div>
            <h3>{t.identifyWaste}</h3>
            <p>{t.identifyWasteText}</p>
          </article>

          <article className="card">
            <div className="emoji">💰</div>
            <h3>{t.estimateEarnings}</h3>
            <p>{t.estimateEarningsText}</p>
          </article>

          <article className="card">
            <div className="emoji">🚚</div>
            <h3>{t.findRecycler}</h3>
            <p>{t.findRecyclerText}</p>
          </article>
        </section>

        <section className="photo-upload" id="photo-upload">
  <h2>📸 {t.photoTitle}</h2>
  <p>{t.photoDescription}</p>

  <input
    type="file"
    accept="image/*"
    onChange={handlePhotoChange}
  />

  
{photo && (
  <div className="photo-preview">
    <img src={photo} alt={t.selectedWaste} />

    <label htmlFor="identifiedMaterial">
  {t.selectMaterial}
</label>

    <select
      id="identifiedMaterial"
      value={identifiedMaterial}
      onChange={(event) => setIdentifiedMaterial(event.target.value)}
    >
      <option value="">{t.chooseMaterial}</option>
      <option value="Plastic">{t.plastic} — ₹15/kg</option>
      <option value="Paper">{t.paper} — ₹12/kg</option>
      <option value="Metal">{t.metal} — ₹35/kg</option>
      <option value="E-waste">{t.ewaste} — ₹80/kg</option>
    </select>

    <button
      type="button"
      disabled={!identifiedMaterial}
      onClick={() => {
        addScrapItem()
        setScrapItems((items) => {
          const updatedItems = [...items]
          const newItem = updatedItems[updatedItems.length - 1]
          return updatedItems.map((item) =>
            item.id === newItem.id
              ? { ...item, material: identifiedMaterial }
              : item
          )
        })
        document.getElementById('estimator')?.scrollIntoView({
          behavior: 'smooth',
        })
      }}
    >
      {t.addIdentifiedMaterial}
    </button>
  </div>
)}

</section>
        
<section className="estimator" id="estimator">
  <h2>{t.estimatorTitle}</h2>
  <p>{t.estimatorDescription}</p>

  {scrapItems.map((item) => (
    <div className="scrap-item" key={item.id}>
      <label>{t.materialType}</label>
      <select
        value={item.material}
        onChange={(event) =>
          updateScrapItem(item.id, 'material', event.target.value)
        }
      >
        <option value="Plastic">Plastic — ₹15/kg</option>
        <option value="Paper">Paper — ₹12/kg</option>
        <option value="Metal">Metal — ₹35/kg</option>
        <option value="E-waste">E-waste — ₹80/kg</option>
      </select>

      <label>{t.weight}</label>
      <input
        type="number"
        min="0.1"
        step="0.1"
        value={item.weight}
        onChange={(event) =>
          updateScrapItem(item.id, 'weight', event.target.value)
        }
      />

      <p>
        {t.itemValue}:₹
        {(rates[item.material] * Math.max(0, Number(item.weight) || 0)).toFixed(2)}
      </p>

      <button type="button" onClick={() => removeScrapItem(item.id)}>
        {t.removeItem}
      </button>
    </div>
  ))}

  <button type="button" onClick={addScrapItem}>
    + {t.addMaterial}
  </button>

  <div className="result">
    <p>{t.totalEstimated}</p>
    <h3>₹{totalValue.toFixed(2)}</h3>
    <small>{t.demoRates}</small>
  </div>
</section>
<RecyclerComparison
  onSelectRecycler={setSelectedRecycler}
  language={language}
/>



<section className="pickup-form" id="pickup">
  <h2>🚚 {t.pickupTitle}</h2>
  <p>{t.pickupDescription}</p>

  {selectedRecycler && (
    <div className="selected-recycler-summary">
      <h3>♻️ {t.selectedRecycler}</h3>
      <p><strong>{t.name}:</strong> {selectedRecycler.name}</p>
      <p><strong>{t.material}:</strong> {selectedRecycler.material}</p>
      <p><strong>{t.weightLabel}:</strong> {selectedRecycler.weight} kg</p>
      <p><strong>{t.rate}:</strong> ₹{selectedRecycler.rate}/kg</p>
      <p>
        <strong>{t.estimatedPayment}:</strong> ₹
        {selectedRecycler.estimatedPayment.toFixed(2)}
      </p>
      <p><strong>{t.distance}:</strong> {selectedRecycler.distanceKm} km</p>
      <p>
        <strong>{t.pickupEstimate}:</strong> {selectedRecycler.pickupMinutes} min
      </p>
    </div>
  )}

  <form
    onSubmit={(event) => {
      event.preventDefault()

      const newRequest = {
        id: Date.now(),
        name: event.target.customerName.value,
        phone: event.target.customerPhone.value,
        address: event.target.customerAddress.value,
        date: event.target.pickupDate.value,
        status: 'Pending',
        recycler: selectedRecycler,
        scrapItems: scrapItems.map((item) => ({
          ...item,
          weight: Number(item.weight) || 0,
        })),
        estimatedTotal: totalValue,
        receiptDate: new Date().toISOString(),
      }

      setPickupRequests((requests) => [...requests, newRequest])
      setPickupDetails(newRequest)
      setPickupMessage(t.pickupSuccess)
      event.target.reset()
    }}
  >
    <label htmlFor="customerName">{t.yourName}</label>
    <input
      id="customerName"
      type="text"
      placeholder={t.enterName}
      required
    />

    <label htmlFor="customerPhone">{t.phoneNumber}</label>
    <input
      id="customerPhone"
      type="tel"
      placeholder={t.enterPhone}
      pattern="[0-9]{10}"
      title={t.phoneValidation}
      required
    />

    <label htmlFor="customerAddress">{t.pickupAddress}</label>
    <textarea
      id="customerAddress"
      placeholder={t.enterAddress}
      rows="3"
      required
    />

    <label htmlFor="pickupDate">{t.preferredDate}</label>
    <input
      id="pickupDate"
      type="date"
      min={new Date().toLocaleDateString('en-CA')}
      required
    />

    <button type="submit">{t.submitPickup}</button>
  </form>

  {pickupMessage && (
    <p className="pickup-success">✅ {pickupMessage}</p>
  )}
</section>

{pickupDetails && (
  <section className="pickup-confirmation">
    <h2>🎉 {t.confirmationTitle}</h2>
    <p>{pickupMessage}</p>

    <div className="confirmation-details">
      <p><strong>{t.name}:</strong> {pickupDetails.name}</p>
      <p><strong>{t.phone}:</strong> {pickupDetails.phone}</p>
      <p><strong>{t.address}:</strong> {pickupDetails.address}</p>
      <p>
        <strong>{t.pickupDateLabel}:</strong> {pickupDetails.date}
      </p>
    </div>

    <div className="digital-receipt" id="digital-receipt">
      <h2>♻️ {t.receiptTitle}</h2>

      <p>
        <strong>{t.receiptId}:</strong> KC-{pickupDetails.id}
      </p>

      <p>
        <strong>{t.receiptDate}:</strong>{' '}
        {new Date(pickupDetails.receiptDate).toLocaleString()}
      </p>

      <hr />

      <h3>{t.customerDetails}</h3>
      <p><strong>{t.name}:</strong> {pickupDetails.name}</p>
      <p><strong>{t.phone}:</strong> {pickupDetails.phone}</p>
      <p><strong>{t.address}:</strong> {pickupDetails.address}</p>
      <p>
        <strong>{t.pickupDateLabel}:</strong> {pickupDetails.date}
      </p>

      <hr />

      <h3>{t.scrapDetails}</h3>

      {pickupDetails.scrapItems.map((item) => (
        <div key={item.id}>
          <p><strong>{t.material}:</strong> {item.material}</p>
          <p><strong>{t.weightLabel}:</strong> {item.weight} kg</p>
        </div>
      ))}

      <h3>
        {t.estimatedTotalReceipt}: ₹
        {pickupDetails.estimatedTotal.toFixed(2)}
      </h3>

      {pickupDetails.recycler && (
        <p>
          <strong>{t.selectedRecyclerReceipt}:</strong>{' '}
          {pickupDetails.recycler.name}
        </p>
      )}

      <p>
        <em>{t.receiptDisclaimer}</em>
      </p>

      <div className="receipt-actions">
        <button
          type="button"
          onClick={() => window.print()}
        >
          🖨️ {t.printReceipt}
        </button>

        <button
          type="button"
          onClick={() => window.print()}
        >
          📄 {t.savePdf}
        </button>
      </div>
    </div>
  </section>
)}


<section className="request-dashboard">
  <h2>📊 {t.dashboardTitle}</h2>
  <p>{t.dashboardDescription}</p>

  <div className="dashboard-cards">
    <div className="dashboard-card total-card">
      <span>{t.totalRequests}</span>
      <h3>{pickupRequests.length}</h3>
    </div>

    <div className="dashboard-card pending-card">
      <span>{t.pendingRequests}</span>
      <h3>
        {pickupRequests.filter(
          (request) => request.status === 'Pending'
        ).length}
      </h3>
    </div>

    <div className="dashboard-card cancelled-card">
      <span>{t.cancelledRequests}</span>
      <h3>
        {pickupRequests.filter(
          (request) => request.status === 'Cancelled'
        ).length}
      </h3>
    </div>

    <div className="dashboard-card completed-card">
      <span>{t.completedRequests}</span>
      <h3>
        {pickupRequests.filter(
          (request) => request.status === 'Completed'
        ).length}
      </h3>
    </div>
  </div>
</section>

<section className="my-requests">
  <h2>📋 {t.myRequests}</h2>
  <p>{t.myRequestsDescription}</p>

  <div className="request-search">
    <label htmlFor="requestSearch">{t.searchRequests}:</label>
    <input
      id="requestSearch"
      type="text"
      placeholder={t.searchPlaceholder}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  </div>

  <div className="request-filters">
    <label htmlFor="statusFilter">{t.filterStatus}:</label>
    <select
      id="statusFilter"
      value={statusFilter}
      onChange={(event) => setStatusFilter(event.target.value)}
    >
      <option value="All">{t.allRequests}</option>
      <option value="Pending">{t.pendingRequests}</option>
      <option value="Cancelled">{t.cancelledRequests}</option>
      <option value="Completed">{t.completedRequests}</option>
    </select>
  </div>

  {filteredRequests.length === 0 ? (
    <p>{t.noRequests}</p>
  ) : (
    filteredRequests.map((request) => (
      <div className="request-card" key={request.id}>
        <h3>
          {t.requestNumber} #{request.id}
        </h3>

        <p>
          <strong>{t.name}:</strong> {request.name}
        </p>

        <p>
          <strong>{t.pickupDateLabel}:</strong> {request.date}
        </p>

        {request.recycler && (
          <div className="request-recycler-details">
            <p>
              <strong>{t.selectedRecyclerReceipt}:</strong>{' '}
              {request.recycler.name}
            </p>

            <p>
              <strong>{t.material}:</strong> {request.recycler.material}
            </p>

            <p>
              <strong>{t.weightLabel}:</strong> {request.recycler.weight} kg
            </p>

            <p>
              <strong>{t.estimatedPayment}:</strong> ₹
              {request.recycler.estimatedPayment.toFixed(2)}
            </p>
          </div>
        )}

        <p>
          <strong>{t.status}:</strong>{' '}
          <span className="pending-status">
            {request.status === 'Pending'
              ? t.pendingRequests
              : request.status === 'Cancelled'
                ? t.cancelledRequests
                : t.completedRequests}
          </span>
        </p>

        {request.status === 'Pending' && (
          <>
            <button
              type="button"
              className="cancel-request"
              onClick={() => {
                setPickupRequests((requests) =>
                  requests.map((item) =>
                    item.id === request.id
                      ? { ...item, status: 'Cancelled' }
                      : item
                  )
                )
              }}
            >
              {t.cancelRequest}
            </button>

            <button
              type="button"
              className="complete-request"
              onClick={() => {
                setPickupRequests((requests) =>
                  requests.map((item) =>
                    item.id === request.id
                      ? { ...item, status: 'Completed' }
                      : item
                  )
                )
              }}
            >
              ✓ {t.markCompleted}
            </button>
          </>
        )}
      </div>
    ))
  )}
</section>


```jsx
<section className="recyclers-section" id="recyclers">
  <h2>♻️ {t.recyclersTitle}</h2>
  <p>{t.recyclersDescription}</p>

  <div className="recycler-search">
    <input
      type="text"
      placeholder={t.searchAreaPlaceholder}
      aria-label={t.searchAreaPlaceholder}
      value={recyclerSearch}
      onChange={(event) => setRecyclerSearch(event.target.value)}
    />

    <button type="button">
      🔍 {t.searchRecyclers}
    </button>
  </div>

  <div className="recycler-grid">
    {filteredRecyclers.length === 0 ? (
      <p>{t.noRecyclers}</p>
    ) : (
      filteredRecyclers.map((recycler) => (
        <div className="recycler-card" key={recycler.id}>
          <h3>{recycler.name}</h3>

          <p>
            <strong>{t.materialsLabel}:</strong> {recycler.materials}
          </p>

          <p>
            <strong>{t.locationLabel}:</strong> {recycler.location}
          </p>

          <p>
            <strong>{t.contactLabel}:</strong> {recycler.contact}
          </p>

          <a
            href={`tel:${recycler.phone}`}
            className="recycler-contact-btn"
          >
            📞 {t.contactRecycler}
          </a>

          <span className="recycler-note">{t.demoListing}</span>
        </div>
      ))
    )}
  </div>
</section>
```

        <footer>
          <p>♻️ Kabadiwala Connect — Waste less, recycle more.</p>
        </footer>
      </main>
    </div>
  )
}

export default App