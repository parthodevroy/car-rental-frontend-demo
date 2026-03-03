
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, Filter, RotateCcw, ChevronLeft, ChevronRight, Search } from "lucide-react";

const OurFleet = () => {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // --- Filtering States ---
  const [priceRange, setPriceRange] = useState(9999);
  const [mileageRange, setMileageRange] = useState(500000);
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("All Fuel Types");
  const [selectedTransmission, setSelectedTransmission] = useState("All Transmissions");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;

  useEffect(() => {
    setIsLoading(true);
    fetch("https://car-rental-server-demo.vercel.app/cars")
      .then((res) => res.json())
      .then((data) => {
        setAllCars(data);
        setFilteredCars(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let temp = [...allCars];
    
    // 1. Brand Filter
    const brand = searchParams.get('brand');
    if (brand && !["All Makes", "all makes"].includes(brand)) {
      temp = temp.filter(car => car.make?.toLowerCase() === brand.toLowerCase());
    }

    // 2. Price Filter
    temp = temp.filter(car => (car.prices?.daily || 0) <= priceRange);

    // 3. Body Type Filter
    if (selectedBodyType) {
      temp = temp.filter(car => car.category?.toUpperCase() === selectedBodyType.toUpperCase());
    }

    // 4. Fuel Type Filter
    if (selectedFuel !== "All Fuel Types") {
      temp = temp.filter(car => car.fuel_type?.toLowerCase() === selectedFuel.toLowerCase());
    }

    // 5. Transmission Filter
    if (selectedTransmission !== "All Transmissions") {
      temp = temp.filter(car => car.transmission?.toLowerCase() === selectedTransmission.toLowerCase());
    }

    // 6. Mileage Filter
    temp = temp.filter(car => (car.mileage || 0) <= mileageRange);

    setFilteredCars(temp);
    setCurrentPage(1); 
  }, [allCars, searchParams, priceRange, selectedBodyType, selectedFuel, selectedTransmission, mileageRange]);

  const handleSort = (type) => {
    let sortedCars = [...filteredCars];
    if (type === "lowToHigh") {
      sortedCars.sort((a, b) => Number(a.prices?.daily || 0) - Number(b.prices?.daily || 0));
    } else if (type === "highToLow") {
      sortedCars.sort((a, b) => Number(b.prices?.daily || 0) - Number(a.prices?.daily || 0));
    }
    setFilteredCars(sortedCars);
  };

  const resetFilters = () => {
    setPriceRange(9999);
    setMileageRange(500000);
    setSelectedBodyType("");
    setSelectedFuel("All Fuel Types");
    setSelectedTransmission("All Transmissions");
    setSelectedCondition("All Conditions");
    setSearchParams({});
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 900, behavior: 'smooth' }); 
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1B2532] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-[#E11D48] border-gray-600 rounded-full animate-spin mb-4"></div>
        <p className="text-white font-black italic uppercase tracking-widest animate-pulse">Loading Luxury Fleet...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FB] min-h-screen font-sans">
      {/* --- HERO HEADER --- */}
      <div className="h-[450px] bg-[#1B2532] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://plus.unsplash.com/premium_photo-1687153733088-9fc19cbc59bf?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
        <div className="relative z-10 pt-2 lg:pt-20 text-center px-8">
          <h1 className="text-white text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter drop-shadow-2xl">
            Vehicle <span className="text-[#E11D48]">Listings</span>
          </h1>
          <div className="w-24 h-1 bg-[#E11D48] mx-auto mt-4"></div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-16">
        
        {/* --- TOP FEATURED 4 CARS --- */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-[1000] text-[#1B2532] uppercase italic tracking-tighter">
              Featured <span className="text-[#E11D48]">Selection</span>
            </h2>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allCars.slice(0, 4).map((car) => (
              <CarCard key={car._id} car={car} featured={true} />
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* --- SIDEBAR FILTERS (NEW EXTENDED VERSION) --- */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="bg-[#1B2532] text-white p-5 font-[1000] uppercase italic tracking-widest text-[11px] flex items-center gap-3 rounded-t-sm shadow-lg">
              <Filter size={16} className="text-[#E11D48]" /> Search Filters
            </div>
            
            <div className="bg-white p-8 shadow-2xl border-t-4 border-[#E11D48] space-y-8 rounded-b-sm">
              
              <FilterWrapper label="By Brand">
                <select 
                  className="w-full border-b-2 border-gray-100 p-3 text-xs bg-gray-50 font-bold italic outline-none focus:border-[#E11D48] transition-all cursor-pointer"
                  value={searchParams.get('brand') || 'All Makes'}
                  onChange={(e) => setSearchParams({ brand: e.target.value })}
                >
                  <option>All Makes</option>
                  <option>Toyota</option>
                  <option>Nissan</option>
                  <option>Ford</option>
                  <option>GMC</option>
                  <option>Mercedes</option>
                </select>
              </FilterWrapper>

              <FilterWrapper label={`Price: AED ${priceRange}`}>
                <input type="range" min="100" max="9999" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E11D48]" />
                <div className="flex justify-between mt-2 font-black italic text-[10px]">
                   <span className="text-gray-400">AED 100</span>
                   <span className="text-[#E11D48]">AED 9999</span>
                </div>
              </FilterWrapper>

              <FilterWrapper label="Body Style">
                <div className="grid grid-cols-2 gap-2">
                  {['SEDAN', 'SUV', 'COUPE', 'CONVERTIBLE'].map(type => (
                    <button 
                      key={type} 
                      onClick={() => setSelectedBodyType(selectedBodyType === type ? "" : type)}
                      className={`border p-3 text-[9px] font-[1000] transition-all italic tracking-tighter ${selectedBodyType === type ? 'bg-[#E11D48] text-white border-[#E11D48]' : 'hover:bg-gray-100 text-[#1B2532] border-gray-100'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </FilterWrapper>

              <FilterWrapper label="Fuel Type">
                <select 
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full border-b-2 border-gray-100 p-3 text-xs bg-gray-50 font-bold italic outline-none focus:border-[#E11D48]"
                >
                  <option>All Fuel Types</option>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                </select>
              </FilterWrapper>

              <FilterWrapper label="Transmission">
                <select 
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="w-full border-b-2 border-gray-100 p-3 text-xs bg-gray-50 font-bold italic outline-none focus:border-[#E11D48]"
                >
                  <option>All Transmissions</option>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </FilterWrapper>

              <FilterWrapper label={`Mileage: ${mileageRange} KM`}>
                 <input type="range" min="0" max="500000" value={mileageRange} onChange={(e) => setMileageRange(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E11D48]" />
              </FilterWrapper>

              <FilterWrapper label="Condition">
                <select 
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full border-b-2 border-gray-100 p-3 text-xs bg-gray-50 font-bold italic outline-none focus:border-[#E11D48]"
                >
                  <option>All Conditions</option>
                  <option>New</option>
                  <option>Used</option>
                </select>
              </FilterWrapper>

              <button onClick={resetFilters} className="w-full bg-[#1B2532] text-white font-black py-4 uppercase italic tracking-widest text-[10px] hover:bg-[#E11D48] transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                <RotateCcw size={14} /> Reset Filters
              </button>
            </div>
          </aside>

          {/* --- MAIN LISTINGS --- */}
          <div className="flex-1">
            <div className="bg-white p-6 mb-8 flex flex-col md:flex-row justify-between items-center shadow-sm border-l-8 border-[#1B2532]">
              <span className="text-[11px] font-[1000] uppercase italic text-[#1B2532] tracking-widest">
                {filteredCars.length} <span className="text-gray-400">Luxury Autos Found</span>
              </span>
              
              <div className="flex items-center gap-3">
                <label className="text-[10px] font-black uppercase text-gray-400 italic">Sort By:</label>
                <div className="relative">
                  <select 
                    onChange={(e) => handleSort(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-100 py-2 pl-4 pr-10 text-[10px] font-black uppercase italic focus:outline-none focus:border-[#E11D48] cursor-pointer"
                  >
                    <option value="default">Default</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
              </div>
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-10">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 bg-white border border-gray-100 text-[#1B2532] disabled:opacity-30 hover:bg-[#E11D48] hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`w-12 h-12 text-xs font-[1000] italic transition-all shadow-sm ${
                      currentPage === index + 1 
                      ? "bg-[#E11D48] text-white" 
                      : "bg-white text-[#1B2532] hover:bg-gray-50 border border-gray-100"
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}

                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 bg-white border border-gray-100 text-[#1B2532] disabled:opacity-30 hover:bg-[#E11D48] hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {filteredCars.length === 0 && (
                <div className="text-center py-20 bg-white shadow-sm border border-dashed rounded-md">
                    <p className="text-gray-400 font-black italic uppercase tracking-widest">No matching vehicles found.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterWrapper = ({ label, children }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-[1000] text-gray-400 uppercase tracking-widest block border-l-2 border-[#E11D48] pl-2">{label}</label>
    {children}
  </div>
);

const CarCard = ({ car, featured = false }) => (
  <Link 
    to={`/cars/${car._id}`} 
    className="group bg-[#1B2532] shadow-xl overflow-hidden flex flex-col h-full border-b-4 border-transparent hover:border-[#E11D48]"
  >
    <div className="relative h-56 overflow-hidden">
      <img 
        src={car.images?.main} 
        alt={car.carName} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#16202B] to-transparent pt-10 pb-3 px-4">
        <div className="flex justify-between text-[10px] text-white font-[1000] italic uppercase tracking-tighter opacity-90">
          <span className="bg-white/10 px-2 py-1 backdrop-blur-sm rounded-sm">AED {car.prices?.weekly} /W</span>
          <span className="bg-white/10 px-2 py-1 backdrop-blur-sm rounded-sm">AED {car.prices?.monthly} /M</span>
        </div>
      </div>
      {featured && (
        <div className="absolute top-4 left-4 bg-[#E11D48] text-white text-[9px] font-black px-3 py-1.5 italic uppercase tracking-widest animate-pulse shadow-lg">
          Featured Selection
        </div>
      )}
    </div>

    <div className="p-7 text-center flex-1">
      <h3 className="text-white text-[17px] font-[1000] uppercase italic tracking-tighter mb-2 group-hover:text-[#E11D48] transition-colors">
        {car.carName}
      </h3>
      <div className="flex justify-center items-center gap-3 text-[10px] text-gray-400 font-bold mb-6 italic uppercase tracking-tight">
        <span>{car.year}</span>
        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
        <span>{car.horsepower_hp} HP</span>
        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
        <span>{car.color}</span>
      </div>
      <div className="border-t border-white/5 pt-5">
        <p className="text-[#FFFFFF] text-2xl font-[1000] italic tracking-tighter">
          AED {car.prices?.daily} <span className="text-[11px] font-normal opacity-40 uppercase ml-1">/ Day</span>
        </p>
      </div>
    </div>
  </Link>
);

export default OurFleet;