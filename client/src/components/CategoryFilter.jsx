import {
  Beef,
  CakeSlice,
  Flame,
  Leaf,
  Pizza,
  Sandwich,
} from "lucide-react";

import "./CategoryFilter.css";

const categories = [
  {
    name: "All",
    icon: Flame,
  },
  {
    name: "Burger",
    icon: Sandwich,
  },
  {
    name: "Pizza",
    icon: Pizza,
  },
  {
    name: "Biryani",
    icon: Beef,
  },
  {
    name: "Healthy",
    icon: Leaf,
  },
  {
    name: "Dessert",
    icon: CakeSlice,
  },
];

function CategoryFilter({
  selected,
  onSelect,
}) {
  return (
    <div className="category-filter">

      {categories.map(
        ({
          name,
          icon: Icon,
        }) => (
          <button
            key={name}
            className={
              selected === name
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() =>
              onSelect(name)
            }
          >

            <span>
              <Icon size={18} />
            </span>

            {name}

          </button>
        )
      )}

    </div>
  );
}

export default CategoryFilter;