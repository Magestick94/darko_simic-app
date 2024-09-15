import { Stack } from "@mui/material";
import MakeButton from "./MakeButton";
import useData from "../hooks/useData";

export default function MakeMenu() {
  const { makes } = useData('makes');

  return(
    <>
      <div style={{paddingBottom: "20px"}}>
        <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                useFlexGap
                flexWrap="wrap"
                py={1}
              >
                {makes.map(make => {
            return (
                <MakeButton key={make.id} make={make} />
            )
          })}
        </Stack>
      </div>
    </>
  )
}