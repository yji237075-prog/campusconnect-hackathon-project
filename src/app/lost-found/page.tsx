import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Phone, Plus, X } from 'lucide-react';

interface LostItem {
  id: number;
  name: string;
  location: string;
  date: string;
  contact: string;
  image: string;
}

const LostFound = () => {
  const { isDark } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    reporterName: '',
    contact: '',
    itemName: '',
    location: '',
    date: '',
    notes: '',
  });
  const [items, setItems] = useState<LostItem[]>([
    {
      id: 1,
      name: 'Blue Water Bottle',
      location: 'Library - 2nd Floor',
      date: '2025-01-12',
      contact: 'Campus Reception: +91-9876543210',
      image: 'https://raw.githubusercontent.com/abhinav2006parihar-cloud/image/refs/heads/main/water%20bottle1.jpeg',
    },
    {
      id: 2,
      name: 'Scientific Calculator',
      location: 'Computer Lab - Block A',
      date: '2025-01-11',
      contact: 'Campus Reception: +91-9876543210',
      image: 'https://raw.githubusercontent.com/abhinav2006parihar-cloud/image/refs/heads/main/sc.jpg',
    },
    {
      id: 3,
      name: 'Red Backpack',
      location: 'Cafeteria',
      date: '2025-01-10',
      contact: 'Campus Reception: +91-9876543210',
      image: 'https://raw.githubusercontent.com/abhinav2006parihar-cloud/image/refs/heads/main/red%20bag1.jpeg',
    },
    {
      id: 4,
      name: 'Black Umbrella',
      location: 'Main Entrance',
      date: '2025-01-09',
      contact: 'Campus Reception: +91-9876543210',
      image: 'https://raw.githubusercontent.com/abhinav2006parihar-cloud/image/refs/heads/main/black%20umbrella.jpeg',
    },
    {
      id: 5,
      name: 'Student ID Card',
      location: 'Sports Complex',
      date: '2025-01-08',
      contact: 'Campus Reception: +91-9876543210',
      image: 'https://raw.githubusercontent.com/abhinav2006parihar-cloud/image/refs/heads/main/id%20card.jpeg',
    },
  ]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: LostItem = {
      id: items.length + 1,
      name: formData.itemName,
      location: formData.location,
      date: formData.date,
      contact: formData.contact,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    };
    setItems([newItem, ...items]);
    setSuccessMessage('Item reported successfully!');
    setFormData({
      reporterName: '',
      contact: '',
      itemName: '',
      location: '',
      date: '',
      notes: '',
    });
    setTimeout(() => {
      setShowModal(false);
      setSuccessMessage('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-black pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Search className="text-pink-500" size={36} />
            <h1 className="text-pink-500 drop-shadow-[0_0_8px_#ff4d94] font-extrabold text-4xl">Lost & Found</h1>
          </div>
          <p className={${isDark ? 'text-gray-300' : 'text-gray-200'} text-lg mb-6}>Help reunite lost items with their owners</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:scale-105 transition-transform shadow-lg flex items-center space-x-2 mx-auto"
          >
            <Plus size={20} />
            <span>Report a Found Item</span>
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden hover:scale-105 transition-transform}
            >
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className={${isDark ? 'text-white' : 'text-gray-900'} text-xl font-bold mb-4}>{item.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className={${isDark ? 'text-pink-500' : 'text-pink-600'} flex-shrink-0 mt-1} size={18} />
                    <span className={${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm}>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className={${isDark ? 'text-pink-500' : 'text-pink-600'}} size={18} />
                    <span className={${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm}>{item.date}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Phone className={${isDark ? 'text-pink-500' : 'text-pink-600'} flex-shrink-0 mt-1} size={18} />
                    <span className={${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm}>{item.contact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={${isDark ? 'text-white' : 'text-gray-900'} text-2xl font-bold}>Report Found Item</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className={${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.reporterName}
                    onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                    required
                    className={w-full px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:ring-2 focus:ring-pink-500}
                  />
                </div>

                <div>
                  <label className={block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}}>
                    Your Contact
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                    className={w-full px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:ring-2 focus:ring-pink-500}
                  />
                </div>

                <div>
                  <label className={block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}}>
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    required
                    className={w-full px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:ring-2 focus:ring-pink-500}
                  />
                </div>

                <div>
                  <label className={block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}}>
                    Location Found
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className={w-full px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:ring-2 focus:ring-pink-500}
                  />
                </div>

                <div>
                  <label className={block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className={w-full px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:ring-2 focus:ring-pink-500}
                  />
                </div>

                <div>
                  <label className={block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}}>
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className={w-full px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:ring-2 focus:ring-pink-500}
                  />
                </div>

                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-sm"
                  >
                    {successMessage}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:scale-105 transition-transform"
                >
                  Submit Report
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostFound;
