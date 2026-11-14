// Common Indian kirana items for quick-add.
// Row: [english/hinglish, hindi, marathi, emoji, category, unit, default max, extra search words]
// Units are kept coarse (packet/pcs) for small items so the +/- buttons stay useful.
// Emoji are limited to Unicode ≤ 14 so they render on older Android phones.
const ROWS = [
  // Sabzi
  ['Onion', 'प्याज़', 'कांदा', '🧅', 'Vegetables', 'kg', 5, 'pyaz kanda'],
  ['Potato', 'आलू', 'बटाटा', '🥔', 'Vegetables', 'kg', 5, 'aloo batata'],
  ['Tomato', 'टमाटर', 'टोमॅटो', '🍅', 'Vegetables', 'kg', 2, 'tamatar'],
  ['Garlic', 'लहसुन', 'लसूण', '🧄', 'Vegetables', 'pcs', 6, 'lehsun lasun'],
  ['Ginger', 'अदरक', 'आलं', '🌿', 'Vegetables', 'pcs', 3, 'adrak ala'],
  ['Green Chilli', 'हरी मिर्च', 'हिरवी मिरची', '🌶️', 'Vegetables', 'packet', 2, 'hari mirchi'],
  ['Coriander', 'हरा धनिया', 'कोथिंबीर', '🌿', 'Vegetables', 'pcs', 2, 'dhaniya kothimbir cilantro'],
  ['Mint', 'पुदीना', 'पुदिना', '🌿', 'Vegetables', 'pcs', 1, 'pudina'],
  ['Curry Leaves', 'करी पत्ता', 'कढीपत्ता', '🍃', 'Vegetables', 'pcs', 1, 'kadipatta'],
  ['Lemon', 'नींबू', 'लिंबू', '🍋', 'Vegetables', 'pcs', 6, 'nimbu limbu'],
  ['Cauliflower', 'फूलगोभी', 'फ्लॉवर', '🥦', 'Vegetables', 'pcs', 1, 'gobi phool gobhi'],
  ['Cabbage', 'पत्तागोभी', 'कोबी', '🥬', 'Vegetables', 'pcs', 1, 'patta gobhi kobi'],
  ['Brinjal', 'बैंगन', 'वांगी', '🍆', 'Vegetables', 'kg', 1, 'baingan vangi eggplant'],
  ['Bhindi', 'भिंडी', 'भेंडी', '🥒', 'Vegetables', 'kg', 1, 'okra lady finger'],
  ['Carrot', 'गाजर', 'गाजर', '🥕', 'Vegetables', 'kg', 1, 'gajar'],
  ['Cucumber', 'खीरा', 'काकडी', '🥒', 'Vegetables', 'kg', 1, 'kheera kakdi'],
  ['Spinach', 'पालक', 'पालक', '🥬', 'Vegetables', 'pcs', 2, 'palak'],
  ['Methi', 'मेथी', 'मेथी', '🥬', 'Vegetables', 'pcs', 2, 'fenugreek leaves'],
  ['Capsicum', 'शिमला मिर्च', 'ढोबळी मिरची', '🫑', 'Vegetables', 'kg', 1, 'shimla mirch bell pepper'],
  ['Green Peas', 'मटर', 'मटार', '🌱', 'Vegetables', 'kg', 1, 'matar'],
  ['French Beans', 'फ्रेंच बीन्स', 'फरसबी', '🌱', 'Vegetables', 'kg', 1, 'beans farasbi'],
  ['Lauki', 'लौकी', 'दुधी भोपळा', '🥒', 'Vegetables', 'pcs', 1, 'bottle gourd dudhi ghiya'],
  ['Pumpkin', 'कद्दू', 'लाल भोपळा', '🎃', 'Vegetables', 'kg', 1, 'kaddu bhopla'],
  ['Sweet Potato', 'शकरकंद', 'रताळे', '🍠', 'Vegetables', 'kg', 1, 'shakarkand ratale'],
  ['Corn', 'भुट्टा', 'मका', '🌽', 'Vegetables', 'pcs', 2, 'bhutta makka'],
  ['Mushroom', 'मशरूम', 'मशरूम', '🍄', 'Vegetables', 'packet', 1, ''],

  // Phal
  ['Banana', 'केला', 'केळी', '🍌', 'Fruits', 'dozen', 1, 'kela keli'],
  ['Apple', 'सेब', 'सफरचंद', '🍎', 'Fruits', 'kg', 1, 'seb'],
  ['Mango', 'आम', 'आंबा', '🥭', 'Fruits', 'dozen', 1, 'aam amba hapus alphonso'],
  ['Grapes', 'अंगूर', 'द्राक्षे', '🍇', 'Fruits', 'kg', 1, 'angoor draksha'],
  ['Orange', 'संतरा', 'संत्री', '🍊', 'Fruits', 'kg', 1, 'santra'],
  ['Watermelon', 'तरबूज', 'कलिंगड', '🍉', 'Fruits', 'pcs', 1, 'tarbooj kalingad'],
  ['Papaya', 'पपीता', 'पपई', '🍈', 'Fruits', 'pcs', 1, 'papita'],
  ['Pomegranate', 'अनार', 'डाळिंब', '🍎', 'Fruits', 'kg', 1, 'anar dalimb'],
  ['Guava', 'अमरूद', 'पेरू', '🍐', 'Fruits', 'kg', 1, 'amrood peru'],
  ['Chikoo', 'चीकू', 'चिकू', '🥝', 'Fruits', 'kg', 1, 'sapota'],
  ['Pineapple', 'अनानास', 'अननस', '🍍', 'Fruits', 'pcs', 1, 'ananas'],
  ['Coconut', 'नारियल', 'नारळ', '🥥', 'Fruits', 'pcs', 2, 'nariyal naral'],

  // Dairy, bread & eggs
  ['Milk', 'दूध', 'दूध', '🥛', 'Dairy', 'litre', 2, 'doodh dudh'],
  ['Curd', 'दही', 'दही', '🥣', 'Dairy', 'packet', 2, 'dahi yogurt'],
  ['Paneer', 'पनीर', 'पनीर', '🧀', 'Dairy', 'packet', 1, 'cottage cheese'],
  ['Butter', 'मक्खन', 'बटर', '🧈', 'Dairy', 'packet', 1, 'makhan loni'],
  ['Cheese', 'चीज़', 'चीज', '🧀', 'Dairy', 'packet', 1, ''],
  ['Buttermilk', 'छाछ', 'ताक', '🥛', 'Dairy', 'packet', 2, 'chaas taak mattha'],
  ['Eggs', 'अंडे', 'अंडी', '🥚', 'Dairy', 'dozen', 1, 'anda andi'],
  ['Bread', 'ब्रेड', 'ब्रेड', '🍞', 'Dairy', 'packet', 1, 'pav double roti'],
  ['Pav', 'पाव', 'पाव', '🍞', 'Dairy', 'packet', 1, 'bun ladi pav'],

  // Atta, rice & staples
  ['Atta', 'आटा', 'गव्हाचे पीठ', '🫓', 'Grains', 'kg', 10, 'wheat flour gehu chapati'],
  ['Rice', 'चावल', 'तांदूळ', '🍚', 'Grains', 'kg', 10, 'chawal tandul'],
  ['Basmati Rice', 'बासमती चावल', 'बासमती तांदूळ', '🍚', 'Grains', 'kg', 5, 'chawal'],
  ['Besan', 'बेसन', 'बेसन', '🌾', 'Grains', 'kg', 1, 'gram flour'],
  ['Sooji / Rava', 'सूजी', 'रवा', '🌾', 'Grains', 'kg', 1, 'semolina suji rawa'],
  ['Maida', 'मैदा', 'मैदा', '🌾', 'Grains', 'kg', 1, 'all purpose flour'],
  ['Poha', 'पोहा', 'पोहे', '🌾', 'Grains', 'kg', 1, 'flattened rice chivda'],
  ['Jowar Atta', 'ज्वार का आटा', 'ज्वारीचे पीठ', '🫓', 'Grains', 'kg', 2, 'jowari bhakri'],
  ['Bajra Atta', 'बाजरे का आटा', 'बाजरीचे पीठ', '🫓', 'Grains', 'kg', 2, 'bajri bhakri'],
  ['Rice Flour', 'चावल का आटा', 'तांदळाचे पीठ', '🌾', 'Grains', 'kg', 1, 'tandul pith'],
  ['Sabudana', 'साबूदाना', 'साबुदाणा', '🌾', 'Grains', 'kg', 1, 'sago tapioca'],
  ['Dalia', 'दलिया', 'दलिया', '🥣', 'Grains', 'kg', 1, 'broken wheat'],
  ['Oats', 'ओट्स', 'ओट्स', '🥣', 'Grains', 'packet', 1, ''],
  ['Vermicelli', 'सेवइयाँ', 'शेवया', '🍜', 'Grains', 'packet', 1, 'seviyan shevaya'],
  ['Murmura', 'मुरमुरे', 'कुरमुरे', '🍚', 'Grains', 'packet', 1, 'puffed rice kurmure'],
  ['Sugar', 'चीनी', 'साखर', '🍬', 'Grains', 'kg', 5, 'cheeni shakkar sakhar'],
  ['Jaggery', 'गुड़', 'गूळ', '🍯', 'Grains', 'kg', 1, 'gud gul'],
  ['Honey', 'शहद', 'मध', '🍯', 'Grains', 'pcs', 1, 'shahad'],

  // Dal & pulses
  ['Toor Dal', 'तुअर दाल', 'तूर डाळ', '🫘', 'Pulses', 'kg', 2, 'arhar tuvar dal'],
  ['Moong Dal', 'मूंग दाल', 'मूग डाळ', '🫘', 'Pulses', 'kg', 1, 'mung'],
  ['Masoor Dal', 'मसूर दाल', 'मसूर डाळ', '🫘', 'Pulses', 'kg', 1, 'red lentil'],
  ['Chana Dal', 'चना दाल', 'चणा डाळ', '🫘', 'Pulses', 'kg', 1, 'harbhara'],
  ['Urad Dal', 'उड़द दाल', 'उडीद डाळ', '🫘', 'Pulses', 'kg', 1, 'udid'],
  ['Rajma', 'राजमा', 'राजमा', '🫘', 'Pulses', 'kg', 1, 'kidney beans'],
  ['Kabuli Chana', 'काबुली चना', 'काबुली चणे', '🫘', 'Pulses', 'kg', 1, 'chole chickpeas chhole'],
  ['Kala Chana', 'काला चना', 'काळे चणे', '🫘', 'Pulses', 'kg', 1, 'black chickpeas'],
  ['Whole Moong', 'साबुत मूंग', 'मूग', '🫘', 'Pulses', 'kg', 1, 'green gram sabut'],
  ['Matki', 'मोठ', 'मटकी', '🫘', 'Pulses', 'kg', 1, 'moth beans'],
  ['Chawli', 'लोबिया', 'चवळी', '🫘', 'Pulses', 'kg', 1, 'lobia black eyed beans'],
  ['Peanuts', 'मूंगफली', 'शेंगदाणे', '🥜', 'Pulses', 'kg', 1, 'moongfali shengdane groundnut'],

  // Masala
  ['Haldi', 'हल्दी', 'हळद', '🫙', 'Spices', 'packet', 1, 'turmeric halad'],
  ['Red Chilli Powder', 'लाल मिर्च पाउडर', 'लाल तिखट', '🌶️', 'Spices', 'packet', 1, 'mirchi tikhat'],
  ['Dhaniya Powder', 'धनिया पाउडर', 'धणे पूड', '🫙', 'Spices', 'packet', 1, 'coriander powder'],
  ['Jeera', 'जीरा', 'जिरे', '🫙', 'Spices', 'packet', 1, 'cumin jire'],
  ['Rai / Mustard Seeds', 'राई', 'मोहरी', '🫙', 'Spices', 'packet', 1, 'sarson mohari'],
  ['Garam Masala', 'गरम मसाला', 'गरम मसाला', '🫙', 'Spices', 'packet', 1, ''],
  ['Goda Masala', 'गोडा मसाला', 'गोडा मसाला', '🫙', 'Spices', 'packet', 1, 'kala masala'],
  ['Kanda Lasun Masala', 'कांदा लसूण मसाला', 'कांदा लसूण मसाला', '🌶️', 'Spices', 'packet', 1, ''],
  ['Pav Bhaji Masala', 'पाव भाजी मसाला', 'पावभाजी मसाला', '🫙', 'Spices', 'packet', 1, ''],
  ['Sambar Masala', 'सांभर मसाला', 'सांबार मसाला', '🫙', 'Spices', 'packet', 1, ''],
  ['Hing', 'हींग', 'हिंग', '🫙', 'Spices', 'packet', 1, 'asafoetida'],
  ['Salt', 'नमक', 'मीठ', '🧂', 'Spices', 'kg', 1, 'namak meeth'],
  ['Black Pepper', 'काली मिर्च', 'मिरी', '🫙', 'Spices', 'packet', 1, 'kali mirch miri'],
  ['Cloves', 'लौंग', 'लवंग', '🫙', 'Spices', 'packet', 1, 'laung lavang'],
  ['Elaichi', 'इलायची', 'वेलची', '🫙', 'Spices', 'packet', 1, 'cardamom velchi'],
  ['Dalchini', 'दालचीनी', 'दालचिनी', '🫙', 'Spices', 'packet', 1, 'cinnamon'],
  ['Methi Dana', 'मेथी दाना', 'मेथी दाणे', '🫙', 'Spices', 'packet', 1, 'fenugreek seeds'],
  ['Ajwain', 'अजवाइन', 'ओवा', '🫙', 'Spices', 'packet', 1, 'carom ova'],
  ['Kasuri Methi', 'कसूरी मेथी', 'कसुरी मेथी', '🍃', 'Spices', 'packet', 1, 'dried fenugreek'],
  ['Imli', 'इमली', 'चिंच', '🫙', 'Spices', 'packet', 1, 'tamarind chinch'],

  // Oil & ghee
  ['Sunflower Oil', 'सूरजमुखी तेल', 'सूर्यफूल तेल', '🌻', 'Oil', 'litre', 5, 'tel'],
  ['Groundnut Oil', 'मूंगफली तेल', 'शेंगदाणा तेल', '🥜', 'Oil', 'litre', 5, 'peanut oil tel'],
  ['Mustard Oil', 'सरसों का तेल', 'मोहरीचे तेल', '🫗', 'Oil', 'litre', 2, 'sarson tel'],
  ['Soybean Oil', 'सोयाबीन तेल', 'सोयाबीन तेल', '🫗', 'Oil', 'litre', 5, 'tel'],
  ['Coconut Oil', 'नारियल तेल', 'खोबरेल तेल', '🥥', 'Oil', 'pcs', 1, 'nariyal tel khobrel'],
  ['Ghee', 'घी', 'तूप', '🧈', 'Oil', 'pcs', 1, 'tup clarified butter'],

  // Namkeen & snacks
  ['Biscuits', 'बिस्कुट', 'बिस्किटे', '🍪', 'Snacks', 'packet', 4, 'biscuit cookies'],
  ['Namkeen', 'नमकीन', 'फरसाण', '🥨', 'Snacks', 'packet', 2, 'farsan mixture'],
  ['Chivda', 'चिवड़ा', 'चिवडा', '🥨', 'Snacks', 'packet', 1, 'chiwda'],
  ['Sev / Bhujia', 'भुजिया', 'शेव', '🥨', 'Snacks', 'packet', 1, 'sev bhujia'],
  ['Chips', 'चिप्स', 'चिप्स', '🍟', 'Snacks', 'packet', 2, 'wafers'],
  ['Khakhra', 'खाखरा', 'खाकरा', '🫓', 'Snacks', 'packet', 1, ''],
  ['Rusk / Toast', 'रस्क', 'टोस्ट', '🍞', 'Snacks', 'packet', 1, 'rusk toast'],
  ['Noodles', 'नूडल्स', 'नूडल्स', '🍜', 'Snacks', 'packet', 4, 'instant noodles'],
  ['Papad', 'पापड़', 'पापड', '🫓', 'Snacks', 'packet', 1, 'papadum'],
  ['Pickle', 'अचार', 'लोणचे', '🫙', 'Snacks', 'pcs', 1, 'achar lonche'],
  ['Kaju', 'काजू', 'काजू', '🥜', 'Snacks', 'packet', 1, 'cashew dry fruits'],
  ['Badam', 'बादाम', 'बदाम', '🌰', 'Snacks', 'packet', 1, 'almonds dry fruits'],
  ['Kishmish', 'किशमिश', 'मनुका', '🍇', 'Snacks', 'packet', 1, 'raisins manuka dry fruits'],
  ['Chocolate', 'चॉकलेट', 'चॉकलेट', '🍫', 'Snacks', 'pcs', 2, ''],
  ['Ketchup', 'सॉस', 'सॉस', '🍅', 'Snacks', 'pcs', 1, 'sauce tomato ketchup'],
  ['Jam', 'जैम', 'जॅम', '🍓', 'Snacks', 'pcs', 1, ''],

  // Chai & beverages
  ['Chai Patti', 'चाय पत्ती', 'चहा पावडर', '🍵', 'Beverages', 'packet', 1, 'tea leaves chaha'],
  ['Coffee', 'कॉफ़ी', 'कॉफी', '☕', 'Beverages', 'packet', 1, ''],
  ['Health Drink', 'हेल्थ ड्रिंक', 'हेल्थ ड्रिंक', '🥛', 'Beverages', 'pcs', 1, 'malt chocolate drink'],
  ['Cold Drink', 'कोल्ड ड्रिंक', 'कोल्ड्रिंक', '🥤', 'Beverages', 'pcs', 2, 'soft drink soda'],
  ['Juice', 'जूस', 'ज्यूस', '🧃', 'Beverages', 'pcs', 2, ''],
  ['Sharbat', 'शरबत', 'सरबत', '🍹', 'Beverages', 'pcs', 1, 'syrup sarbat'],
  ['Water Can', 'पानी का कैन', 'पाण्याचा कॅन', '💧', 'Beverages', 'pcs', 1, 'drinking water jar pani'],

  // Pooja samagri
  ['Agarbatti', 'अगरबत्ती', 'उदबत्ती', '🪔', 'Pooja', 'packet', 1, 'incense sticks udbatti'],
  ['Dhoop', 'धूप', 'धूप', '🪔', 'Pooja', 'packet', 1, 'dhoop sticks'],
  ['Kapur', 'कपूर', 'कापूर', '🔥', 'Pooja', 'packet', 1, 'camphor'],
  ['Diya Batti', 'बाती', 'वाती', '🪔', 'Pooja', 'packet', 1, 'cotton wicks vati'],
  ['Flowers', 'फूल', 'फुले', '🌼', 'Pooja', 'packet', 1, 'phool phule haar'],
  ['Kumkum', 'कुमकुम', 'कुंकू', '🔴', 'Pooja', 'packet', 1, 'sindoor kunku roli'],
  ['Matchbox', 'माचिस', 'काडेपेटी', '🔥', 'Pooja', 'packet', 1, 'machis kadepeti'],

  // Cleaning & household
  ['Detergent', 'डिटर्जेंट पाउडर', 'डिटर्जंट पावडर', '🫧', 'Cleaning', 'kg', 2, 'washing powder kapde'],
  ['Dishwash', 'बर्तन धोने का साबुन', 'भांडी धुण्याचा साबण', '🧽', 'Cleaning', 'pcs', 2, 'bartan bhandi dish bar liquid'],
  ['Scrubber', 'स्क्रबर', 'घासणी', '🧽', 'Cleaning', 'pcs', 2, 'ghasni steel wool'],
  ['Bath Soap', 'नहाने का साबुन', 'आंघोळीचा साबण', '🧼', 'Cleaning', 'pcs', 4, 'sabun saban'],
  ['Shampoo', 'शैम्पू', 'शॅम्पू', '🧴', 'Cleaning', 'pcs', 1, ''],
  ['Hair Oil', 'बालों का तेल', 'केसांचे तेल', '🧴', 'Cleaning', 'pcs', 1, 'tel'],
  ['Toothpaste', 'टूथपेस्ट', 'टूथपेस्ट', '🪥', 'Cleaning', 'pcs', 1, 'manjan'],
  ['Floor Cleaner', 'फ़र्श क्लीनर', 'फरशी क्लीनर', '🪣', 'Cleaning', 'pcs', 1, 'phenyl farshi pocha'],
  ['Toilet Cleaner', 'टॉयलेट क्लीनर', 'टॉयलेट क्लीनर', '🚽', 'Cleaning', 'pcs', 1, ''],
  ['Broom', 'झाड़ू', 'झाडू', '🧹', 'Cleaning', 'pcs', 1, 'jhadu'],
  ['Garbage Bags', 'कचरा थैली', 'कचऱ्याच्या पिशव्या', '🗑️', 'Cleaning', 'packet', 1, 'kachra dustbin bags'],
  ['Tissue Paper', 'टिशू पेपर', 'टिश्यू पेपर', '🧻', 'Cleaning', 'packet', 1, 'napkin toilet paper'],

  // Other
  ['Gas Cylinder', 'गैस सिलेंडर', 'गॅस सिलेंडर', '🔥', 'Other', 'pcs', 1, 'lpg gas'],
]

export const CATALOG = ROWS.map(([en, hi, mr, emoji, category, unit, max, words]) => ({
  names: { en, hi, mr },
  emoji,
  category,
  unit,
  max,
  search: `${en} ${hi} ${mr} ${words}`.toLowerCase(),
}))

export function itemName(item, lang) {
  return item.names[lang] ?? item.names.en
}

// Matches English/Hinglish, Hindi or Marathi spelling. Hides items the family already has.
export function searchCatalog(query, { category, exclude = [] } = {}) {
  const q = query.trim().toLowerCase()
  const have = new Set(exclude.map((n) => n.trim().toLowerCase()))
  return CATALOG.filter(
    (item) =>
      (q ? item.search.includes(q) : !category || item.category === category) &&
      !Object.values(item.names).some((n) => have.has(n.toLowerCase())),
  )
}

// Emoji grid for the picker: one tile per distinct emoji, labelled with the items that use it.
export const KIRANA_EMOJIS = [...new Set(CATALOG.map((i) => i.emoji))].map((emoji) => ({
  emoji,
  items: CATALOG.filter((i) => i.emoji === emoji),
}))
