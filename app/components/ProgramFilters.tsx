'use client';
interface ProgramFiltersProps {
  subcategories?: string[];
  selectedSubCategory: string;
  onSubCategoryChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
}

export default function ProgramFilters({
  subcategories,
  selectedSubCategory,
  onSubCategoryChange,
  location,
  onLocationChange,
}: ProgramFiltersProps) {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SubCategory Filter */}
        {subcategories && subcategories.length > 0 && (
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              value={selectedSubCategory}
              onChange={(e) => onSubCategoryChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Search by location..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}