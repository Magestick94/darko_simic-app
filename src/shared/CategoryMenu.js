import { Stack } from "@mui/material";
import CategoryButton from "./CategoryButton";
import useData from "../hooks/useData";

export default function CategoryMenu() {
  const { categories } = useData('categories');

  return(
    <>
      <div className="categories">
        <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                useFlexGap
                flexWrap="wrap"
              >
                {categories.map(cat => {
            return (
                <CategoryButton key={cat.id} cat={cat} />
            )
          })}
        </Stack>
      </div>
    </>
  )
}