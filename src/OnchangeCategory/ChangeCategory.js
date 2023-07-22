import React, { useState } from "react";
import Filter from "../FilterCatgeory/Filter";

const ChangeCategory = () => {
  const [category, setCategory] = useState("");

  return (
    <div>
      <Filter
        category={category}
        onChangeCategory={(category) => setCategory(category)}
      />
    </div>
  );
};

export default ChangeCategory;
