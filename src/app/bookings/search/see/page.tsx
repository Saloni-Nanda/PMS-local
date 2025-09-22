export default function Page() {
  return (
    <div className="p-6 bg-white">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Booking Info</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Row 1 */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Booking Number</label>
          <input
            type="text"
            placeholder="MX120043-W2200002"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Benjamin Bravo Lopez"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Email</label>
          <input
            type="email"
            placeholder="juanitaolveragomez@gmail.com"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        {/* Row 2 */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Phone</label>
          <input
            type="text"
            placeholder="4775809876"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Arrival Date</label>
          <input
            type="text"
            placeholder="17/03/2022"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Departure Date</label>
          <input
            type="text"
            placeholder="18/03/2022"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        {/* Row 3 */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Status</label>
          <input
            type="text"
            placeholder="Nueva"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Total Without Taxes</label>
          <input
            type="text"
            placeholder="85"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Total Taxes Included</label>
          <input
            type="text"
            placeholder="1"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        {/* Row 4 */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Rate Plan</label>
          <input
            type="text"
            placeholder="RACK"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Promo Code</label>
          <input
            type="text"
            placeholder=""
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Requests</label>
          <input
            type="text"
            placeholder=""
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        {/* Row 5 */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Notes</label>
          <input
            type="text"
            placeholder=""
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Description</label>
          <input
            type="text"
            placeholder="DOBLE"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Number of Rooms</label>
          <input
            type="text"
            placeholder="1"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        {/* Row 6 */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Adults</label>
          <input
            type="text"
            placeholder="2"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Children</label>
          <input
            type="text"
            placeholder="0"
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Card Type</label>
          <input
            type="text"
            placeholder=""
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        {/* Row 7 */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Name</label>
          <input
            type="text"
            placeholder=""
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Credit Card Number</label>
          <input
            type="text"
            placeholder=""
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Exp. Date</label>
          <input
            type="text"
            placeholder=""
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        {/* Row 8 */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Code</label>
          <input
            type="text"
            placeholder=""
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-2">Agency</label>
          <input
            type="text"
            placeholder=""
            className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
          />
        </div>
        
        <div>
          {/* Empty cell to maintain grid structure */}
        </div>
      </div>
    </div>
  );
}