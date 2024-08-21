import React, { useEffect, useState } from "react";
import { apiGetProperties } from "~/apis/properties";
import { BreadCrumb, PropertyCard } from "~/components";

const Properties = () => {
  const [properties, setProperties] = useState();

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await apiGetProperties({
        limit: 9,
      });
      console.log(response);
      if (response.success) setProperties(response.properties);
    };
    fetchProperties();
  }, []);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <img
          src="/properties_banner.png"
          alt=""
          className="w-full object-contain"
        />
        <div className="absolute inset-0 text-white flex flex-col justify-center items-center">
          <h1 className="text-[48px] font-medium">Dự Án</h1>
          <div>
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className="w-main mx-auto my-20">
        <div>sortby</div>
        <div className="w-full grid grid-cols-3 gap-4">
          {properties?.rows?.map((el) => (
            <PropertyCard key={el.id} properties={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
